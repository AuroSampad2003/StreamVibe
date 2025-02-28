import { useContext, useState } from "react";
import categoriesContext from "../context/CategoriesContext";
import { Link, useLocation } from "react-router-dom";

function CategoriesList() {
  const location = useLocation();
  const [genreName, setGenreName] = useState(location.state?.genreName);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryType, setCategoryType] = useState("movie"); // Toggle between movie and TV
  const itemsPerPage = 20; // 5 items per row * 4 rows
  const { genresList, genresDetails, isFetching } = useContext(categoriesContext);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  const filteredGenresList = genresList.filter(
    (list) => ![99, 10402, 9648, 10770, 37].includes(list.id)
  );

  const filteredItems = genresDetails.filter(
    (item) => genresList.some((genre) => genre.id === item.genre_ids[0] && genre.name === genreName)
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (direction) => {
    scrollTo(0,0);
    setCurrentPage((prev) =>
      direction === "next"
        ? Math.min(prev + 1, totalPages)
        : Math.max(prev - 1, 1)
    );
  };

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="text-white px-20 xl-max:px-10 sm-max:px-3 mb-9">
      {/* Toggle Button */}
      <div className="flex justify-center mb-5">
        <button
          className={`px-4 py-2 mx-2 rounded-lg border border-black5 transition-transform duration-300 hover:scale-110 ${categoryType === "movie" ? "bg-red-500" : "bg-black3"}`}
          onClick={() => setCategoryType("movie")}
        >
          Movies
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded-lg border border-black5 transition-transform duration-300 hover:scale-110 ${categoryType === "tv" ? "bg-red-500" : "bg-black3"}`}
          onClick={() => setCategoryType("tv")}
        >
          TV Shows
        </button>
      </div>

      {/* Genres List */}
      <div className="flex gap-4 items-center text-nowrap w-full overflow-scroll no-scrollbar">
        {filteredGenresList.map((item, index) => (
          <button
            key={index}
            className="px-3 py-3 bg-black3 rounded-lg font-semibold border border-black5 transition-transform duration-300 hover:scale-110"
            onClick={() => {
              setGenreName(item.name);
              setCurrentPage(1); // Reset page when genre changes
            }}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="border border-black5 rounded-xl mt-10">
        {/* Genres and Movies/TV Shows Card */}
        {filteredGenresList
          .filter((list) => list.name === genreName)
          .map((genre, index) => (
            <div key={index} className="p-4">
              <h2 className="inline font-bold text-xl md-max:text-lg mb-2 relative bottom-8 left-3 rounded-lg px-3 py-2 bg-red1">{genre.name}</h2>
              <div className="grid grid-cols-5 xl-max:grid-cols-4 md-max:grid-cols-2 sm-max:grid-cols-1 gap-7">
                {paginatedItems.map((item) => (
                  // eslint-disable-next-line react/jsx-key
                  <Link to={`/${categoryType}/${item.id}`} className="bg-black3 border border-black5 p-3 rounded-xl shadow-lg hover:shadow-white/10 duration-300">
                    <div>
                      <img
                        className="rounded-lg w-[250px] mx-auto"
                        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                        alt={item.title || item.name || "Item"}
                      />
                      <div className="text-center mt-2 font-bold">
                        {item.title || item.name}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-4">
          <button
            className="px-4 py-2 bg-black3 rounded-lg border border-black5 transition-transform duration-300 hover:scale-110"
            disabled={currentPage === 1}
            onClick={() => handlePageChange("prev")}
          >
            Previous
          </button>
          <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            className="px-4 py-2 bg-black3 rounded-lg border border-black5 transition-transform duration-300 hover:scale-110"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange("next")}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default CategoriesList;
