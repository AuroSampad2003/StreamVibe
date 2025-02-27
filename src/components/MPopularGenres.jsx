// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import { assets } from "../assets/assets";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import CategoriesContext from "../context/CategoriesContext";

function Genres() {
  const navigate = useNavigate();

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 3 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
  };

  const { genresList, genresDetails } = useContext(CategoriesContext);

  return (
    <div className="text-white px-20 xl:px-10 sm-max:px-0.5 mt-16 mb-16">
      {/* Section Header */}
      <h2 className="font-bold text-2xl sm:text-xl mb-6">Popular Top 10 in Genres</h2>
      
      {/* Genres Carousel */}
      <Carousel responsive={responsive} infinite={true} className="py-4">
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
                {genresDetails
                  .filter((movie) => movie.genre_ids.includes(genre.id))
                  .slice(0, 4)
                  .map((movie, idx) => (
                    <div key={idx}>
                      <img
                        className="rounded-lg w-full h-24 object-cover"
                        src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                        alt=""
                      />
                    </div>
                  ))}
              </div>
              {/* Genre Name and Navigation Button */}
              <div className="flex justify-between items-center px-1 mt-4">
                <h2 className="text-lg font-semibold">{genre.name}</h2>
                <button>
                  <img src={assets.rightbtn} alt="" className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
      </Carousel>
    </div>
  );
}

export default Genres;
