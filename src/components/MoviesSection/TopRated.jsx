import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigate
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FiClock } from 'react-icons/fi';
// import { BsStarFill } from "react-icons/bs";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function TopRated() {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // Initialize navigate function

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5, slidesToSlide: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5, slidesToSlide: 5 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 2 },
  };

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWZiZTAyYjM1YTU4ZTc1MmU0YTYyNjJhOWZkMmFkYyIsIm5iZiI6MTc0MDc1MTQ5My4zNTgsInN1YiI6IjY3YzFjMjg1OWFkY2QyNTYyNTM1YzIyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OvJ5K7QpCiaubjID0pJj146d-S05U_0E6JD0pxV_D_o'
    }
  };

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);
        const json = await res.json();

        // Now fetch runtime for each movie
        const detailedData = await Promise.all(
          json.results.map(async (movie) => {
            const resDetails = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}`, options);
            const details = await resDetails.json();

            return {
              ...movie,
              runtime: details.runtime,
            };
          })
        );

        setData(detailedData);
        setIsFetching(false);
      } catch (err) {
        console.error("Error fetching trending movies:", err);
      }
    };

    if (isFetching) fetchTrending();
  }, [isFetching]);


  useEffect(() => {
    if (isFetching) {
      fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
        .then(res => res.json())
        .then(res => {
          setData(res.results);
          setIsFetching(false);
        })
        .catch(err => console.error(err));
    }
  }, [isFetching]);

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

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`); // Navigate to the movie details page
  };

  return (
    <div className="text-white px-20 xl:px-10 md:px-6 sm-max:px-0.5 mt-16 mb-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-2xl lg:text-2xl sm:text-xl mb-6">Top Rated Movies</h2>

        {/* Custom Navigation Buttons (Only for Large Screens) */}
        <div className="hidden md:flex items-center gap-3 bg-[#0F0F0F] px-1.5 py-1.5 rounded-lg border border-[#1F1F1F] shadow-md">
          <button
            onClick={handlePrev}
            className="bg-[#1A1A1A] p-2.5 rounded-md border border-[#1F1F1F] hover:bg-[#1F1F1F] transition-all"
          >
            <ChevronLeft className="text-white w-5 h-5" />
          </button>

          <div className="flex items-center gap-[3px]">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`w-3 h-[2.5px] rounded-md ${index === currentIndex % 4 ? "bg-[#E50000] w-4" : "bg-gray-800"
                  }`}
              ></div>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="bg-[#1A1A1A] p-2.5 rounded-md border border-[#1F1F1F] hover:bg-[#1F1F1F] transition-all"
          >
            <ChevronRight className="text-white w-5 h-5" />
          </button>
        </div>
      </div>

      <Carousel
        ref={carouselRef}
        responsive={responsive}
        infinite={true}
        className="py-3"
        arrows={false}
        swipeable={true}
        draggable={true}
        beforeChange={(nextSlide) => setCurrentIndex(nextSlide % data.length)}
      >
        {data.map((item, index) => (
          <div
            key={index}
            className='bg-[#1A1A1A] border border-[#262626] rounded-2xl mx-2 p-4 hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out'
            onClick={() => handleMovieClick(item.id)} // Handle movie click
          >
            <img
              className='w-full h-[270px] rounded-xl object-fill'
              src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
              alt="Loading..." />

            <div className="flex justify-between items-center mt-3">
              {/* Runtime */}
              <div className="flex items-center gap-1 px-1.5 py-1 rounded-full bg-[#141414] border border-[#262626] text-[#999999] text-xs">
                <FiClock className="text-sm" />
                {item.runtime
                  ? `${Math.floor(item.runtime / 60)}h ${item.runtime % 60}min`
                  : 'N/A'}
              </div>

              {/* Ratings */}
              <div className="flex items-center gap-0.5 px-1.5 py-1 rounded-full bg-[#141414] border border-[#262626] text-[#999999] text-xs">
                {/* Star rating based on vote_average */}
                {Array.from({ length: 5 }).map((_, i) => {
                  const rating = item.vote_average / 2;
                  return i + 1 <= Math.floor(rating) ? (
                    <span key={i} className="text-[#E50000]"><FaStar /></span>
                  ) : i < rating ? (
                    <span key={i} className="text-[#E50000]"><FaStarHalfAlt /></span> // You can switch this to a half-star icon if needed
                  ) : (
                    <span key={i} className="text-[#E50000]"><FaRegStar /></span>
                  );
                })}
                <span className="text-xs text-[#999999]">
                  {item.vote_count >= 1000 ? `${Math.floor(item.vote_count / 1000)}K` : item.vote_count}
                </span>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Small Screen Pagination Indicator */}
      <div className="md:hidden flex justify-center mt-4">
        <div className="w-20 h-1 bg-gray-800 rounded-full relative">
          <div
            className="h-1 bg-[#E50000] rounded-full"
            style={{ width: data.length > 0 ? `${(currentIndex / data.length) * 100}%` : "0%" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default TopRated;
