import { useState, useEffect, useMemo, useRef } from "react";
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

// Debounce hook for input
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

// Utility to format notification timestamp
function formatNotificationTimestamp(timestamp) {
  const now = new Date();
  const notifDate = new Date(timestamp);
  const diffMs = now - notifDate;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  // Past/future guard
  if (diffDay < 0 || diffSec < 0) {
    // Future date: show full timestamp
    return notifDate.toLocaleDateString("en-GB") + " " +
      notifDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  }

  // Over 7 days: show DD/MM/YYYY HH:MM AM/PM
  if (diffDay > 7) {
    return (
      notifDate.toLocaleDateString("en-GB") +
      " " +
      notifDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
    );
  }

  // Date label
  let dateStr;
  if (diffDay === 0) dateStr = "Today";
  else if (diffDay === 1) dateStr = "Yesterday";
  else dateStr = `${diffDay}d ago`;

  // Time label (up to 1 day, then hours)
  let timeStr;
  if (diffSec < 60) timeStr = `${diffSec}s ago`;
  else if (diffMin < 60) timeStr = `${diffMin}min ago`;
  else timeStr = `${diffHour}h ago`;

  return `${dateStr} ${timeStr}`;
}

function NavigationBar() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggesting, setIsSuggesting] = useState(false);
  //const suggestionRef = useRef(null);
  const searchTriggerRef = useRef(null);
  const searchBoxRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef(null);

  // Debounced value for efficient query
  const debouncedSearch = useDebounce(search, 350);

  // Fetch search suggestions from TMDb
  useEffect(() => {
    if (!debouncedSearch.trim() || !isSearchOpen) {
      setSuggestions([]);
      setIsSuggesting(false);
      return;
    }
    setIsSuggesting(true);
    const controller = new AbortController();

    async function fetchSuggestions() {
      try {
        const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY; // <-- INSERT YOUR TMDb API KEY
        const res = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
            debouncedSearch
          )}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        const filtered =
          data && data.results
            ? data.results.filter(
              (item) =>
                (item.media_type === "movie" || item.media_type === "tv") &&
                (item.poster_path || item.backdrop_path)
            )
            : [];
        setSuggestions(filtered);
      } catch {
        setSuggestions([]);
      }
      setIsSuggesting(false);
    }

    fetchSuggestions();
    return () => controller.abort();
  }, [debouncedSearch, isSearchOpen]);

  const handleSuggestionClick = (item) => {
    console.log("Suggestion clicked:", item.media_type, item.id);
    setIsSearchOpen(false);
    setSearch("");
    setSuggestions([]);
    if (item.media_type === "movie") {
      navigate(`/movie/${item.id}`);
    } else if (item.media_type === "tv") {
      navigate(`/tv/${item.id}`);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate("/searchlist", { state: { search } });
      setSearch("");
      setIsSearchOpen(false);
      setSuggestions([]);
    }
  };

  // Close search if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setTimeout(() => {
          setIsSearchOpen(false);
          setSuggestions([]);
        }, 100); // small delay
      }
    }
    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  // Close notification if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    }
    if (isNotifOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotifOpen]);

  // Notification fetching logic
  useEffect(() => {
    const followedTVs = [1399, 93405]; // Sample TV show IDs

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_TMDB_BEARER
      },
    };

    const loadNotifications = async () => {
      const newNotifs = [];
      const today = new Date();

      // Trending
      const trendingRes = await fetch(
        "https://api.themoviedb.org/3/trending/movie/day",
        options
      );
      const trending = await trendingRes.json();
      if (trending.results?.length) {
        const top = trending.results[0];
        newNotifs.push({
          id: `trending_${top.id}`,
          title: "Trending Now!",
          message: `'${top.title}' is trending today.`,
          image: `https://image.tmdb.org/t/p/w500${top.poster_path}`,
          link: `/movie/${top.id}`,
          timestamp: new Date().toISOString(),
          read: false,
        });
      }

      // Upcoming movies (releasing in next 3 days)
      const upcomingRes = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming",
        options
      );
      const upcoming = await upcomingRes.json();
      upcoming.results?.forEach((movie) => {
        const date = new Date(movie.release_date);
        const diff = (date - today) / (1000 * 60 * 60 * 24);
        if (diff >= 0 && diff <= 3) {
          newNotifs.push({
            id: `upcoming_${movie.id}`,
            title: "Releasing Soon!",
            message: `'${movie.title}' releases on ${new Date(movie.release_date).toLocaleDateString("en-GB", {
              day: "numeric", month: "long", year: "numeric"
            })}`,
            image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            link: `/movie/${movie.id}`,
            timestamp: new Date().toISOString(), // Or: Date.now(), or any current time value
            read: false,
          });
        }
      });

      // Followed shows
      for (const tvId of followedTVs) {
        const tvRes = await fetch(
          `https://api.themoviedb.org/3/tv/${tvId}`,
          options
        );
        const tv = await tvRes.json();

        const lastEp = tv.last_episode_to_air;
        const airDate = new Date(lastEp?.air_date);
        if (
          airDate.toISOString().slice(0, 10) ===
          today.toISOString().slice(0, 10)
        ) {
          newNotifs.push({
            id: `ep_${tvId}_${lastEp.episode_number}`,
            title: "New Episode Released!",
            message: `'${tv.name}' S${lastEp.season_number}E${lastEp.episode_number} is now available.`,
            image: `https://image.tmdb.org/t/p/w500${tv.poster_path}`,
            link: `/tv/${tvId}`,
            timestamp: airDate.toISOString(),
            read: false,
          });
        }

        // New season check
        const storedSeasons = parseInt(
          localStorage.getItem(`season_${tvId}`) || 0
        );
        if (tv.number_of_seasons > storedSeasons) {
          newNotifs.push({
            id: `season_${tvId}_${tv.number_of_seasons}`,
            title: "New Season Announced!",
            message: `'${tv.name}' Season ${tv.number_of_seasons} has been announced.`,
            image: `https://image.tmdb.org/t/p/w500${tv.poster_path}`,
            link: `/tv/${tvId}`,
            timestamp: today.toISOString(),
            read: false,
          });
          localStorage.setItem(`season_${tvId}`, tv.number_of_seasons);
        }
      }
      setNotifications(newNotifs);
    };

    loadNotifications();
  }, []);

  // Scroll state effect
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
            `py-2 px-3 rounded-lg text-center hover:scale-110 transition-transform duration-300 ease-in-out ${isActive
              ? "font-semibold bg-[#1A1A1A] text-white"
              : "text-[#BFBFBF]"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            `py-2 px-3 rounded-lg text-center hover:scale-110 transition-transform duration-300 ease-in-out ${isActive
              ? "font-semibold bg-[#1A1A1A] text-white"
              : "text-[#BFBFBF]"
            }`
          }
        >
          Movies & Shows
        </NavLink>
        <NavLink
          to="/support"
          className={({ isActive }) =>
            `py-2 px-3 rounded-lg text-center hover:scale-110 transition-transform duration-300 ease-in-out ${isActive
              ? "font-semibold bg-[#1A1A1A] text-white"
              : "text-[#BFBFBF]"
            }`
          }
        >
          Support
        </NavLink>
        <NavLink
          to="/subscriptions"
          className={({ isActive }) =>
            `py-2 px-3 rounded-lg text-center hover:scale-110 transition-transform duration-300 ease-in-out ${isActive
              ? "font-semibold bg-[#1A1A1A] text-white"
              : "text-[#BFBFBF]"
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
          className={`flex items-center justify-between px-20 xl-max:px-10 sm-max:px-3 py-4 transition-all duration-300 ${isScrolled
            ? "bg-[#141414] text-white"
            : "bg-transparent text-white"
            }`}
        >
          {/* Logo */}
          <div
            className="flex flex-row items-center cursor-pointer"
            onClick={() => navigate("/")}
            title="Go to Home"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                navigate("/");
              }
            }}
            role="button"
          >
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

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative" ref={searchTriggerRef}>
              <div className="hidden w-10 h-10 sm:flex items-center justify-center ">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="text-white focus:outline-none"
                >
                  <FaMagnifyingGlass className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
              {/* Unified Search Box */}
              {isSearchOpen && (
                <div className="fixed inset-0 z-[9999] bg-transparent flex flex-col items-center pt-4">
                  {/* backdrop-blur-md bg-[#1A1A1A]/70 text-white border border-white/10 */}
                  <div className="w-full max-w-2xl relative">
                    <form
                      onSubmit={handleSearchSubmit}
                      ref={searchBoxRef}
                      className="w-full flex items-center gap-3 backdrop-blur-md bg-[#1A1A1A]/70 text-white border border-white/10 rounded-xl px-4 py-3 sm:rounded-full sm:px-6 sm:py-4"
                    >
                      <FaMagnifyingGlass className="text-white w-5 h-5" />
                      <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search Movies & TV Shows"
                        className="flex-grow bg-transparent text-white placeholder-gray-300 outline-none text-sm"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSuggestions([]);
                        }}
                        className="text-white text-sm"
                      >
                        Cancel
                      </button>
                    </form>
                    {/* Suggestions Dropdown */}
                    {(isSuggesting || suggestions.length > 0) && (
                      <div className="absolute left-0 top-full w-full backdrop-blur-md bg-[#1A1A1A]/70 text-[#999999] border border-white/10 rounded-xl mt-2 z-50 overflow-y-auto max-h-96 ring-1 ring-white/15">
                        {isSuggesting ? (
                          <div className="text-center text-gray-400 py-4 text-xs sm:text-sm">Loading...</div>
                        ) : suggestions.length === 0 ? (
                          <div className="text-center text-gray-400 py-4 text-xs sm:text-sm">No Results</div>
                        ) : (
                          suggestions.map((item) => (
                            <div
                              key={item.id + item.media_type}
                              onMouseDown={() => handleSuggestionClick(item)}
                              onClick={() => handleSuggestionClick(item)}
                              className="flex items-center px-4 py-3 gap-3 cursor-pointer hover:bg-[#1A1A1A]/80 transition duration-150"
                            >
                              <img
                                src={
                                  item.poster_path
                                    ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
                                    : item.backdrop_path
                                      ? `https://image.tmdb.org/t/p/w92${item.backdrop_path}`
                                      : ""
                                }
                                alt={item.title || item.name}
                                className="w-10 h-14 rounded object-cover flex-shrink-0"
                              />
                              <div className="flex flex-col overflow-hidden">
                                <span className="font-normal truncate text-[#FFFFFF] text-sm sm:text-base">
                                  {item.title || item.name}
                                </span>
                                <span className="text-xs sm:text-sm text-[#999999] truncate">
                                  {item.media_type === "movie" ? "Movie" : "TV Show"}
                                  {(item.release_date || item.first_air_date) &&
                                    ` (${(item.release_date || item.first_air_date).slice(0, 4)})`}
                                </span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            {/* Notification */}
            <div className="relative" ref={notifRef}>
              <div className="relative w-10 h-10 flex items-center justify-center">
                <button
                  className="text-white focus:outline-none"
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                >
                  <FaBell className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                {notifications.length > 0 && (
                  <span className="absolute top-[9px] right-[9px] sm:top-[8px] sm:right-[8px] h-2 w-2  bg-[#E50000] rounded-full border border-[#141414]" />
                )}
              </div>
              {isNotifOpen && (
                <div
                  className="absolute right-0 mt-2 w-80 max-w-[90vw] sm:w-80 backdrop-blur-md bg-[#1A1A1A]/70 text-white border border-white/10 rounded-lg ring-1 ring-white/5 z-50 overflow-hidden"
                >
                  {notifications.length === 0 ? (
                    <div className="p-4 text-xs sm:text-sm text-[#BFBFBF]">
                      No new notifications.
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="flex items-start gap-3 px-4 py-3 border-b border-white/10 hover:bg-white/5 hover:backdrop-blur-sm cursor-pointer"
                        onClick={() => {
                          navigate(notif.link);
                          setIsNotifOpen(false);
                        }}
                      >
                        <img
                          src={notif.image}
                          alt=""
                          className="w-10 h-14 rounded object-cover flex-shrink-0"
                        />
                        <div className="overflow-hidden">
                          <p className="font-normal text-sm sm:text-base truncate">
                            {notif.title}
                          </p>
                          <p className="text-[#BFBFBF] text-xs sm:text-sm line-clamp-2">
                            {notif.message}
                          </p>
                          <p className="text-[#999999] text-[10px] sm:text-xs mt-1">
                            {formatNotificationTimestamp(notif.timestamp)}
                          </p>

                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for Fixed Navbar */}
      <div className="h-[72px] sm:h-[88px]" />

      {/* Bottom Mobile Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0F0F0F] border-t border-[#1F1F1F] flex justify-around items-center py-2 sm:hidden z-[99999] text-xs">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center text-center w-[20%] ${isActive ? "text-[#E50000]" : "text-[#BFBFBF]"
            }`
          }
          title="Home"
        >
          <FaHouse className="w-6 h-6 mb-0.5" />
          <span className="text-[10px] leading-none">Home</span>
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            `flex flex-col items-center text-center truncate w-[20%] ${isActive ? "text-[#E50000]" : "text-[#BFBFBF]"
            }`
          }
          title="Movies & Shows"
        >
          <FaClapperboard className="w-6 h-6 mb-0.5" />
          <span className="text-[10px] leading-none">Movies & Shows</span>
        </NavLink>
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center text-center w-[20%] text-[#BFBFBF] hover:text-white"
          ref={searchTriggerRef}
          title="Search"
        >
          <FaMagnifyingGlass className="w-6 h-6 mb-0.5" />
          <span className="text-[10px] leading-none">Search</span>
        </button>
        <NavLink
          to="/support"
          className={({ isActive }) =>
            `flex flex-col items-center text-center w-[20%] ${isActive ? "text-[#E50000]" : "text-[#BFBFBF]"
            }`
          }
          title="Support"
        >
          <FaCommentDots className="w-6 h-6 mb-0.5" />
          <span className="text-[10px] leading-none">Support</span>
        </NavLink>
        <NavLink
          to="/subscriptions"
          className={({ isActive }) =>
            `flex flex-col items-center text-center w-[20%] ${isActive ? "text-[#E50000]" : "text-[#BFBFBF]"
            }`
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
