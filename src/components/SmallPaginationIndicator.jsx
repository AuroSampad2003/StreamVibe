// eslint-disable-next-line react/prop-types
const SmallPaginationIndicator = ({ totalSlides, currentSlide }) => {
  return (
    <div className="flex md:hidden justify-center mt-2">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <span
          key={index}
          className={`w-2 h-2 mx-1 rounded-full transition ${
            index === currentSlide ? "bg-white scale-125" : "bg-gray-500"
          }`}
        />
      ))}
    </div>
  );
};

export default SmallPaginationIndicator;
