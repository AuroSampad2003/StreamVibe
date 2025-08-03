import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { assets } from "../assets/assets";

function SearchList() {
  const location = useLocation();
  const search = location.state?.search || "";
  const [mediaList, setMediaList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const itemsPerPage = 20;

  const totalPages = Math.ceil(mediaList.length / itemsPerPage);

  const handlePageChange = (direction) => {
    window.scrollTo(0, 0);
    setCurrentPage((prev) =>
      direction === "next"
        ? Math.min(prev + 1, totalPages)
        : Math.max(prev - 1, 1)
    );
  };

  useEffect(() => {
    if (!search) {
      setMediaList([]);
      setCurrentPage(1);
      return;
    }

    setLoading(true);
    setError(null);
    setCurrentPage(1);

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_TMDB_BEARER,
      },
    };

    fetch(
      `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
        search
      )}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((response) => {
        // Filter to only movies and tv shows with poster or backdrop image
        const filteredResults = (response.results || []).filter(
          (item) =>
            (item.media_type === "movie" || item.media_type === "tv") &&
            (item.poster_path || item.backdrop_path)
        );
        setMediaList(filteredResults);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setError("Failed to fetch results. Please try again.");
        setMediaList([]);
      })
      .finally(() => setLoading(false));
  }, [search]);

  // Paginated items for current page
  const paginatedMedia = mediaList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="text-white px-20 xl-max:px-10 sm-max:px-3 mt-5 mb-5">
      <div className="md:border md:border-[#262626] md:rounded-xl md:px-2 mt-10">
        <h2 className="inline text-white md:hidden">
          {search ? `Search Result of "${search.trim()}"` : "Search Results"}
        </h2>
        <h2 className="hidden md:inline font-semibold text-xl md:text-lg mb-2 relative bottom-4 left-9 rounded-lg px-3 py-2 bg-[#E50000]">
          {search ? `Search Result of "${search.trim()}"` : "Search Results"}
        </h2>

        {loading ? (
          <p className="text-center text-gray-400 mt-20 text-sm">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500 mt-20 text-sm">{error}</p>
        ) : mediaList.length === 0 ? (
          <p className="text-center text-[#999999] mt-20 text-sm">No results found.</p>
        ) : (
          <div className="grid gap-4 sm:gap-5 md:gap-6 m-2 sm:m-4 md:m-6 lg:m-10 grid-cols-[repeat(auto-fill,minmax(100px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(140px,1fr))]">
            {paginatedMedia.map((item) => {
              const linkTo = item.media_type === "tv" ? `/tv/${item.id}` : `/movie/${item.id}`;
              const title = item.title || item.name || "Untitled";

              const imgSrc = item.poster_path
                ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                : item.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
                  : assets.defaultImage;

              return (
                <Link
                  key={`${item.media_type}_${item.id}`}
                  to={linkTo}
                  className="flex flex-col items-center"
                  title={`Go to details for ${title}`}
                >
                  {/* Poster Card */}
                  <div className="border border-[#262626] rounded-xl transform hover:translate-y-[-10px] transition-[background,transform] duration-500 ease-in-out overflow-hidden">
                    <img
                      className="w-full aspect-[3/4] object-cover rounded-xl"
                      src={imgSrc}
                      alt={title}
                      loading="lazy"
                    />
                  </div>

                  {/* Title outside the card */}
                  <div className="mt-1 text-center font-medium text-xs sm:text-sm text-white max-w-[140px] line-clamp-2">
                    {title}
                  </div>

                  {/* Media type and year */}
                  <div className="text-[10px] sm:text-sx text-gray-400">
                    {item.media_type === "movie" ? "Movie" : "TV Show"}
                    {(item.release_date || item.first_air_date) &&
                      ` (${(item.release_date || item.first_air_date).slice(0, 4)})`}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && !loading && !error && (
        <div className="flex justify-center mt-4 gap-2">
          <button
            aria-label="Previous page"
            className="w-9 h-9 flex items-center justify-center text-[#999999] rounded-full bg-[#141414] border border-[#262626] hover:bg-[#1F1F1F] transition disabled:opacity-40"
            disabled={currentPage === 1}
            onClick={() => handlePageChange("prev")}
          >
            <ArrowLeft size={18} />
          </button>
          <span className="px-2 py-2 text-[#BFBFBF] text-xs sm:text-sm">
            {`Page ${currentPage} of ${totalPages}`}
          </span>
          <button
            aria-label="Next page"
            className="w-9 h-9 flex items-center justify-center text-[#999999] rounded-full bg-[#141414] border border-[#262626] hover:bg-[#1F1F1F] transition disabled:opacity-40"
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
