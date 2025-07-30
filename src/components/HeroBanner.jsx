import { useEffect, useState } from "react";
import { FaPlay, FaPlus, FaThumbsUp, FaVolumeHigh, FaVolumeXmark, FaArrowLeft, FaArrowRight } from "react-icons/fa6"; // Font Awesome 6 (Free)
import { Dialog } from "@material-tailwind/react";

function HeroBanner() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false); // Dialog state
  const [trailerKey, setTrailerKey] = useState(null); // To store the trailer key for YouTube
  const [isAdded, setIsAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);


  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWZiZTAyYjM1YTU4ZTc1MmU0YTYyNjJhOWZkMmFkYyIsIm5iZiI6MTc0MDc1MTQ5My4zNTgsInN1YiI6IjY3YzFjMjg1OWFkY2QyNTYyNTM1YzIyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OvJ5K7QpCiaubjID0pJj146d-S05U_0E6JD0pxV_D_o"
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

  // Function to handle Play button click
  const handlePlayClick = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${currentMovie.id}/videos?language=en-US`,
        {
          headers: {
            accept: "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWZiZTAyYjM1YTU4ZTc1MmU0YTYyNjJhOWZkMmFkYyIsIm5iZiI6MTc0MDc1MTQ5My4zNTgsInN1YiI6IjY3YzFjMjg1OWFkY2QyNTYyNTM1YzIyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OvJ5K7QpCiaubjID0pJj146d-S05U_0E6JD0pxV_D_o"
          }
        }
      );
      const data = await res.json();
      const trailer = data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      if (trailer) {
        setTrailerKey(trailer.key);
        setOpen(true);
      } else {
        alert("Trailer not available");
      }
    } catch (err) {
      console.error("Failed to fetch trailer", err);
    }
  };

  return (
    <div className="relative mb-20 w-full max-w-[1400px] mx-auto text-white overflow-hidden rounded-lg sm:max-w-[90%]">
      <img
        className="w-full h-[600px] object-cover object-top rounded-lg"
        src={`https://image.tmdb.org/t/p/original/${currentMovie.backdrop_path}`}
        alt={currentMovie.title}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center px-6 w-full max-w-3xl">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">{currentMovie.title}</h1>
        <p className="text-base xl-max:text-sm md-max:text-xs text-[#999999] max-w-xl mx-auto">{currentMovie.overview.slice(0, 150)}...</p>
        <div className="mt-4 flex justify-center items-center gap-4">
          {/* Play Now Button */}
          <button
            onClick={handlePlayClick}
            className="bg-[#E50000] hover:bg-red-900 px-4 py-3 rounded-lg flex items-center gap-2 text-white text-base xl-max:text-sm md-max:text-sm"
          >
            <FaPlay /> Play Now
          </button>

          {/* Add Button (FaPlus) */}
          <button
            onClick={() => setIsAdded(!isAdded)}
            className={`bg-[#0F0F0F] p-3 rounded-lg border border-[#262626] ${isAdded ? "text-[#E50000]" : "text-white"
              }`}
          >
            <FaPlus />
          </button>

          {/* Like Button (FaThumbsUp) */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`bg-[#0F0F0F] p-3 rounded-lg border border-[#262626] ${isLiked ? "text-[#E50000]" : "text-white"
              }`}
          >
            <FaThumbsUp />
          </button>

          {/* Volume Button (Static) */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`bg-[#0F0F0F] p-3 rounded-lg border border-[#262626] ${isMuted ? "text-[#E50000]" : "text-white"
              }`}
          >
            {isMuted ? <FaVolumeXmark /> : <FaVolumeHigh />}
          </button>
        </div>
      </div>

      {/* Pagination Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {movies.slice(0, 4).map((_, index) => (
          <div
            key={index}
            className={`h-1 w-6 rounded-full ${currentIndex % 4 === index ? 'bg-[#E50000]' : 'bg-gray-800'}`}
          ></div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute bottom-6 left-10 bg-[#0F0F0F] bg-opacity-50 border border-[#262626] p-3 rounded-full"
        onClick={() => setCurrentIndex((prevIndex) => (prevIndex === 0 ? movies.length - 1 : prevIndex - 1))}
      >
        <FaArrowLeft />
      </button>
      <button
        className="absolute bottom-6 right-10 bg-[#0F0F0F] bg-opacity-50 border border-[#262626] p-3 rounded-full"
        onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length)}
      >
        <FaArrowRight />
      </button>

      {/* Dialog for Playing Movie */}
      <Dialog size="xl" open={open} handler={() => setOpen(false)} className="bg-black">
        {trailerKey ? (
          <iframe
            width="100%"
            height="500px"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            title="Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          />
        ) : (
          <p className="text-white p-4">No trailer available.</p>
        )}
      </Dialog>
    </div>
  );
}

export default HeroBanner;
