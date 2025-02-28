import { useContext, useState, useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import CategoriesContext from "../context/CategoriesContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Genres() {
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
    <div className="text-white px-20 xl:px-10 sm-max:px-0.5 mt-16 mb-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-2xl lg:text-2xl sm:text-xl">Popular Top 10 in Genres</h2>

        {/* Custom Navigation Buttons (Only for Large Screens) */}
        <div className="hidden md:flex items-center gap-3 bg-black1 px-1.5 py-1.5 rounded-lg border border-gray-900 shadow-md">
          <button
            onClick={handlePrev}
            className="bg-black3 p-2.5 rounded-md border border-gray-900 hover:bg-gray-900 transition-all"
          >
            <ChevronLeft className="text-white w-5 h-5" />
          </button>
          <div className="flex items-center gap-[3px]">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`w-3 h-[2.5px] rounded-md ${index === currentIndex % 4 ? "bg-red1 w-4" : "bg-gray-600"}`}
              ></div>
            ))}
          </div>
          <button
            onClick={handleNext}
            className="bg-black3 p-2.5 rounded-md border border-gray-900 hover:bg-gray-900 transition-all"
          >
            <ChevronRight className="text-white w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Popular Genres Carousel */}
      <Carousel
        ref={carouselRef}
        responsive={responsive}
        infinite={true}
        className="mt-6 py-4"
        arrows={false}
        swipeable={true}
        draggable={true}
        beforeChange={(nextSlide) => setCurrentIndex(nextSlide % genresList.length)}
      >
        {genresList
          .filter((list) => ![99, 10402, 9648, 10770, 37].includes(list.id))
          .map((genre, index) => (
            <div
              className="bg-black3 border border-black5 p-4 rounded-xl mx-2 hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out"
              key={index}
              onClick={() =>
                navigate("/categoriesList", {
                  state: { genreName: genre.name },
                })
              }
            >
              {/* Movie Thumbnails */}
              <div className="grid grid-cols-2 gap-2">
                {genresDetails.filter((movie) => movie.genre_ids.includes(genre.id)).slice(0, 4).length > 0 ? (
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
                  <div className="text-center text-gray-500">Loading...</div>
                )}
              </div>

              {/* Genre Name and Navigation Button */}
              <div className="flex justify-between items-center px-1 mt-4">
                <h2 className="text-lg font-semibold">{genre.name}</h2>
                <button className="bg-black5 p-2 rounded-md hover:bg-gray-800 transition-all">
                  <ChevronRight className="text-white w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
      </Carousel>

      {/* Small Screen Pagination Indicator */}
      <div className="md:hidden flex justify-center mt-4">
        <div className="w-20 h-1 bg-gray-700 rounded-full relative">
          <div
            className="h-1 bg-red1 rounded-full"
            style={{ width: genresList.length > 0 ? `${(currentIndex / genresList.length) * 100}%` : "0%" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Genres;
