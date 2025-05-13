import { useContext, useState, useRef, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import CategoriesContext from "../../context/CategoriesContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

// eslint-disable-next-line react/prop-types
function PopularGenres({ categoryType = "tv" }) { // Default to 'tv' if no prop is passed for TV genres
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { 
    setCategoryType, 
    genresList, 
    genresDetails, 
    isFetchingGenres, 
    isFetching 
  } = useContext(CategoriesContext);
  
  useEffect(() => {
    if (setCategoryType) {
      setCategoryType(categoryType); 
    }
    // ⚡ Only set it if it's different, to avoid unnecessary context updates
  }, [categoryType, setCategoryType]);
  

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 3 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
  };

  // const { genresList, genresDetails } = useContext(CategoriesContext);

  // Filter genres based on the categoryType (movie or tv)
  const filteredGenres = genresList.filter((genre) => {
    return categoryType === "tv"
      ? ![99, 10402, 9648].includes(genre.id) // Avoid movie genres for TV shows
      : ![10770, 37].includes(genre.id); // Avoid tv and other non-movie genres
  });

  // Function to handle navigation
  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.previous();
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // const { isFetchingGenres, isFetching } = useContext(CategoriesContext);

  if (isFetchingGenres || isFetching) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="w-10 h-10 border-4 border-[#999999] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="text-white px-20 xl:px-10 sm-max:px-0.5 mt-16 mb-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-2xl lg:text-2xl sm:text-xl">Popular Top 10 In Genres</h2>

        {/* Custom Navigation Buttons (Only for Large Screens) */}
        <div className="hidden md:flex items-center gap-3 bg-[#0F0F0F] px-1.5 py-1.5 rounded-lg border border-[#1F1F1F] shadow-md">
          <button
            onClick={handlePrev}
            className="bg-[#1A1A1A] p-2.5 rounded-md border border-[#1F1F1F] hover:bg-[#1F1F1F] transition-all"
          >
            <ChevronLeft className="text-white w-5 h-5" />
          </button>

          <div className="flex items-center gap-[3px]">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`w-3 h-[2.5px] rounded-md ${index === currentIndex % 4 ? "bg-[#E50000] w-4" : "bg-gray-800"
                  }`}
              ></div>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="bg-[#1A1A1A] p-2.5 rounded-md border border-[#1F1F1F] hover:bg-[#1F1F1F] transition-all"
          >
            <ChevronRight className="text-white w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Genres Carousel */}
      <Carousel
        ref={carouselRef}
        responsive={responsive}
        infinite={true}
        className="mt-6 py-4"
        arrows={false}
        swipeable={true}
        draggable={true}
        beforeChange={(nextSlide) => setCurrentIndex(nextSlide % filteredGenres.length)}
      >
        {filteredGenres.map((genre, index) => {
          const top10InGenre = genresDetails
            .filter((item) => item.genre_ids.includes(genre.id))
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 10); // Top 10 popular in this genre

          return (
            <div
              className="bg-[#1A1A1A] border border-[#262626] p-4 rounded-xl mx-2 hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out"
              key={index}
              onClick={() =>
                navigate("/topGenreList", {
                  state: {
                    genreId: genre.id,
                    genreName: genre.name,
                    categoryType,
                  },
                })
              }
            >
              {/* Thumbnails */}
              <div className="grid grid-cols-2 gap-2">
                {top10InGenre.length > 0 ? (
                  top10InGenre.slice(0, 4).map((item, idx) => (
                    <div key={idx}>
                      <img
                        className="rounded-lg w-full h-24 object-cover"
                        src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path || item.poster_path}`}
                        alt={item.title || item.name}
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 flex justify-center items-center h-[100px]">
                    <div className="w-8 h-8 border-4 border-[#999999] border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>

              {/* Genre Name and Navigation Button */}
              <div className="flex justify-between items-center px-1 mt-4">
                <div>
                  <div className="inline-block bg-[#E50000] text-white text-xs font-semibold px-2 py-1 rounded mb-0">
                    Top 10 In
                  </div>
                  <h2 className="text-lg font-semibold">{genre.name}</h2>
                </div>
                <button className="bg-[#262626] p-2 rounded-md hover:bg-gray-800 transition-all">
                  <ChevronRight className="text-white w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}
      </Carousel>

      {/* Small Screen Pagination Indicator */}
      <div className="md:hidden flex justify-center mt-4">
        <div className="w-20 h-1 bg-gray-800 rounded-full relative">
          <div
            className="h-1 bg-[#E50000] rounded-full"
            style={{
              width: filteredGenres.length > 0
                ? `${(currentIndex / filteredGenres.length) * 100}%`
                : "0%",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default PopularGenres;
