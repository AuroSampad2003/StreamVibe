import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlay, FaVolumeUp, FaPlus, FaArrowLeft, FaArrowRight, FaThumbsUp } from "react-icons/fa";

function HeroBanner() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer YOUR_ACCESS_TOKEN"
      }
    })
      .then((res) => res.json())
      .then((res) => {
        setMovies(res.results);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(interval);
  }, [movies]);

  if (movies.length === 0) return null;

  const currentMovie = movies[currentIndex];

  return (
    <div className="relative mb-20 w-full max-w-[1400px] mx-auto text-white overflow-hidden rounded-lg sm:max-w-[90%]">
      <img
        className="w-full h-[600px] object-cover rounded-lg"
        src={`https://image.tmdb.org/t/p/original/${currentMovie.backdrop_path}`}
        alt={currentMovie.title}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center px-6 w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-3">{currentMovie.title}</h1>
        <p className="text-sm text-gray-300 max-w-xl mx-auto">{currentMovie.overview.slice(0, 150)}...</p>
        <div className="mt-4 flex justify-center items-center gap-4">
          <Link to={`/${currentMovie.id}`} className="bg-red1 px-4 py-3 rounded-lg flex items-center gap-2 text-white font-semibold">
            <FaPlay /> Play Now
          </Link>
          <button className="bg-black2 p-3 rounded-lg text-white border border-black4">
            <FaPlus />
          </button>
          <button className="bg-black3 p-3 rounded-lg text-white border border-black4">
            <FaThumbsUp />
          </button>
          <button className="bg-black3 p-3 rounded-lg text-white border border-black4">
            <FaVolumeUp />
          </button>
        </div>
      </div>
      {/* Pagination Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {movies.slice(0, 4).map((_, index) => (
          <div
            key={index}
            className={`h-1 w-6 rounded-full ${currentIndex % 4 === index ? 'bg-red1' : 'bg-gray-600'}`}
          ></div>
        ))}
      </div>
      {/* Navigation Buttons */}
      <button
        className="absolute bottom-6 left-10 bg-black bg-opacity-50 p-3 rounded-full"
        onClick={() => setCurrentIndex((prevIndex) => (prevIndex === 0 ? movies.length - 1 : prevIndex - 1))}
      >
        <FaArrowLeft />
      </button>
      <button
        className="absolute bottom-6 right-10 bg-black bg-opacity-50 p-3 rounded-full"
        onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length)}
      >
        <FaArrowRight />
      </button>
    </div>
  );
}

export default HeroBanner;
