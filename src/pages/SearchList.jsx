import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { assets } from "../assets/assets";

function SearchList() {
  const location = useLocation();
  const search = location.state?.search || "";
  const [movieList, setMovieList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const totalPages = Math.ceil(movieList.length / itemsPerPage);

  const handlePageChange = (direction) => {
    window.scrollTo(0, 0);
    setCurrentPage((prev) =>
      direction === "next"
        ? Math.min(prev + 1, totalPages)
        : Math.max(prev - 1, 1)
    );
  };

  const paginatedMovies = movieList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (!search) return;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWZiZTAyYjM1YTU4ZTc1MmU0YTYyNjJhOWZkMmFkYyIsIm5iZiI6MTc0MDc1MTQ5My4zNTgsInN1YiI6IjY3YzFjMjg1OWFkY2QyNTYyNTM1YzIyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OvJ5K7QpCiaubjID0pJj146d-S05U_0E6JD0pxV_D_o",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((response) => {
        setMovieList(response.results || []);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  }, [search]);

  return (
    <div className="text-white px-20 xl-max:px-10 sm-max:px-3 mt-5 mb-5">
      <div className="md:border md:border-[#262626] md:rounded-xl md:px-2 mt-10">
        <h2 className="inline text-white md:hidden">
          {search ? `Search Result of "${search.trim()}"` : "Search Results"}
        </h2>
        <h2 className="hidden md:inline font-semibold text-xl md:text-lg mb-2 relative bottom-4 left-9 rounded-lg px-3 py-2 bg-[#E50000]">
          {search ? `Search Result of "${search.trim()}"` : "Search Results"}
        </h2>



        {movieList.length === 0 ? (
          <p className="text-center text-[#999999] mt-20 text-sm">No results found.</p>
        ) : (
          <div className="grid gap-6 sm:gap-7 m-4 sm:m-6 md:m-10 grid-cols-[repeat(auto-fill,minmax(140px,1fr))]">
            {paginatedMovies.map((item) => (
              <Link
                key={item.id}
                to={`/movie/${item.id}`}
                className="flex flex-col items-center"
              >
                {/* Poster Card */}
                <div className="border border-[#262626] rounded-xl transform hover:translate-y-[-10px] transition duration-500 ease-in-out overflow-hidden">
                  <img
                    className="w-full aspect-[2/3] object-cover rounded-xl"
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                        : assets.defaultImage
                    }
                    alt={item.title || "Poster"}
                  />
                </div>

                {/* Title outside the card */}
                <div className="mt-2 text-center font-medium text-xs sm:text-sm text-white max-w-[140px] line-clamp-2">
                  {item.title}
                </div>
              </Link>

            ))}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          <button
            className="w-9 h-9 flex items-center justify-center text-[#999999] rounded-full bg-[#141414] border border-[#262626] hover:bg-[#1F1F1F] transition"
            disabled={currentPage === 1}
            onClick={() => handlePageChange("prev")}
          >
            <ArrowLeft size={18} />
          </button>
          <span className="px-2 py-2 text-[#BFBFBF] text-xs sm:text-sm">
            {`Page ${currentPage} of ${totalPages}`}
          </span>
          <button
            className="w-9 h-9 flex items-center justify-center text-[#999999] rounded-full bg-[#141414] border border-[#262626] hover:bg-[#1F1F1F] transition"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange("next")}
          >
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchList;
