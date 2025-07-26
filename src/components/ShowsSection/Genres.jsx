import { useContext, useState, useRef, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import CategoriesContext from "../../context/CategoriesContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

// eslint-disable-next-line react/prop-types
function Genres({ categoryType = "tv" }) {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const {
    setCategoryType,
    genresList,
    genresDetails,
    isFetchingGenres,
    isFetching
  } = useContext(CategoriesContext);

  useEffect(() => {
    if (setCategoryType) {
      setCategoryType(categoryType);
    }
  }, [categoryType, setCategoryType]);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 3 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
  };

  const filteredGenres = genresList.filter((genre) => {
    return categoryType === "tv"
      ? ![99, 10402, 9648].includes(genre.id) // Avoid movie genres for TV shows
      : ![10770, 37].includes(genre.id); // Avoid tv and other non-movie genres
  });

  // Function to handle navigation
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

  // Responsive full-page skeleton loader
  const renderFullPageSkeleton = () => (
    <div className="text-white px-5 sm:px-3 md:px-10 lg:px-20 mt-8 mb-16 animate-pulse select-none">
      {/* Heading Skeleton */}
      <div className="h-8 w-48 sm:w-36 md:w-48 bg-gray-700 rounded mb-6 mx-auto md:mx-0"></div>

      {/* Navigation & Pagination Skeleton */}
      <div className="flex justify-between items-center mb-6 px-2 md:px-0">
        {/* Left blank area on md+ */}
        <div className="hidden md:block w-48 h-6 bg-gray-700 rounded"></div>

        {/* Navigation buttons: visible on md+ */}
        <div className="hidden md:flex items-center gap-3 bg-[#0F0F0F] px-1.5 py-1.5 rounded-lg border border-[#1F1F1F] shadow-md">
          {/* Prev Button Skeleton */}
          <div className="bg-[#1A1A1A] p-2.5 rounded-md border border-[#1F1F1F] w-10 h-10"></div>

          {/* Pagination Dots Skeleton */}
          <div className="flex items-center gap-[3px]">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`w-3 h-[2.5px] rounded-md bg-gray-800 ${index === 0 ? "w-4 bg-gray-600" : ""
                  }`}
              ></div>
            ))}
          </div>

          {/* Next Button Skeleton */}
          <div className="bg-[#1A1A1A] p-2.5 rounded-md border border-[#1F1F1F] w-10 h-10"></div>
        </div>
      </div>

      {/* Carousel Skeleton: horizontally scrollable on mobile, grid on md+ */}
      <div className="flex overflow-x-auto gap-4 no-scrollbar md:grid md:grid-flow-col md:auto-cols-[calc((100%/5)-1rem)]">
        {[...Array(5)].map((_, idx) => (
          <div
            key={idx}
            className="bg-[#232323] border border-[#303030] p-4 rounded-xl min-w-[180px] max-w-[180px] sm:min-w-[140px] sm:max-w-[140px] md:min-w-[10rem] md:max-w-[10rem]"
          >
            {/* Image placeholders */}
            <div className="grid grid-cols-2 gap-2">
              {[...Array(4)].map((__, thumbIdx) => (
                <div
                  key={thumbIdx}
                  className="rounded-lg w-full h-20 sm:h-16 bg-[#313131]"
                />
              ))}
            </div>
            {/* Text and button placeholders */}
            <div className="flex justify-between items-center px-1 mt-4">
              <div className="w-20 sm:w-16 h-5 sm:h-4 bg-[#313131] rounded-md" />
              <div className="w-7 h-7 sm:w-6 sm:h-6 bg-[#252525] rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Small screen pagination skeleton */}
      <div className="md:hidden flex justify-center mt-4 px-2">
        <div className="w-20 h-1 bg-gray-800 rounded-full relative">
          <div className="h-1 bg-gray-600 rounded-full w-full"></div>
        </div>
      </div>
    </div>
  );

  // Use skeleton loader while fetching genres or details
  if (isFetchingGenres || isFetching) {
    return renderFullPageSkeleton();
  }

  return (
    <div className="text-white px-20 xl:px-10 sm-max:px-0.5 mt-8 mb-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-2xl lg:text-2xl sm:text-xl">Our Genres</h2>

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

      {/* Genres Carousel */}
      <Carousel
        ref={carouselRef}
        responsive={responsive}
        infinite={true}
        className="mt-6 py-4"
        arrows={false}
        swipeable={true}
        draggable={true}
        beforeChange={(nextSlide) => setCurrentIndex(nextSlide % filteredGenres.length)}
      >
        {filteredGenres.map((genre, index) => (
          <div
            className="bg-[#1A1A1A] border border-[#262626] p-4 rounded-xl mx-2 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
            key={index}
            onClick={() =>
              navigate("/categoriesList", {
                state: {
                  genreName: genre.name,
                  categoryType, // Use the dynamic categoryType for navigation
                },
              })
            }
          >
            {/* Thumbnails */}
            <div className="grid grid-cols-2 gap-2">
              {genresDetails.filter((item) =>
                item.genre_ids.includes(genre.id)
              ).slice(0, 4).length > 0 ? (
                genresDetails
                  .filter((item) => item.genre_ids.includes(genre.id))
                  .slice(0, 4)
                  .map((item, idx) => (
                    <div key={idx}>
                      <img
                        className="rounded-lg w-full h-24 object-cover"
                        src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                        alt={item.title || item.name}
                      />
                    </div>
                  ))
              ) : (
                <div className="col-span-2 flex justify-center items-center h-[100px]">
                  <div className="w-8 h-8 border-4 border-[#999999] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>

            {/* Genre Name and Navigation Button */}
            <div className="flex justify-between items-center px-1 mt-4">
              <h2 className="text-lg font-semibold">{genre.name}</h2>
              <button className="bg-[#262626] p-2 rounded-md hover:bg-gray-800 transition-all">
                <ChevronRight className="text-white w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Small Screen Pagination Indicator */}
      <div className="md:hidden flex justify-center mt-4">
        <div className="w-20 h-1 bg-gray-800 rounded-full relative">
          <div
            className="h-1 bg-[#E50000] rounded-full"
            style={{
              width: filteredGenres.length > 0
                ? `${(currentIndex / filteredGenres.length) * 100}%`
                : "0%",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Genres;
