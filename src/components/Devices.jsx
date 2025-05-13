import { devicesDetails } from "../assets/devicesDetails";

function Devices() {
  return (
    <div className="text-white px-20 xl-max:px-10 sm-max:px-3 pb-16">
      <div className="pt-24">
        <h1 className="font-semibold text-4xl xl-max:text-3xl sm-max:text-2xl">
          We Provide you streaming experience across various devices.
        </h1>
        <p className="mt-4 text-base xl-max:text-sm md-max:text-xs text-[#999999]">
          With StreamVibe, you can enjoy your favorite movies and TV shows anytime, anywhere. Our platform is designed to be compatible with a wide range of devices, ensuring that you never miss a moment of entertainment.
        </p>
      </div>

      <div className="grid grid-cols-3 md-max:grid-cols-1 gap-8 xl-max:gap-5 mt-14">
        {devicesDetails.map((item, index) => (
          <div
            key={index}
            className="border border-[#262626] px-14 xl-max:px-6 py-9 rounded-xl device-gradient transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:rotate-1"
          >
            <div className="flex items-center">
              <div className="bg-[#141414] rounded-lg p-3 border border-[#1F1F1F]">
                <item.icon className="text-[#E50000] text-3xl" />
              </div>
              <h1 className="pl-6 text-lg font-semibold">{item.device}</h1>
            </div>
            <p className="text-base xl-max:text-sm md-max:text-xs text-[#999999] mt-3">{item.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Devices;
