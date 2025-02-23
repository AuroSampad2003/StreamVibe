/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const MovieCarousel = ({ movies }) => {
  const carouselRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update state on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle touch gestures
  useEffect(() => {
    if (!isMobile) return;

    let startX = 0;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      const diffX = e.touches[0].clientX - startX;
      if (diffX > 50) {
        // Swipe Right → Previous
        carouselRef.current.previous();
      } else if (diffX < -50) {
        // Swipe Left → Next
        carouselRef.current.next();
      }
    };

    const carousel = document.querySelector(".react-multi-carousel-track");
    carousel.addEventListener("touchstart", handleTouchStart);
    carousel.addEventListener("touchmove", handleTouchMove);

    return () => {
      carousel.removeEventListener("touchstart", handleTouchStart);
      carousel.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isMobile]);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 3 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 2 },
  };

  return (
    <div className="relative">
      <Carousel
        ref={carouselRef}
        responsive={responsive}
        infinite={true}
        swipeable={true}
        draggable={true}
        arrows={!isMobile} // ✅ Arrows only for large screens
        className="mt-6 py-4"
      >
        {movies.map((movie, index) => (
          <div key={index} className="p-2">
            <img src={movie.image} alt={movie.title} className="rounded-lg" />
          </div>
        ))}
      </Carousel>

      {/* ✅ Custom Next Button for Small Screens */}
      {isMobile && (
        <button
          className="absolute right-4 bottom-4 bg-white p-2 rounded-full shadow-lg"
          onClick={() => carouselRef.current.next()}
        >
          ➡️
        </button>
      )}
    </div>
  );
};

export default MovieCarousel;
