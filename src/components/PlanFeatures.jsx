import { useState } from 'react';

function PlanFeatures() {
  const [selectedPlan, setSelectedPlan] = useState('standard');

  const features = [
    { label: 'Price', basic: '$9.99/Month', standard: '$12.99/Month', premium: '$14.99/Month' },
    {
      label: 'Content',
      basic: 'Access to a wide selection of movies and shows, including some new releases.',
      standard: 'Access to a wider selection of movies and shows, including most new releases and exclusive content',
      premium: 'Access to a widest selection of movies and shows, including all new releases and Offline Viewing',
    },
    {
      label: 'Devices',
      basic: 'Watch on one device simultaneously',
      standard: 'Watch on Two device simultaneously',
      premium: 'Watch on Four device simultaneously',
    },
    { label: 'Free Trial', basic: '7 Days', standard: '7 Days', premium: '7 Days' },
    { label: 'Cancel Anytime', basic: 'Yes', standard: 'Yes', premium: 'Yes' },
    { label: 'HDR', basic: 'No', standard: 'Yes', premium: 'Yes' },
    { label: 'Dolby Atmos', basic: 'No', standard: 'Yes', premium: 'Yes' },
    { label: 'Ad - Free', basic: 'No', standard: 'Yes', premium: 'Yes' },
    { label: 'Offline Viewing', basic: 'No', standard: 'Yes, for select titles.', premium: 'Yes, for all titles.' },
    { label: 'Family Sharing', basic: 'No', standard: 'Yes, up to 5 family members.', premium: 'Yes, up to 6 family members.' },
  ];

  const getFeatureValue = (label) => features.find((f) => f.label === label)?.[selectedPlan];

  return (
    <div className="px-20 xl-max:px-10 sm-max:px-3 mb-16 mt-16">
      <h1 className="font-semibold text-4xl xl-max:text-3xl sm-max:text-2xl mb-4">
        Compare our plans and find the right one for you
      </h1>
      <p className="text-base xl-max:text-sm md-max:text-xs text-[#999999] mb-12">
        StreamVibe offers three different plans to fit your needs: Basic, Standard, and Premium.
      </p>

      {/* Large Screen Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 border border-[#262626] rounded-lg">
          <thead>
            <tr className="bg-[#0F0F0F]">
              <th className="p-4 text-left border border-[#262626]">Features</th>
              <th className="p-4 text-left border border-[#262626]">Basic</th>
              <th className="p-4 text-left border border-[#262626]">
                Standard{' '}
                <span className="text-xs bg-[#E50000] text-white px-1 py-0.5 rounded-sm ml-2">
                  Popular
                </span>
              </th>
              <th className="p-4 text-left border border-[#262626]">Premium</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index} className="text-[#999999] text-sm">
                <td className="p-4 border border-[#262626]">{feature.label}</td>
                <td className="p-4 border border-[#262626]">{feature.basic}</td>
                <td className="p-4 border border-[#262626]">{feature.standard}</td>
                <td className="p-4 border border-[#262626]">{feature.premium}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Small Screen Toggle Cards */}
      <div className="block md:hidden">
        <div className="flex justify-center">
          <div className="flex bg-[#0F0F0F] p-1 rounded-lg border border-[#262626] w-fit max-w-md justify-center mb-6">
            {['basic', 'standard', 'premium'].map((plan) => (
              <button
                key={plan}
                onClick={() => setSelectedPlan(plan)}
                className={`px-6 py-2 text-base xl-max:text-sm md-max:text-sm rounded-lg transition-all ${selectedPlan === plan ? 'bg-[#1F1F1F] text-white' : 'text-[#999999]'}`}
              >
                {plan.charAt(0).toUpperCase() + plan.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6 border bg-[#0F0F0F] border-[#262626] rounded-lg p-4 text-xs">
          {/* Row 1: Price + Free Trial */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[#999999]">Price</div>
              <div className="text-white font-normal mt-1">{getFeatureValue('Price')}</div>
            </div>
            <div>
              <div className="text-[#999999]">Free Trial</div>
              <div className="text-white font-normal mt-1">{getFeatureValue('Free Trial')}</div>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="text-[#999999]">Content</div>
            <div className="text-white font-normal mt-1">{getFeatureValue('Content')}</div>
          </div>

          {/* Devices */}
          <div>
            <div className="text-[#999999]">Devices</div>
            <div className="text-white font-normal mt-1">{getFeatureValue('Devices')}</div>
          </div>

          {/* Cancel Anytime + HDR */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[#999999]">Cancel Anytime</div>
              <div className="text-white font-normal mt-1">{getFeatureValue('Cancel Anytime')}</div>
            </div>
            <div>
              <div className="text-[#999999]">HDR</div>
              <div className="text-white font-normal mt-1">{getFeatureValue('HDR')}</div>
            </div>
          </div>

          {/* Dolby Atmos + Ad-Free */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[#999999]">Dolby Atmos</div>
              <div className="text-white font-normal mt-1">{getFeatureValue('Dolby Atmos')}</div>
            </div>
            <div>
              <div className="text-[#999999]">Ad - Free</div>
              <div className="text-white font-normal mt-1">{getFeatureValue('Ad - Free')}</div>
            </div>
          </div>

          {/* Offline Viewing + Family Sharing */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[#999999]">Offline Viewing</div>
              <div className="text-white font-normal mt-1">{getFeatureValue('Offline Viewing')}</div>
            </div>
            <div>
              <div className="text-[#999999]">Family Sharing</div>
              <div className="text-white font-normal mt-1">{getFeatureValue('Family Sharing')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanFeatures;
