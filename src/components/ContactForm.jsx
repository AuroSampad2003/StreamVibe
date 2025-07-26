import { useState, useEffect } from 'react';

function ContactForm() {
  const [movieData, setMovieData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState(''); // 'success' | 'error' | 'info'
  const [showStatus, setShowStatus] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    phoneCountry: 'IN',
    message: '',
    agree: false,
  });

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxwNXV2Uw1X2YRl-EEkwDtEpCheCoT018gKG0ATbtQNGYJOPvUe9fh3QJDQo_JjrdpDsg/exec';

  const TMDB_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer YOUR_TOKEN_HERE',
    },
  };

  useEffect(() => {
    if (!isFetching) return;
    const fetchMovies = async () => {
      try {
        const [res1, res2] = await Promise.all([
          fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', TMDB_OPTIONS),
          fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=2', TMDB_OPTIONS),
        ]);
        const data1 = await res1.json();
        const data2 = await res2.json();
        setMovieData([...data1.results, ...data2.results]);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchMovies();
  }, [isFetching]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, email, message } = formData;
    if (!firstName || !email || !message) {
      setStatusMessage('Please fill in required fields: First Name, Email, and Message.');
      setStatusType('error');
      setShowStatus(true); // 👈 this was missing!

      // Auto-hide after 2 seconds
      // setTimeout(() => {
      //   setShowStatus(false);
      //   setTimeout(() => {
      //     setStatusMessage('');
      //     setStatusType('');
      //   }, 500); // fade-out time
      // }, 2000);

      return;
    }

    setIsSending(true);
    setShowStatus(true); // Start showing it
    setStatusMessage('Sending message...');
    setStatusType('info');

    const formBody = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formBody.append(key, value);
    });

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formBody,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.text();
      console.log('Form submission successful:', result);

      setStatusMessage('Message sent successfully!');
      setStatusType('success');

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        phoneCountry: 'IN',
        message: '',
        agree: false,
      });

      // 🔥 Auto-hide success message after 2 seconds
      setTimeout(() => {
        setShowStatus(false); // trigger fade-out
        setTimeout(() => {
          setStatusMessage('');
          setStatusType('');
        }, 500); // give some time for fade-out to finish
      }, 2000);

    } catch (error) {
      console.error('Form submission failed:', error);
      setStatusMessage('Failed to send message. Please try again.');
      setStatusType('error');
      setTimeout(() => {
        setShowStatus(false);
        setTimeout(() => {
          setStatusMessage('');
          setStatusType('');
        }, 500);
      }, 2000);

    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="text-white px-20 xl-max:px-10 sm-max:px-3 mt-2 mb-2 sm:mt-10 sm:mb-32">
      <div className="rounded-lg flex flex-wrap justify-between gap-8">
        {/* Movie Poster Section */}
        <div className="w-full md:w-[50%] xl:w-1/3 mb-0 md:mb-0">
          <h1 className="font-semibold text-4xl xl-max:text-3xl sm-max:text-2xl mb-4 leading-tight">
            Welcome to our support page!
          </h1>
          <p className="text-[#999999] mb-6 text-sm md:text-base">
            We are here to help you with any problems you may be having with our product.
          </p>
          <div className="grid grid-cols-6 sm:grid-cols-6 md:grid-cols-6 gap-2 bg-[#0F0F0F] p-2 rounded-2xl border border-[#262626]">
            {movieData.slice(0, 18).map((data, index) => (
              <div key={index} className="aspect-[2/3] rounded-lg overflow-hidden bg-[#111]">
                <img
                  className="w-full h-full object-cover"
                  src={`https://image.tmdb.org/t/p/w500/${data.poster_path || data.backdrop_path}`}
                  alt="Movie Poster"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="w-full md:w-[60%] mt-4 sm:mt-8 md:mt-0 md:ml-8">
          <form onSubmit={handleSubmit} className="bg-[#0F0F0F] p-8 border border-[#262626] rounded-xl text-base xl-max:text-sm md-max:text-xs">

            {/* Status Message */}
            {statusMessage && (
              <div className="flex justify-center">
                <div
                  className={`
        mb-8 text-base xl-max:text-sm md-max:text-xs font-medium text-center transition-all duration-500 ease-in-out
        ${statusType === 'success' ? 'text-green-700' :
                      statusType === 'error' ? 'text-red-600' :
                        'text-blue-700'
                    }
        ${showStatus ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
      `}
                >
                  {statusMessage}
                </div>
              </div>
            )}


            {/* Form Fields */}
            {/* First Row: First + Last Name */}
            <div className="flex space-x-4 md-max:space-x-0 md-max:flex-col md-max:space-y-4">
              {/* First Name */}
              <div className="w-1/2 md-max:w-full">
                <label className="block text-white mb-2" htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter First Name"
                  className="w-full px-4 py-2 rounded bg-[#141414] text-[#BFBFBF] placeholder-[#999999] border border-[#262626] focus:border-[#E50000] focus:outline-none"
                />
              </div>
              {/* Last Name */}
              <div className="w-1/2 md-max:w-full">
                <label className="block text-white mb-2" htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter Last Name"
                  className="w-full px-4 py-2 rounded bg-[#141414] text-[#BFBFBF] placeholder-[#999999] border border-[#262626] focus:border-[#E50000] focus:outline-none"
                />
              </div>
            </div>

            {/* Second Row: Email + Phone */}
            <div className="flex space-x-4 md-max:space-x-0 md-max:flex-col md-max:space-y-4 mt-6">
              {/* Email */}
              <div className="w-1/2 md-max:w-full">
                <label className="block text-white mb-2" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your Email"
                  className="w-full px-4 py-2 rounded bg-[#141414] text-[#BFBFBF] placeholder-[#999999] border border-[#262626] focus:border-[#E50000] focus:outline-none"
                />
              </div>
              {/* Phone Number */}
              <div className="w-1/2 md-max:w-full">
                <label className="block text-white mb-2" htmlFor="phone">Phone Number</label>
                <div className="flex items-center space-x-2">
                  <select
                    name="phoneCountry"
                    value={formData.phoneCountry}
                    onChange={handleChange}
                    className="px-4 py-2 rounded bg-[#141414] text-[#BFBFBF] border border-[#262626] focus:border-[#E50000] focus:outline-none"
                  >
                    <option value="IN">🇮🇳 +91</option>
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter Phone Number"
                    className="flex px-3 w-full py-2 rounded bg-[#141414] text-[#BFBFBF] border border-[#262626] focus:border-[#E50000] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="mt-6">
              <label className="block text-white mb-2" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Enter your Message"
                className="w-full px-4 py-2 rounded bg-[#141414] text-[#BFBFBF] border border-[#262626] focus:border-[#E50000] focus:outline-none"
              ></textarea>
            </div>

            {/* Terms & Submit */}
            <div className="mt-6 flex md-max:flex-col items-center justify-between px-0">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="agree"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="w-4 h-4 accent-[#E50000] bg-[#141414] rounded focus:ring-[#E50000]"
                />
                <label htmlFor="agree" className="ml-2 text-[#999999]">I agree with Terms of Use and Privacy Policy</label>
              </div>
              <button
                type="submit"
                disabled={isSending}
                className={`text-white text-base xl-max:text-sm md-max:text-sm px-4 py-2 rounded-lg mt-6 ${isSending ? 'bg-red-900 cursor-not-allowed' : 'bg-[#E50000] hover:bg-red-900'
                  }`}
              >
                {isSending ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
