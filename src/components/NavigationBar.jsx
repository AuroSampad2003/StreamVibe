import { useState, useEffect, useMemo, useRef } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSearch, FaBell } from "react-icons/fa";
import { Drawer, IconButton } from "@material-tailwind/react";

function NavigationBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const searchRef = useRef(null);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search) {
      navigate("/searchlist", { state: { search } });
    }
  };

  // Toggle search bar visibility
  const handleSearchChange = (e) => setSearch(e.target.value);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  // Close search box when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Memoize navigation links to avoid re-renders
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
    <div
      className={`flex items-center justify-between px-20 xl-max:px-10 sm-max:px-3 py-4 sticky top-0 z-[99999] transition-all duration-300 ${isScrolled ? "bg-[#141414] text-white" : "bg-transparent text-white"}`}
    >
      <div>
        <img
          className="w-32 sm:w-36 md:w-40 lg:w-44 xl:w-48 h-auto"
          src={assets.desktopLogo}
          alt="Logo"
        />

      </div>

      <div className="bg-[#0F0F0F] text-[#BFBFBF] px-10 py-2 xl-max:p-3 xl-max:py-1 rounded-xl border-2 border-[#1F1F1F] flex gap-6 xl-max:gap-4 items-center justify-center lg-max:hidden">
        {navLinks}
      </div>

      {/* Search Box and Icons (Hidden on Small Screens) */}
      <div className="hidden sm:flex items-center gap-4">
        {/* Expanding Search Box */}
        <div className="relative flex items-center" ref={searchRef}>
          <form
            onSubmit={handleSearchSubmit}
            className={`relative flex items-center transition-all duration-300 border-2 border-gray-600 rounded-full overflow-hidden ${isSearchOpen ? "w-64 px-4 py-2" : "w-10 h-10 justify-center"
              }`}
          >
            <FaSearch
              className={`transition-all duration-300 ${isSearchOpen ? "mr-2 text-white" : "text-white cursor-pointer"
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

        {/* Notification Icon */}
        <button className="text-white focus:outline-none">
          <FaBell className="w-6 h-6" />
        </button>
      </div>

      {/* Hamburger Menu for Mobile */}
      <svg
        onClick={openDrawer}
        className="w-10 h-10 sm-max:w-8 sm-max:h-8 lg:hidden cursor-pointer"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect y="5" width="16" height="2" rx="1" fill="white" />
        <rect y="11" width="16" height="2" rx="1" fill="white" />
        <rect x="4" y="17" width="12" height="2" rx="1" fill="white" />
      </svg>

      {/* Mobile Drawer Navigation */}
      <Drawer open={open} onClose={closeDrawer} className="p-4 bg-black">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Menu</h2>
          <IconButton variant="text" color="white" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-8 w-8 text-white"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </IconButton>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-4">{navLinks}</div>

        {/* Search and Notification Icons (Only for Small Screens) */}
        <div className="flex sm:hidden flex-col gap-4 mt-6">
          {/* Search Input */}
          <div className="relative flex items-center border-2 border-gray-600 rounded-full overflow-hidden px-4 py-2">
            <FaSearch className="text-white mr-2" />
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              className="bg-transparent text-white outline-none w-full"
              placeholder="Search Movies"
            />
          </div>

          {/* Notification Icon */}
          <button className="text-white flex items-center gap-2 focus:outline-none">
            <FaBell className="w-6 h-6" />
            <span>Notifications</span>
          </button>
        </div>
      </Drawer>
    </div>
  );
}

export default NavigationBar;
