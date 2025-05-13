import React from 'react';
import Plan from '../components/Plan';

function Subscriptions() {
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

  return (
    <div className="text-white min-h-screen px-4 md:px-16 ">
      <Plan />

      {/* Pricing Table */}
      <div className="px-20 xl-max:px-10 sm-max:px-3 mb-10 mt-24">
        <h1 className="font-semibold text-4xl xl-max:text-3xl sm-max:text-2xl mb-4">
          Compare our plans and find the right one for you
        </h1>
        <p className="text-lg xl-max:text-base sm-max:text-sm text-[#999999] mb-12">
          StreamVibe offers three different plans to fit your needs: Basic, Standard, and Premium. Compare the features of each plan and choose the one that&apos;s right for you.
        </p>

        <div className="overflow-x-auto">
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
            <tbody className="">
              {features.map((feature, index) => (
                <tr key={index} className="text-[#999999] text-sm">
                  <td className="p-4 border border-[#262626] whitespace-nowrap">{feature.label}</td>
                  <td className="p-4 border border-[#262626]">{feature.basic}</td>
                  <td className="p-4 border border-[#262626]">{feature.standard}</td>
                  <td className="p-4 border border-[#262626]">{feature.premium}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Subscriptions;
