import { useContext, useState, useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import CategoriesContext from "../context/CategoriesContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Categories() {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 3 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
  };

  const { genresList, genresDetails } = useContext(CategoriesContext);

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

  return (
    <div className="text-white px-20 xl-max:px-10 sm-max:px-3 pb-2 mt-0">
      {/* Heading & Controls */}
      <h1 className="font-semibold text-4xl xl-max:text-3xl sm-max:text-2xl">
        Explore our wide variety of categories
      </h1>
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="mt-1 text-base xl-max:text-sm md-max:text-xs text-[#999999]">
            Whether you&apos;re looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new.
          </p>
        </div>

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
                className={`w-3 h-[2.5px] rounded-md ${
                  index === currentIndex % 4 ? "bg-[#E50000] w-4" : "bg-gray-800"
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

      {/* Categories Carousel */}
      <Carousel
        ref={carouselRef}
        responsive={responsive}
        infinite={true}
        className="mt-6 py-4"
        arrows={false} // Hide default arrows
        swipeable={true} // Enable touch/swipe gestures
        draggable={true} // Allow dragging on desktop too
        afterChange={(previousSlide, { currentSlide }) => setCurrentIndex(currentSlide)}
      >
        {genresList.length > 0 ? (
          genresList
            .filter((list) => ![99, 10402, 9648, 10770, 37].includes(list.id))
            .map((genre, index) => (
              <div
                className="bg-[#1A1A1A] border border-[#262626] p-4 rounded-xl mx-2 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
                key={index}
                onClick={() =>
                  navigate("/categoriesList", {
                    state: { genreName: genre.name },
                  })
                }
              >
                {/* Movie Thumbnails */}
                <div className="grid grid-cols-2 gap-2">
                  {genresDetails
                    .filter((movie) => movie.genre_ids.includes(genre.id))
                    .slice(0, 4).length > 0 ? (
                    genresDetails
                      .filter((movie) => movie.genre_ids.includes(genre.id))
                      .slice(0, 4)
                      .map((movie, idx) => (
                        <div key={idx}>
                          <img
                            className="rounded-lg w-full h-24 object-cover"
                            src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                            alt={movie.title || movie.name}
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
                <div className="flex justify-between items-center px-1 mt-3">
                  <h3 className="text-lg font-semibold">{genre.name}</h3>
                  <button className="bg-[#262626] p-2 rounded-md hover:bg-gray-800 transition-all">
                    <ChevronRight className="text-white w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
        ) : (
          // Skeleton/frame structure for no genres available
          [...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="bg-[#232323] border border-[#303030] p-4 rounded-xl mx-2 animate-pulse"
            >
              {/* Thumbnail frames */}
              <div className="grid grid-cols-2 gap-2">
                {[...Array(4)].map((__, thumbIdx) => (
                  <div
                    key={thumbIdx}
                    className="rounded-lg w-full h-24 bg-[#313131]"
                  />
                ))}
              </div>
              {/* Genre name and button placeholder */}
              <div className="flex justify-between items-center px-1 mt-3">
                <div className="w-24 h-6 bg-[#313131] rounded-md" />
                <div className="w-8 h-8 bg-[#252525] rounded-md" />
              </div>
            </div>
          ))
        )}
      </Carousel>

      {/* Small Screen Pagination Indicator */}
      <div className="md:hidden flex justify-center mt-4">
        <div className="w-20 h-1 bg-gray-800 rounded-full relative">
          <div
            className="h-1 bg-[#E50000] rounded-full"
            style={{
              width: genresList.length > 0 ? `${(currentIndex / genresList.length) * 100}%` : "0%",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
