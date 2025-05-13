import "react";
import { useNavigate } from "react-router-dom";

const FreeTrialSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-center py-16 mb-10">
      <div className="relative w-[90%] bg-black/70 rounded-xl p-10 sm:p-10 flex flex-col sm:flex-row items-center  text-center sm:text-left">
        {/* Background Image */}
        <div
          className="absolute inset-0 rounded-xl bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://i0.wp.com/www.atomcreativemedia.com/wp-content/uploads/2018/09/orange-and-blue-movies-2.jpg?ssl=1')",
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 opacity-100 rounded-xl img-gradient" />

        {/* Content */}
        <div className="relative z-10 text-white sm:w-2/3">
          <h2 className="text-2xl sm:text-3xl font-bold">Start your free trial today!</h2>
          <p className="text-[#999999] text-base xl-max:text-sm md-max:text-xs mt-2">
            This is a clear and concise call to action that encourages users to
            sign up for a free trial of StreamVibe.
          </p>
        </div>

        {/* Button */}
        <div className="relative z-10 mt-4 sm:mt-0 sm:w-1/3 flex justify-center sm:justify-end">
          <button 
            className="bg-[#E50000] text-white text-base xl-max:text-sm md-max:text-sm px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-red-900"
            onClick={() =>
              navigate("/subscriptions")
            }
          >
            Start a Free Trial
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreeTrialSection;
