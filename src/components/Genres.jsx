// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import { assets } from "../assets/assets";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import CategoriesContext from "../context/CategoriesContext";

function Genres() {
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
    const { genresList, genresDetails } = useContext(CategoriesContext);
  return (
    <div  className='text-white px-20 xl-max:px-10 sm-max:px-3 mt-16 mb-16'>
        <div className='border border-black5 rounded-2xl px-2'>
        <h2 className="inline font-bold text-xl md-max:text-lg mb-2 relative bottom-4 left-9 rounded-lg px-3 py-2 bg-red1">Genres</h2>
        <Carousel
          responsive={responsive}
          infinite={true}
          className=" py-4"
        >
          {/* Genres and Movies Card */}
          {genresList
            .filter((list) => ![99, 10402, 9648, 10770, 37].includes(list.id))
            .map((genre, index) => (
              <div
                className="bg-black3 border border-black5 px-3 py-4 rounded-xl mx-2 hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out "
                key={index}
                onClick={() =>
                  navigate("/categoriesList", {
                    state: { genreName: genre.name },
                  })
                }
              >
                <div className="grid grid-cols-2 gap-2">
                  {genresDetails
                    .filter((movie) => movie.genre_ids.includes(genre.id))
                    .slice(0, 4)
                    .map((movie, index) => (
                      <div key={index}>
                        <img
                          className="rounded-lg"
                          src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                          alt=""
                        />
                      </div>
                    ))}
                </div>
                <div className="flex justify-between px-1 mt-2">
                  <h2>{genre.name}</h2>
                  <button>
                    <img src={assets.rightbtn} alt="" />
                  </button>
                </div>
              </div>
            ))}
        </Carousel>
        </div>
    </div>
  )
}

export default Genres