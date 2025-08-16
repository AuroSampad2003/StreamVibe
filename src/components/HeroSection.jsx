import "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa6";
import { assets } from "../assets/assets";

function HeroSection() {
  const [movieData, setMovieData] = useState([]);
  const [isFetching, setIsFetching] = useState(true); // To track if data is being fetched
  const navigate = useNavigate();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_TMDB_BEARER,
    },
  };

  useEffect(() => {
    if (isFetching) {
      // Fetch data from page 1 and page 2
      Promise.all([
        fetch(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
          options
        ).then((response) => response.json()),
        fetch(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=2",
          options
        ).then((response) => response.json()),
      ])
        .then(([result1, result2]) => {
          // Concatenate the arrays from both results
          setMovieData([...result1.results, ...result2.results]); // Combine results
          setIsFetching(false); // Mark fetching as complete
        })
        .catch((error) => {
          console.error("Error fetching movie data:", error);
          setIsFetching(false);
        });
    }
  }, [isFetching]);

  return (
    <div className="relative z-0">
      <div className="grid grid-cols-8 md-max:grid-cols-5 gap-2 md-max:gap-1 relative bottom-[92px] -z-10 pt-1 bg-[#141414] gradient">
        {movieData.map((data, index) => {
          return (
            <div key={index}>
              <img
                className="rounded-lg md-max:rounded"
                src={
                  data.backdrop_path
                    ? `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`
                    : " "
                }
                alt={assets.defaultImage}
              />
            </div>
          );
        })}

        {/* Gradient Overlay */}
        <div className="header-gradient" />
        <img
          className="absolute inset-0 mx-auto my-auto top-1/2 transform -translate-y-1/2 
             w-[100px] sm:w-[100px] md:w-[150px] lg:w-[200px] xl:w-[250px]"
          src={assets.abstract}
          alt="Abstract Shape"
        />
      </div>

      <div className="relative bottom-[100px] flex flex-col justify-center items-center text-center bg-[#141414] text-white pb-[50px] md-max:pb-[0px]">
        <h1 className="relative bottom-5 font-semibold text-5xl xl-max:text-4xl sm-max:text-3xl">
          The Best Streaming Experience
        </h1>
        <p className="px-32 xl-max:px-16 md-max:px-6 mt-3 text-base xl-max:text-sm md-max:text-xs text-[#999999]">
          StreamVibe is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere. With StreamVibe, you can enjoy a wide variety of content, including the latest blockbusters, classic movies, popular TV shows, and more. You can also create your own watchlists, so you can easily find the content you want to watch.
        </p>

        {/* Updated Button with Play Icon */}
        <button
          onClick={() => navigate('/movies')}
          className="mt-10 bg-[#E50000] hover:bg-red-900 px-4 py-3 text-base xl-max:text-sm md-max:text-sm flex items-center gap-2 rounded-lg"
        >
          <FaPlay className="text-white sm-max:w-4 sm-max:h-4" />
          Start Watching Now
        </button>

        {/* --------------------------------------- */}

        {/* <div className="flex flex-col items-center">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 flex items-center justify-center">
            <svg
              className="absolute top-0 left-0 w-full h-full rotate-[325deg]"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#E50000"
                strokeWidth="8"
                fill="none"
                strokeDasharray="265 45"
                strokeLinecap="round"
              />
            </svg>
            <FaPlay className="text-[#E50000] w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 z-10" />
          </div>
          <div className="mt-1 flex text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light">
            <span className="text-white font-semibold">Stream</span>
            <span className="text-[#E50000] font-normal">Vibe</span>
          </div>
        </div> */}

        {/* --------------------------------------- */}

      </div>
    </div>
  );
}

export default HeroSection;
