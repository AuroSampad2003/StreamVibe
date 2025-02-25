import { useContext, useState } from "react";
import categoriesContext from "../context/CategoriesContext";
import { Link, useLocation } from "react-router-dom";

function CategoriesList() {
  const location = useLocation();
  const [genreName, setGenreName] = useState(location.state?.genreName);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // 5 items per row * 4 rows
  const { genresList, genresDetails, isFetching } = useContext(categoriesContext);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  const filteredGenresList = genresList.filter(
    (list) => ![99, 10402, 9648, 10770, 37].includes(list.id)
  );

  const filteredMovies = genresDetails.filter(
    (movie) => genresList.some((genre) => genre.id === movie.genre_ids[0] && genre.name === genreName)
  );

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

  const handlePageChange = (direction) => {
    scrollTo(0,0)
    setCurrentPage((prev) =>
      direction === "next"
        ? Math.min(prev + 1, totalPages)
        : Math.max(prev - 1, 1)
    );
  };

  const paginatedMovies = filteredMovies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="text-white px-20 xl-max:px-10 sm-max:px-3 mb-9">
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

<div className=" border border-black5 rounded-xl mt-10">
      {/* Genres and Movies Card */}
      {filteredGenresList
        .filter((list) => list.name === genreName)
        .map((genre, index) => (
          <div key={index} className="p-4">
            <h2 className="inline font-bold text-xl md-max:text-lg mb-2 relative bottom-8 left-3 rounded-lg px-3 py-2 bg-red1">{genre.name}</h2>
            <div className="grid grid-cols-5 xl-max:grid-cols-4 md-max:grid-cols-2 sm-max:grid-cols-1 gap-7">
              {paginatedMovies.map((movie) => (
                // eslint-disable-next-line react/jsx-key
                <Link to={`/${movie.id}`}  className=" bg-black3 border border-black5 p-3 rounded-xl shadow-lg hover:shadow-white/10  duration-300">
                <div className="">
                  <img
                    className="rounded-lg w-[250px] mx-auto"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title || "Movie"}
                  />
                  
                  <div className="text-center mt-2 font-bold">
                  {movie.title}
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
        <div className="flex justify-center mt-4 gap-4 ">
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



