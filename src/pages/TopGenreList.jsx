import { useContext, useState, useEffect } from "react";
import categoriesContext from "../context/CategoriesContext";
import { Link, useLocation } from "react-router-dom";

function TopGenreList() {
  const location = useLocation();
  const {
    genresList,
    genresDetails,
    isFetching,
    categoryType,
    setCategoryType,
    setGenresId,
  } = useContext(categoriesContext);

  const [genreName, setGenreName] = useState("");

  // ✅ Dynamically update categoryType based on route state
  useEffect(() => {
    if (location.state?.categoryType) {
      setCategoryType(location.state.categoryType);
    } else {
      setCategoryType("movie"); // default fallback
    }
  }, [location.state?.categoryType]);

  // ✅ Set genre name & id from state or fallback to first genre
  useEffect(() => {
    if (genresList.length > 0) {
      const genreFromState = location.state?.genreName;
      const matchedGenre = genresList.find((g) => g.name === genreFromState);

      if (genreFromState && matchedGenre) {
        setGenreName(matchedGenre.name);
        setGenresId(matchedGenre.id);
      } else {
        setGenreName(genresList[0].name);
        setGenresId(genresList[0].id);
      }
    }
  }, [categoryType, genresList, location.state?.genreName]);

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <div className="w-12 h-12 border-4 border-[#999999] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const filteredItems = genresDetails
    .filter((item) =>
      item.genre_ids.some((id) => {
        const match = genresList.find((g) => g.id === id);
        return match?.name === genreName;
      })
    )
    .slice(0, 10); // Only Top 10

  return (
    <div className="text-white px-20 xl-max:px-10 sm-max:px-3 mt-5 mb-5">
      {/* Genres List */}
      <div className="flex justify-start items-center py-2 gap-2 text-nowrap w-full max-w-6xl mx-auto overflow-x-auto no-scrollbar scroll-pl-4">
        {genresList.map((item) => (
          <button
            key={item.id}
            className={`px-2 py-2 rounded-lg border font-semibold transition-transform duration-300 hover:scale-110 ${item.name === genreName
                ? "bg-[#E50000] border-[#E50000]"
                : "bg-[#1A1A1A] border-[#262626]"
              }`}
            onClick={() => {
              setGenreName(item.name);
              setGenresId(item.id);
            }}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Top 10 Items */}
      <div className="md:border md:border-[#262626] md:rounded-xl md:px-2 mt-10">
        <h2 className="inline font-bold text-xl md:text-lg mb-2 relative bottom-4 left-9 rounded-lg px-3 py-2 bg-[#E50000]">
          <span className="font-normal text-base">Top 10 In</span> {genreName}
        </h2>
        <div className="grid grid-cols-5 xl-max:grid-cols-4 md-max:grid-cols-2 sm-max:grid-cols-1 gap-7 m-10">
          {filteredItems.map((item) => (
            <Link
              key={item.id}
              to={`/${categoryType}/${item.id}`}
              className="bg-[#1A1A1A] border border-[#262626] rounded-2xl p-4 hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out"
            >
              <div>
                <img
                  className="rounded-lg w-[250px] mx-auto"
                  src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  alt={item.title || item.name || "Poster"}
                />
                <div className="text-center mt-2 font-bold">
                  {item.title || item.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopGenreList;
