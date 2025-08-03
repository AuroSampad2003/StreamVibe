import { useState } from "react";
// import { plans } from "../assets/plan";

function Plan() {
    const [isMonthly, setIsMonthly] = useState(true);

    const plans = [
        {
            name: "Basic Plan",
            description:
                "Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.",
            monthlyPrice: "$9.99",
            yearlyPrice: "$99.99",
        },
        {
            name: "Standard Plan",
            description:
                "Access to a wider selection of movies and shows, including most new releases and exclusive content.",
            monthlyPrice: "$12.99",
            yearlyPrice: "$129.99",
        },
        {
            name: "Premium Plan",
            description:
                "Access to the widest selection of movies and shows, including all new releases and Offline Viewing.",
            monthlyPrice: "$14.99",
            yearlyPrice: "$149.99",
        },
    ];

    return (
        <div className="text-white px-20 xl-max:px-10 sm-max:px-3 mt-2 mb-2 sm:mt-10 sm:mb-32">

            {/* Heading and Toggle Buttons with Responsive Wrap */}
            <h1 className="font-semibold text-4xl xl-max:text-3xl sm-max:text-2xl mb-4 ">
                Choose the plan that’s right for you
            </h1>
            <div className="flex flex-wrap justify-center sm:justify-between items-start gap-4 mb-6">
                <div className="flex-1 min-w-[250px]">
                    <p className="text-base xl-max:text-sm md-max:text-xs text-[#999999]">
                        Join StreamVibe and select from our flexible subscription options tailored to suit your viewing preferences. Get ready for non-stop entertainment!
                    </p>
                </div>

                {/* Toggle Buttons (Wraps on Smaller Screens) */}
                <div className="flex bg-[#0F0F0F] p-1 rounded-lg border border-[#262626] w-fit">
                    <button
                        className={`px-6 py-2 text-base xl-max:text-sm md-max:text-sm rounded-lg transition-all ${isMonthly ? "bg-[#1F1F1F] text-white" : "text-[#999999]"}`}
                        onClick={() => setIsMonthly(true)}
                    >
                        Monthly
                    </button>
                    <button
                        className={`px-6 py-2 text-base xl-max:text-sm md-max:text-sm rounded-lg transition-all ${!isMonthly ? "bg-[#1F1F1F] text-white" : "text-[#999999]"}`}
                        onClick={() => setIsMonthly(false)}
                    >
                        Yearly
                    </button>
                </div>
            </div>

            {/* Plan Cards */}
            <div className="grid grid-cols-3 gap-8 md-max:grid-cols-1 mt-8">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className="bg-[#1A1A1A] p-7 rounded-xl border border-[#262626]"
                    >
                        <h2 className="text-xl font-semibold text-white">{plan.name}</h2>
                        <p className="text-[#999999] mt-2 text-base xl-max:text-sm md-max:text-xs">{plan.description}</p>
                        <p className="text-3xl font-bold mt-4 text-white">
                            {isMonthly ? plan.monthlyPrice : plan.yearlyPrice}
                            <span className="text-lg xl-max:text-base md-max:text-sm font-normal text-[#999999]">
                                /{isMonthly ? "month" : "year"}
                            </span>
                        </p>
                        {/* Centered Buttons in Row Format */}
                        <div className="mt-6 flex justify-center gap-6 w-full">
                            <button className="flex-1 bg-[#141414] text-white text-base xl-max:text-sm md-max:text-sm px-4 py-2 rounded-lg border border-[#262626] hover:bg-[#262626]">
                                Start Free Trial
                            </button>
                            <button className="flex-1 bg-[#E50000] text-white text-base xl-max:text-sm md-max:text-sm px-4 py-2 rounded-lg hover:bg-red-900">
                                Choose Plan
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Plan;
