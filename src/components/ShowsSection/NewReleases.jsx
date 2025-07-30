import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaRegCalendarAlt } from 'react-icons/fa';

function NewReleases() {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // Get the navigate function

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
    if (isFetching) {
      fetch('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1', options)
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

  // Handle navigation on click
  const handleShowClick = (id) => {
    navigate(`/tv/${id}`);
  };

  // Responsive full-page skeleton loader
  const renderSkeleton = () => (
    <div className="text-white px-20 xl:px-10 md:px-6 sm:px-1 mt-16 mb-16 animate-pulse select-none">
      {/* Heading Skeleton */}
      <div className="h-8 w-48 sm:w-36 md:w-48 bg-gray-700 rounded mb-6 mx-auto md:mx-0" />

      {/* Navigation & Pagination Skeleton (desktop only) */}
      <div className="flex justify-between items-center mb-6 px-2 md:px-0">
        <div className="hidden md:block w-48 h-6 bg-gray-700 rounded" />
        <div className="hidden md:flex items-center gap-3 bg-[#0F0F0F] px-1.5 py-1.5 rounded-lg border border-[#1F1F1F] shadow-md">
          <div className="bg-[#1A1A1A] p-2.5 rounded-md border border-[#1F1F1F] w-10 h-10" />
          <div className="flex items-center gap-[3px]">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`w-3 h-[2.5px] rounded-md bg-gray-800 ${i === 0 ? 'w-4 bg-gray-600' : ''}`} />
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
            {/* Release Date Pill Skeleton */}
            <div className="mt-3 h-5 bg-[#202020] rounded-3xl w-full" />
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
        <h2 className="font-bold text-2xl lg:text-2xl sm:text-xl">New Releases Shows</h2>

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
            className='bg-[#1A1A1A] border border-[#262626] rounded-xl p-3 flex-shrink-0 mx-2 cursor-pointer transform hover:translate-y-[-10px] transition-[background,transform] duration-500 ease-in-out'
            onClick={() => handleShowClick(item.id)} // Navigate on click
          >
            <img
              className='w-full aspect-[2/3] rounded-xl object-cover'
              src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
              alt="Loading..." />
            <h1 className='text-center text-xs sm:text-sm text-[#999999] bg-[#141414] px-2 py-1 w-full mx-auto mt-3 border border-[#262626] rounded-3xl flex items-center justify-center gap-1'>
              {/* Icon visible only on small screens */}
              <FaRegCalendarAlt className="sm:hidden text-xs sm:text-sm text-[#BFBFBF]" />
              {/* Text visible only on sm and larger */}
              <span className="hidden sm:inline">Released at</span>
              <span className='text-xs sm:text-sm text-[#BFBFBF]'>{" "}
                {new Date(item.first_air_date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </h1>
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

export default NewReleases;
