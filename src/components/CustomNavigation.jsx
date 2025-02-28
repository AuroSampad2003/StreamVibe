import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const CustomNavigation = ({ onClick, direction }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-80 transition"
      style={{ [direction === "left" ? "left" : "right"]: "10px" }}
    >
      {direction === "left" ? <FaChevronLeft size={24} /> : <FaChevronRight size={24} />}
    </button>
  );
};

export default CustomNavigation;
