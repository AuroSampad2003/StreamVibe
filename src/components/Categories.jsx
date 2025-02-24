import { useContext, useMemo, useState, useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import CategoriesContext from "../context/CategoriesContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Categories() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 3 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
  };

  const { genresList, genresDetails } = useContext(CategoriesContext);

  const filteredGenresList = useMemo(() => {
    return genresList.filter(
      (genre) => ![99, 10402, 9648, 10770, 37].includes(genre.id)
    );
  }, [genresList]);

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
    <div className="text-white px-20 xl-max:px-10 sm-max:px-3">
      {/* Heading & Controls */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-semibold text-4xl xl-max:text-3xl sm-max:text-2xl">
            Explore our wide variety of categories
          </h1>
          <p className="mt-5 text-lg xl-max:text-base sm-max:text-sm text-gray1">
            Whether you&apos;re looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new.
          </p>
        </div>

        {/* Custom Navigation Buttons (Only for Large Screens) */}
        <div className="hidden md:flex items-center gap-3 bg-black4 px-4 py-2 rounded-lg shadow-md">
          <button
            onClick={handlePrev}
            className="bg-black5 p-3 rounded-md hover:bg-gray-800 transition-all"
          >
            <ChevronLeft className="text-white w-5 h-5" />
          </button>

          <div className="flex items-center gap-[3px]">
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
        afterChange={(previousSlide, { currentSlide }) => setCurrentSlide(currentSlide)}
      >
        {filteredGenresList.length > 0 ? (
          filteredGenresList.map((genre, index) => {
            const genreMovies = genresDetails
              .filter((movie) => movie.genre_ids.includes(genre.id))
              .slice(0, 4);

            return (
              <div
                key={index}
                className="bg-black3 px-5 py-6 rounded-xl mx-3 hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out w-[250px] text-center"
                onClick={() =>
                  navigate("/categoriesList", { state: { genreName: genre.name } })
                }
              >
                <div className="grid grid-cols-2 gap-2">
                  {genreMovies.length > 0 ? (
                    genreMovies.map((movie, movieIndex) => (
                      <div key={movieIndex}>
                        <img
                          className="rounded-lg w-full h-[100px] object-cover"
                          src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                          alt={movie.title || movie.name}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500">No movies available</div>
                  )}
                </div>
                <div className="flex justify-between items-center px-1 mt-3">
                  <h3 className="text-lg font-semibold">{genre.name}</h3>
                  <button className="bg-black5 p-2 rounded-md hover:bg-gray-800 transition-all">
                    <ChevronRight className="text-white w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500">No genres available</div>
        )}
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

export default Categories;
