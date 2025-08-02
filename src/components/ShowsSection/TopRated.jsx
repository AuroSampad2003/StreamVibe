import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaClock, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function TopRated() {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // Initialize the navigate function

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
        const res = await fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', options);
        const json = await res.json();

        // Now fetch runtime for each movie
        const detailedData = await Promise.all(
          json.results.map(async (tv) => {
            const resDetails = await fetch(`https://api.themoviedb.org/3/tv/${tv.id}`, options);
            const details = await resDetails.json();

            return {
              ...tv,
              runtime: details.number_of_seasons > 0 && details.episode_run_time?.length > 0
                ? Math.round((details.number_of_episodes / details.number_of_seasons) * details.episode_run_time[0])
                : null,
              number_of_seasons: details.number_of_seasons || 1
            };
          })
        );

        setData(detailedData);
        setIsFetching(false);
      } catch (err) {
        console.error("Error fetching trending shows:", err);
      }
    };

    if (isFetching) fetchTrending();
  }, [isFetching]);

  useEffect(() => {
    if (isFetching) {
      fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', options)
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

  const handleShowClick = (id) => {
    navigate(`/tv/${id}`); // Use navigate to go to the show detail page
  };

  // Responsive full-page skeleton loader
  const renderSkeleton = () => (
    <div className="text-white px-20 xl:px-10 md:px-6 sm:px-1 mt-16 mb-16 animate-pulse select-none">
      {/* Heading Skeleton */}
      <div className="h-8 w-56 sm:w-48 md:w-56 bg-gray-700 rounded mb-6 mx-auto md:mx-0" />

      {/* Navigation & Pagination Skeleton (desktop only) */}
      <div className="flex justify-between items-center mb-6 px-2 md:px-0">
        <div className="hidden md:block w-48 h-6 bg-gray-700 rounded" />
        <div className="hidden md:flex items-center gap-3 bg-[#0F0F0F] px-1.5 py-1.5 rounded-lg border border-[#1F1F1F] shadow-md">
          <div className="bg-[#1A1A1A] p-2.5 rounded-md border border-[#1F1F1F] w-10 h-10" />
          <div className="flex items-center gap-[3px]">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-[2.5px] rounded-md bg-gray-800 ${i === 0 ? 'w-4 bg-gray-600' : ''}`}
              />
            ))}
          </div>
          <div className="bg-[#1A1A1A] p-2.5 rounded-md border border-[#1F1F1F] w-10 h-10" />
        </div>
      </div>

      {/* Carousel Skeleton */}
      <div className="flex overflow-x-auto gap-4 no-scrollbar md:grid md:grid-flow-col md:auto-cols-[calc((100%/5)-1rem)]">
        {[...Array(5)].map((_, idx) => (
          <div
            key={idx}
            className="bg-[#232323] border border-[#303030] rounded-xl min-w-[180px] max-w-[180px] sm:min-w-[140px] sm:max-w-[140px] md:min-w-[10rem] md:max-w-[10rem] p-3 flex-shrink-0 mx-2 flex flex-col"
          >
            {/* Poster Skeleton */}
            <div className="w-full aspect-[2/3] bg-[#313131] rounded-xl" />
            {/* Pills Skeleton */}
            <div className="flex flex-col sm:flex-row sm:justify-between mt-3 gap-2">
              <div className="w-16 h-5 bg-[#202020] rounded-full" />
              <div className="w-24 h-5 bg-[#202020] rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Pagination Bar Skeleton */}
      <div className="md:hidden flex justify-center mt-4 px-2">
        <div className="w-20 h-1 bg-gray-800 rounded-full relative">
          <div className="h-1 bg-gray-600 rounded-full w-full"></div>
        </div>
      </div>
    </div>
  );

  if (isFetching) {
    return renderSkeleton();
  }

  return (
    <div className="text-white px-20 xl:px-10 md:px-6 sm-max:px-0.5 mt-16 mb-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-2xl lg:text-2xl sm:text-xl mb-6">Top Rated TV Shows</h2>

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
            onClick={() => handleShowClick(item.id)} // Add onClick to navigate
            className='bg-[#1A1A1A] border border-[#262626] rounded-xl p-3 flex-shrink-0 mx-2 cursor-pointer transform hover:translate-y-[-10px] transition-[background,transform] duration-500 ease-in-out'
          >
            <img
              className='w-full aspect-[3/4] rounded-xl object-cover'
              src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
              alt="Loading..." />

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3 gap-2 sm:gap-0">

              {/* Runtime */}
              <div className="flex items-center gap-1 px-2 py-[2px] rounded-full bg-[#141414] border border-[#262626] text-[#999999] text-xs sm:text-sm w-fit">
                <FaClock className="text-xs sm:text-sm" />
                {item.runtime
                  ? `${Math.floor(item.runtime / 60)}h ${item.runtime % 60}min`
                  : 'N/A'}
              </div>

              {/* Ratings */}
              <div className="flex items-center gap-0.5 px-1.5 py-1 rounded-full bg-[#141414] border border-[#262626] text-[#999999] text-xs sm:text-sm w-fit">
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
                <span className="text-xs sm:text-sm text-[#999999]">
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
