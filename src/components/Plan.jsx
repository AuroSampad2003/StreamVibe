import { useState } from "react";
import { plans } from "../assets/plan";

function Plan() {
    const [isMonthly, setIsMonthly] = useState(true);

    return (
        <div className="text-white px-20 xl-max:px-10 sm-max:px-3 pb-10 mt-16">

            {/* Heading and Toggle Buttons with Responsive Wrap */}
            <h1 className="font-semibold text-4xl xl-max:text-3xl sm-max:text-2xl mb-4 ">
                Choose the plan that’s right for you
            </h1>
            <div className="flex flex-wrap gap-4 justify-between items-start mb-10">
                <div className="flex-1 min-w-[250px]">
                    <p className="text-lg xl-max:text-base sm-max:text-sm text-gray-400">
                        Join StreamVibe and select from our flexible subscription options tailored to suit your viewing preferences. Get ready for non-stop entertainment
                    </p>
                </div>

                {/* Toggle Buttons (Wraps on Smaller Screens) */}
                <div className="flex bg-black1 p-1 rounded-lg border border-gray-900 w-fit">
                    <button
                        className={`px-6 py-2 rounded-lg transition-all ${isMonthly ? "bg-black4 text-white" : "text-gray-500"}`}
                        onClick={() => setIsMonthly(true)}
                    >
                        Monthly
                    </button>
                    <button
                        className={`px-6 py-2 rounded-lg transition-all ${!isMonthly ? "bg-black4 text-white" : "text-gray-500"}`}
                        onClick={() => setIsMonthly(false)}
                    >
                        Yearly
                    </button>
                </div>
            </div>

            {/* Plan Cards */}
            <div className="grid grid-cols-3 gap-6 md-max:grid-cols-1 mt-8">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className="bg-black3 p-5 rounded-lg border border-gray-900 hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out"
                    >
                        <h2 className="text-xl font-semibold text-white">{plan.name}</h2>
                        <p className="text-gray-400 mt-2 text-sm">{plan.description}</p>
                        <p className="text-3xl font-bold mt-4 text-white">
                            {isMonthly ? plan.monthlyPrice : plan.yearlyPrice}
                            <span className="text-lg font-normal text-gray-400">
                                /{isMonthly ? "month" : "year"}
                            </span>
                        </p>
                        {/* Centered Buttons in Row Format */}
                        <div className="mt-6 flex justify-center gap-4">
                            <button className="bg-black1 text-white px-4 py-2 rounded-lg border border-gray-900 hover:bg-black2">
                                Start Free Trial
                            </button>
                            <button className="bg-red1 text-white px-4 py-2 rounded-lg hover:bg-red-900">
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
