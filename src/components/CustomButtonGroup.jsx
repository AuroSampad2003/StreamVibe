import { ChevronLeft, ChevronRight } from "lucide-react";

// eslint-disable-next-line react/prop-types
function CustomButtonGroup({ next, previous }) {
  return (
    <div className="absolute top-[-50px] right-10 sm:right-5 md:right-8 flex items-center gap-3 bg-black4 px-4 py-2 rounded-lg shadow-md">
      <button
        onClick={previous}
        className="bg-black5 p-3 rounded-md hover:bg-gray-800 transition-all"
      >
        <ChevronLeft className="text-white w-5 h-5" />
      </button>

      {/* Progress Indicator */}
      <div className="hidden sm:flex items-center gap-[2px]">
        <div className="w-4 h-[3px] bg-red1 rounded-md"></div>
        <div className="w-3 h-[2px] bg-gray-600 rounded-md"></div>
        <div className="w-3 h-[2px] bg-gray-600 rounded-md"></div>
        <div className="w-3 h-[2px] bg-gray-600 rounded-md"></div>
      </div>

      <button
        onClick={next}
        className="bg-black5 p-3 rounded-md hover:bg-gray-800 transition-all"
      >
        <ChevronRight className="text-white w-5 h-5" />
      </button>
    </div>
  );
}

export default CustomButtonGroup;
