import { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the form submission here, e.g., sending data to a server.
    console.log('Form Submitted:', formData);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-8xl w-full rounded-lg p-10 md:flex">
        <div className="md:w-1/3">
          <h1 className="text-5xl font-bold text-white mb-6">Welcome to our support page!</h1>
          <p className="text-gray-400 mb-8">
            We are here to help you with any problems you may be having with our product.
          </p>
          <div
            className="bg-gray-700 rounded-lg w-full h-60"
            style={{
              backgroundImage: `url('https://via.placeholder.com/300x300')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
        </div>

        {/* form */}
        <div className="md:w-2/3 mt-8 md:mt-0 md:ml-8">
          <form onSubmit={handleSubmit} className="bg-black1 p-6 border border-black5 rounded-xl">
            <div className="flex space-x-4 md-max:space-x-0 md-max:flex-col">
              {/* first Name */}
              <div className="w-1/2 md-max:w-full">
                <label className="block text-white mb-2" htmlFor="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter First Name"
                  className="w-full px-4 py-2 rounded bg-black2 text-gray-200 focus:outline-none focus:ring focus:ring-red-500 border border-black5"
                />
              </div>
              {/* Last Name */}
              <div className="w-1/2 md-max:w-full md-max:mt">
                <label className="block text-white mb-2" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter Last Name"
                  className="w-full px-4 md-max:w-[100%] py-2 rounded bg-black2 text-gray-200 focus:outline-none focus:ring focus:ring-red-500 border border-black5"
                />
              </div>
            </div>

            <div className="flex space-x-4 md-max:space-x-0 md-max:flex-col">
              {/* email */}
              <div className="w-1/2 md-max:w-full">
                <label className="block text-white mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your Email"
                  className="w-full px-4 py-2 rounded bg-black2 text-gray-200 focus:outline-none focus:ring focus:ring-red-500 border border-black5"
                />
              </div>
              {/* phone Number */}
              <div className="w-1/2 md-max:w-full">
                <label className="block text-white mb-2" htmlFor="phone">
                  Phone Number
                </label>
                <div className="flex items-center space-x-2">
                  <select
                    name="phoneCountry"
                    value={formData.phoneCountry}
                    onChange={handleChange}
                    className="px-4 py-2 rounded bg-black2 text-gray-200 focus:outline-none focus:ring focus:ring-red-500 border border-black5"
                  >
                    <option value="IN">🇮🇳 +91</option>
                    <option value="US">🇺🇸 +1</option>
                    <option value="UK">🇬🇧 +44</option>
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter Phone Number"
                    className="flex px-3 w-full py-2 rounded bg-black2 text-gray-200 focus:outline-none focus:ring focus:ring-red-500 border border-black5"
                  />
                </div>
              </div>
            </div>

            {/* message */}
            <div className="mt-4">
              <label className="block text-white mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Enter your Message"
                className="w-full px-4 py-2 rounded bg-black2 text-gray-200 focus:outline-none focus:ring focus:ring-red-500 border border-black5"
              ></textarea>
            </div>

            <div className="mt-4 md-max:mt-1 flex md-max:flex-col items-center justify-between p-8">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="agree"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="w-4 h-4 text-red-500 bg-black2 rounded focus:ring-red-500"
                />
                <label htmlFor="agree" className="ml-2 text-gray-300">
                  I agree with Terms of Use and Privacy Policy
                </label>
              </div>

              <button
                type="submit"
                className="bg-red1 hover:bg-red-700 text-white py-2 px-4 md-max:w-full rounded focus:outline-none focus:ring focus:ring-red-500 mt-6"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
