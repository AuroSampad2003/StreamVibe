import { useContext, useMemo } from "react";
import { assets } from "../assets/assets";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import CategoriesContext from "../context/CategoriesContext";

function Categories() {
  const navigate = useNavigate();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      slidesToSlide: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  // Extracting context data
  const { genresList, genresDetails } = useContext(CategoriesContext);

  // Using useMemo to filter genres and avoid unnecessary recalculations on every render
  const filteredGenresList = useMemo(() => {
    return genresList.filter(
      (genre) => ![99, 10402, 9648, 10770, 37].includes(genre.id)
    );
  }, [genresList]);

  return (
    <div className="text-white pb-11 px-20 xl-max:px-10 sm-max:px-3">
      <Carousel responsive={responsive} infinite={true} className="mt-12 py-4">
        {/* Loop through the filtered genres */}
        {filteredGenresList.length > 0 ? (
          filteredGenresList.map((genre, index) => {
            const genreMovies = genresDetails.filter((movie) =>
              movie.genre_ids.includes(genre.id)
            ).slice(0, 4);

            return (
              <div
                key={index}
                className="bg-black3 border border-black5 px-3 py-4 rounded-xl mx-2 hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out"
                onClick={() =>
                  navigate("/categoriesList", {
                    state: { genreName: genre.name },
                  })
                }
              >
                <div className="grid grid-cols-2 gap-2">
                  {/* Displaying movies of the genre */}
                  {genreMovies.length > 0 ? (
                    genreMovies.map((movie, movieIndex) => (
                      <div key={movieIndex}>
                        <img
                          className="rounded-lg"
                          src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                          alt={movie.title || movie.name}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500">No movies available</div>
                  )}
                </div>
                <div className="flex justify-between px-1 mt-2">
                  <h2>{genre.name}</h2>
                  <button>
                    <img src={assets.rightbtn} alt="right button" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500">No genres available</div>
        )}
      </Carousel>
    </div>
  );
}

export default Categories;
