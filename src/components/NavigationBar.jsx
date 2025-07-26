import { useState, useEffect, useMemo, useRef } from "react";
//import { assets } from "../assets/assets";
import { FaPlay } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaMagnifyingGlass,
  FaBell,
  FaClapperboard,
  FaHouse,
  FaCommentDots,
  FaCircleDollarToSlot,
} from "react-icons/fa6";
import { } from "react-icons/fa6";

function NavigationBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search) {
      navigate("/searchlist", { state: { search } });
    }
  };

  const handleMobileSearchSubmit = (e) => {
    e.preventDefault();
    if (mobileSearchQuery.trim()) {
      navigate("/searchlist", { state: { search: mobileSearchQuery } });
      setMobileSearchQuery("");
      setIsMobileSearchOpen(false);
    }
  };

  const handleSearchChange = (e) => setSearch(e.target.value);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  // Close desktop search on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile search on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target)
      ) {
        setIsMobileSearchOpen(false);
      }
    }

    if (isMobileSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileSearchOpen]);

  // Scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = useMemo(
    () => (
      <>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `py-2 px-3 rounded-lg text-center hover:scale-110 transition-transform duration-300 ease-in-out ${isActive ? "font-semibold bg-[#1A1A1A] text-white" : "text-[#BFBFBF]"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            `py-2 px-3 rounded-lg text-center hover:scale-110 transition-transform duration-300 ease-in-out ${isActive ? "font-semibold bg-[#1A1A1A] text-white" : "text-[#BFBFBF]"
            }`
          }
        >
          Movies & Shows
        </NavLink>
        <NavLink
          to="/support"
          className={({ isActive }) =>
            `py-2 px-3 rounded-lg text-center hover:scale-110 transition-transform duration-300 ease-in-out ${isActive ? "font-semibold bg-[#1A1A1A] text-white" : "text-[#BFBFBF]"
            }`
          }
        >
          Support
        </NavLink>
        <NavLink
          to="/subscriptions"
          className={({ isActive }) =>
            `py-2 px-3 rounded-lg text-center hover:scale-110 transition-transform duration-300 ease-in-out ${isActive ? "font-semibold bg-[#1A1A1A] text-white" : "text-[#BFBFBF]"
            }`
          }
        >
          Subscriptions
        </NavLink>
      </>
    ),
    []
  );

  return (
    <>
      {/* Wrapper */}
      <div className="fixed top-0 left-0 right-0 z-[100]">
        {/* Top Navbar */}
        <div
          className={`flex items-center justify-between px-20 xl-max:px-10 sm-max:px-3 py-4 transition-all duration-300 ${isScrolled ? "bg-[#141414] text-white" : "bg-transparent text-white"
            }`}
        >
          {/* Logo */}
          <div className="flex flex-row items-center">
            <div className="relative w-7 h-7 sm:w-10 sm:h-10 md:w-10 md:h-10 flex items-center justify-center">
              <svg
                className="absolute top-0 left-0 w-full h-full rotate-[325deg]"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#E50000"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="265 45"
                  strokeLinecap="round"
                />
              </svg>
              <FaPlay className="text-[#E50000] w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-5 md:h-5 z-10" />
            </div>
            <div className="ml-1 flex text-xl sm:text-2xl md:text-3xl font-light">
              <span className="text-white font-semibold">Stream</span>
              <span className="text-[#E50000] font-normal">Vibe</span>
            </div>
          </div>


          {/* Desktop Nav */}
          <div className="bg-[#0F0F0F] text-[#BFBFBF] px-10 py-2 xl-max:p-3 xl-max:py-1 rounded-xl border-2 border-[#1F1F1F] flex gap-6 xl-max:gap-4 items-center justify-center lg-max:hidden">
            {navLinks}
          </div>

          {/* Search + Notifications */}
          <div className="flex items-center gap-4">
            {/* Desktop Search */}
            <div className="hidden sm:flex relative items-center" ref={searchRef}>
              <form
                onSubmit={handleSearchSubmit}
                className={`relative flex items-center transition-all duration-300 border-2 border-gray-600 rounded-full overflow-hidden ${isSearchOpen ? "w-64 px-4 py-2" : "w-10 h-10 justify-center"
                  }`}
              >
                <FaMagnifyingGlass
                  className={`transition-all duration-300 ${isSearchOpen
                    ? "mr-2 text-white"
                    : "text-white cursor-pointer"
                    }`}
                  onClick={toggleSearch}
                />
                <input
                  type="text"
                  value={search}
                  onChange={handleSearchChange}
                  className={`bg-transparent text-white outline-none ${isSearchOpen ? "w-full" : "w-0 opacity-0"
                    }`}
                  placeholder="Search Movies"
                />
              </form>
            </div>

            {/* Notification */}
            <div className="relative">
              <button className="text-white focus:outline-none">
                <FaBell className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <span className="absolute top-0 right-0 h-2 w-2 bg-[#E50000] rounded-full border border-[#141414]"></span>
            </div>

          </div>
        </div>

        {/* Mobile Search Glass Box */}
        {isMobileSearchOpen && (
          <form
            ref={mobileSearchRef}
            onSubmit={handleMobileSearchSubmit}
            className="z-40 bg-[rgba(255,255,255,0.1)] backdrop-blur-md px-4 py-3 flex items-center gap-2 sm:hidden rounded-xl border border-gray-500 mx-4 mt-2"
          >
            <FaMagnifyingGlass className="text-white w-5 h-5" />
            <input
              type="text"
              value={mobileSearchQuery}
              onChange={(e) => setMobileSearchQuery(e.target.value)}
              placeholder="Search Movies"
              className="flex-grow bg-transparent text-white placeholder-gray-300 outline-none text-sm"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setIsMobileSearchOpen(false)}
              className="text-white text-sm"
            >
              Cancel
            </button>
          </form>
        )}
      </div>

      {/* Spacer for Fixed Navbar */}
      <div className="h-[72px] sm:h-[88px]" />

      {/* Bottom Mobile Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0F0F0F] border-t border-[#1F1F1F] flex justify-around items-center py-2 sm:hidden z-[99999] text-xs">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center text-center w-[20%] ${isActive ? 'text-[#E50000]' : 'text-[#BFBFBF]'}`
          }
          title="Home"
        >
          <FaHouse className="w-6 h-6 mb-0.5" />
          <span className="text-[10px] leading-none">Home</span>
        </NavLink>

        <NavLink
          to="/movies"
          className={({ isActive }) =>
            `flex flex-col items-center text-center truncate w-[20%] ${isActive ? 'text-[#E50000]' : 'text-[#BFBFBF]'}`
          }
          title="Movies & Shows"
        >
          <FaClapperboard className="w-6 h-6 mb-0.5" />
          <span className="text-[10px] leading-none">Movies & Shows</span>
        </NavLink>

        <button
          onClick={() => setIsMobileSearchOpen(true)}
          className="flex flex-col items-center text-center w-[20%] text-[#BFBFBF] hover:text-white"
          title="Search"
        >
          <FaMagnifyingGlass className="w-6 h-6 mb-0.5" />
          <span className="text-[10px] leading-none">Search</span>
        </button>

        <NavLink
          to="/support"
          className={({ isActive }) =>
            `flex flex-col items-center text-center w-[20%] ${isActive ? 'text-[#E50000]' : 'text-[#BFBFBF]'}`
          }
          title="Support"
        >
          <FaCommentDots className="w-6 h-6 mb-0.5" />
          <span className="text-[10px] leading-none">Support</span>
        </NavLink>

        <NavLink
          to="/subscriptions"
          className={({ isActive }) =>
            `flex flex-col items-center text-center w-[20%] ${isActive ? 'text-[#E50000]' : 'text-[#BFBFBF]'}`
          }
          title="Subscriptions"
        >
          <FaCircleDollarToSlot className="w-6 h-6 mb-0.5" />
          <span className="text-[10px] leading-none">Plans</span>
        </NavLink>
      </div>

    </>
  );
}

export default NavigationBar;
