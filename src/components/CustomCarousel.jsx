/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Reusable CustomCarousel Component
// eslint-disable-next-line react/prop-types
function CustomCarousel({ items, responsive, renderItem }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.previous();
    }
  };

  return (
    <div className="relative">
      {/* Custom Navigation Buttons (Only for Large Screens) */}
      <div className="hidden md:flex absolute top-[-50px] right-10 sm:right-5 md:right-8 items-center gap-3 bg-black4 px-4 py-2 rounded-lg shadow-md">
        <button
          onClick={handlePrev}
          className="bg-black5 p-3 rounded-md hover:bg-gray-800 transition-all"
        >
          <ChevronLeft className="text-white w-5 h-5" />
        </button>

        {/* Progress Indicator */}
        <div className="hidden sm:flex items-center gap-[2px]">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`w-3 h-[2px] rounded-md ${
                index === currentSlide % 4 ? "bg-red1 w-4" : "bg-gray-600"
              }`}
            ></div>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="bg-black5 p-3 rounded-md hover:bg-gray-800 transition-all"
        >
          <ChevronRight className="text-white w-5 h-5" />
        </button>
      </div>

      {/* Carousel */}
      <Carousel
        ref={carouselRef}
        responsive={responsive}
        infinite
        arrows={false} // Hide default arrows
        swipeable
        draggable
        afterChange={(previousSlide, { currentSlide }) => setCurrentSlide(currentSlide)}
      >
        {items.map((item, index) => renderItem(item, index))}
      </Carousel>

      {/* Mobile Pagination Indicator */}
      <div className="md:hidden flex justify-center mt-3">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`h-[3px] w-5 mx-1 rounded-full ${
              index === currentSlide % 4 ? "bg-red1 w-6" : "bg-gray-600"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default CustomCarousel;
