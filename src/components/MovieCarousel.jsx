/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MovieCarousel = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = movies.length;
  const carouselRef = useRef(null);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
      {/* Movie Slider */}
      <div
        ref={carouselRef}
        className="flex transition-transform duration-300"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {movies.map((movie, index) => (
          <div key={index} className="w-full flex-shrink-0 p-2">
            <img src={movie.image} alt={movie.title} className="rounded-lg w-full" />
          </div>
        ))}
      </div>

      {/* Custom Navigation Buttons */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-black px-4 py-2 rounded-lg border border-gray-900 shadow-md">
        <button
          onClick={handlePrev}
          className="bg-gray-800 p-3 rounded-md border border-gray-700 hover:bg-gray-900 transition-all"
        >
          <ChevronLeft className="text-white w-5 h-5" />
        </button>

        <div className="flex items-center gap-[3px]">
          {movies.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-[2px] rounded-md ${
                index === currentIndex ? "bg-red-500 w-4" : "bg-gray-600"
              }`}
            ></div>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="bg-gray-800 p-3 rounded-md border border-gray-700 hover:bg-gray-900 transition-all"
        >
          <ChevronRight className="text-white w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default MovieCarousel;
