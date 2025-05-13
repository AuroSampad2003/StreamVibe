import { useState, useEffect } from 'react';

function ContactForm() {
  const [movieData, setMovieData] = useState([]);
  const [isFetching, setIsFetching] = useState(true); // To track if data is being fetched
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    agree: false,
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWZiZTAyYjM1YTU4ZTc1MmU0YTYyNjJhOWZkMmFkYyIsIm5iZiI6MTc0MDc1MTQ5My4zNTgsInN1YiI6IjY3YzFjMjg1OWFkY2QyNTYyNTM1YzIyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OvJ5K7QpCiaubjID0pJj146d-S05U_0E6JD0pxV_D_o",
    },
  };

  useEffect(() => {
    if (isFetching) {
      // Fetch data from page 1 and page 2
      Promise.all([
        fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", options)
          .then((response) => response.json()),
        fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=2", options)
          .then((response) => response.json()),
      ])
        .then(([result1, result2]) => {
          // Concatenate the arrays from both results
          setMovieData([...result1.results, ...result2.results]); // Combine results
          setIsFetching(false); // Mark fetching as complete
        })
        .catch((error) => {
          console.error("Error fetching movie data:", error);
          setIsFetching(false);
        });
    }
  }, [isFetching]);

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
      <div className="rounded-lg flex flex-wrap justify-center text-white  mt-16 mb-16 gap-8">
        {/* Movie Poster Section */}
        <div className="md:w-1/3 w-full">
          <h1 className="font-semibold text-4xl xl-max:text-3xl sm-max:text-2xl mb-4">
            Welcome to our support page!
          </h1>
          <p className="text-[#999999] mb-8">
            We are here to help you with any problems you may be having with our product.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 p-2 bg-[#0F0F0F] rounded-2xl border border-[#262626]">
            {movieData.slice(0, 18).map((data, index) => (
              <div
                key={index}
                className="aspect-[3/4] overflow-hidden rounded-xl bg-[#111]"
              >
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
        <div className="md:w-1/2 w-full mt-8 md:mt-0 md:ml-8">
          <form onSubmit={handleSubmit} className="bg-[#0F0F0F] p-8 border border-[#262626] rounded-xl">
            <div className="flex space-x-4 md-max:space-x-0 md-max:flex-col">
              {/* First Name */}
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
                  className="w-full px-4 py-2 rounded bg-[#141414] text-[#BFBFBF] placeholder-[#999999] border border-[#262626] focus:border-[#E50000] focus:outline-none"
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
                  className="w-full px-4 md-max:w-[100%] py-2 rounded bg-[#141414] text-[#BFBFBF] placeholder-[#999999] border border-[#262626] focus:border-[#E50000] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex space-x-4 md-max:space-x-0 md-max:flex-col mt-6">
              {/* Email */}
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
                  className="w-full px-4 py-2 rounded bg-[#141414] text-[#BFBFBF] placeholder-[#999999] border border-[#262626] focus:border-[#E50000] focus:outline-none"
                />
              </div>
              {/* Phone Number */}
              <div className="w-1/2 md-max:w-full">
                <label className="block text-white mb-2" htmlFor="phone">
                  Phone Number
                </label>
                <div className="flex items-center space-x-2">
                  <select
                    name="phoneCountry"
                    value={formData.phoneCountry}
                    onChange={handleChange}
                    className="px-4 py-2 rounded bg-[#141414] text-[#BFBFBF] placeholder-[#999999] border border-[#262626] focus:border-[#E50000] focus:outline-none"
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
                    className="flex px-3 w-full py-2 rounded bg-[#141414] text-[#BFBFBF] placeholder-[#999999] border border-[#262626] focus:border-[#E50000] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="mt-6">
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
                className="w-full px-4 py-2 rounded bg-[#141414] text-[#BFBFBF] placeholder-[#999999] border border-[#262626] focus:border-[#E50000] focus:outline-none"
              ></textarea>
            </div>

            <div className="mt-6 md-max:mt-1 flex md-max:flex-col items-center justify-between px-8">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="agree"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="w-4 h-4 accent-[#E50000] bg-[#141414] rounded focus:ring-[#E50000]"
                />
                <label htmlFor="agree" className="ml-2 text-[#999999] ">
                  I agree with Terms of Use and Privacy Policy
                </label>
              </div>

              <button
                type="submit"
                className="bg-[#E50000] hover:bg-red-900 text-white py-2 px-4 md-max:w-full rounded focus:outline-none mt-6"
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
