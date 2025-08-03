import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaStar, FaStarHalfAlt, FaRegStar, FaRegCalendarAlt, FaClock } from "react-icons/fa";
import { FaPlay, FaPlus, FaThumbsUp, FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from "lucide-react";
import { BsTranslate, BsGrid } from "react-icons/bs";
import { Dialog } from "@material-tailwind/react";
import { AnimatePresence, motion } from "framer-motion";
import { assets } from "../assets/assets";

const TMDB_BEARER = import.meta.env.VITE_TMDB_BEARER;
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Helper to get 5-star icons with full/half/empty based on rating (0-5)
function getStarIcons(rating) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push("full");
    } else if (rating >= i - 0.5) {
      stars.push("half");
    } else {
      stars.push("empty");
    }
  }
  return stars;
}

function formatRelativeDate(dateString) {
  if (!dateString) return 'Unknown';
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now - date;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    // Future date? Show absolute fallback
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  if (diffDays === 0) {
    if (diffHours === 0) {
      if (diffMinutes < 5) {
        return 'recently';
      }
      return `${diffMinutes}m ago`;
    }
    return `${diffHours}h ago`; // hours ago
  }
  if (diffDays === 1) {
    return 'Yesterday';
  }
  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }
  // Fallback to absolute date, formatted "Month day, year"
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function getTrimmedText(text, maxLen = 250) {
  if (!text) return "";
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trim() + "...";
}

function MovieDetails() {
  const { categoryType, id } = useParams();
  const [media, setMedia] = useState({});
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [videoData, setVideoData] = useState("");
  const [open, setOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [seasons, setSeasons] = useState([]);
  const [expandedSeason, setExpandedSeason] = useState(null);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // State to track which reviews are expanded
  const [expandedReviews, setExpandedReviews] = useState({});

  const [tmdbReviews, setTmdbReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  const handleOpen = () => setOpen(!open);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1280 }, items: 8 },
    desktop: { breakpoint: { max: 1280, min: 1024 }, items: 6 },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: 6 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 3 },
  };

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: TMDB_BEARER,
    },
  };
  const carouselRef = useRef();

  useEffect(() => {
    const category = categoryType === "tv" ? "tv" : "movie";

    fetch(`https://api.themoviedb.org/3/${category}/${id}?language=en-US`, options)
      .then((res) => res.json())
      .then((data) => setMedia(data))
      .catch(console.error);

    fetch(`https://api.themoviedb.org/3/${category}/${id}/credits?language=en-US`, options)
      .then((res) => res.json())
      .then((data) => {
        setCast(data.cast || []);
        setCrew(data.crew || []);
      })
      .catch(console.error);

    fetch(`https://api.themoviedb.org/3/${category}/${id}/videos?api_key=${TMDB_API_KEY}`)
      .then((res) => res.json())
      .then((data) => setVideoData(data.results[0]?.key || ""))
      .catch(console.error);

    if (categoryType === "tv") {
      fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, options)
        .then((res) => res.json())
        .then((data) => {
          setSeasons(data.seasons || []);
        })
        .catch(console.error);
    }
  }, [id, categoryType]);

  // Fetch reviews from TMDb API
  useEffect(() => {
    if (!id || !categoryType) return;
    setReviewsLoading(true);
    const category = categoryType === "tv" ? "tv" : "movie";

    fetch(`https://api.themoviedb.org/3/${category}/${id}/reviews?language=en-US`, options)
      .then((res) => res.json())
      .then((data) => {
        setTmdbReviews(data.results || []);
        setReviewsLoading(false);
      })
      .catch(() => {
        setTmdbReviews([]);
        setReviewsLoading(false);
      });
  }, [id, categoryType]);

  const director = crew.find((p) => p.job === "Director");
  const musicDirector = crew.find((p) => p.job === "Original Music Composer");

  const [episodesMap, setEpisodesMap] = useState({});

  const toggleSeason = (seasonNumber) => {
    const isExpanded = expandedSeason === seasonNumber;
    setExpandedSeason(isExpanded ? null : seasonNumber);

    if (!isExpanded && !episodesMap[seasonNumber]) {
      fetch(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?language=en-US`, options)
        .then((res) => res.json())
        .then((data) => {
          setEpisodesMap((prev) => ({ ...prev, [seasonNumber]: data.episodes || [] }));
        })
        .catch(console.error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind 'md' breakpoint
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Transform TMDb reviews to display-friendly format
  const displayedReviews = tmdbReviews.map((r) => ({
    name: r.author,
    location: r.author_details?.username ? `@${r.author_details.username}` : "",
    rating:
      r.author_details?.rating && typeof r.author_details.rating === "number"
        ? r.author_details.rating / 2
        : null, // convert TMDb 0-10 scale to 0-5
    comment: r.content,
    avatar:
      r.author_details?.avatar_path
        ? r.author_details.avatar_path.startsWith("/https")
          ? r.author_details.avatar_path.slice(1)
          : `https://image.tmdb.org/t/p/w185${r.author_details.avatar_path}`
        : null,
    created: r.created_at,
  }));

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -200 : 200,
      opacity: 0,
    }),
  };

  const [direction, setDirection] = useState(1);

  // Toggle read more/less for review text at given index
  const handleToggleReview = (index) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const calculateAverageRating = () => {
    if (tmdbReviews.length === 0) return 0;
    const ratings = tmdbReviews
      .map(r => r.author_details?.rating)
      .filter(r => typeof r === "number");
    if (ratings.length === 0) return 0;
    const avg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
    return avg / 2;  // Convert 10 scale to 5 scale
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto text-white px-4 pb-20">
      {/* Hero Section */}
      <div className="relative mb-10">
        <img
          src={`https://image.tmdb.org/t/p/original/${media.backdrop_path}`}
          alt={media.title || media.name}
          className="w-full h-[600px] object-cover object-top rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent rounded-lg" />
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center w-full max-w-3xl px-4">
          <h1 className="text-4xl font-bold mb-3">{media.title || media.name}</h1>
          {media.tagline && (
            <p className="text-base xl-max:text-sm md-max:text-xs text-[#999999] mb-6">{media.tagline}</p>
          )}
          <div className="mt-4 flex justify-center items-center gap-4">
            <button
              onClick={handleOpen}
              className="bg-[#E50000] hover:bg-red-900 px-4 py-3 rounded-lg flex items-center gap-2 text-white text-base xl-max:text-sm md-max:text-sm"
            >
              <FaPlay /> Play Now
            </button>
            <button
              onClick={() => setIsAdded(!isAdded)}
              className={`bg-[#0F0F0F] p-3 rounded-lg border border-[#262626] ${isAdded ? "text-[#E50000]" : "text-white"
                }`}
            >
              <FaPlus />
            </button>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`bg-[#0F0F0F] p-3 rounded-lg border border-[#262626] ${isLiked ? "text-[#E50000]" : "text-white"
                }`}
            >
              <FaThumbsUp />
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`bg-[#0F0F0F] p-3 rounded-lg border border-[#262626] ${isMuted ? "text-[#E50000]" : "text-white"
                }`}
            >
              {isMuted ? <FaVolumeXmark /> : <FaVolumeHigh />}
            </button>
          </div>
        </div>
      </div>

      {/* Trailer Dialog */}
      <Dialog size="xl" open={open} handler={handleOpen} className="bg-black">
        {videoData ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoData}?autoplay=1`}
            title="Trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-lg"
          />
        ) : (
          <p className="text-white">No trailer available.</p>
        )}
      </Dialog>

      {/* Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mt-10">

        {/* Left Section */}
        <div className="space-y-8 order-2 lg:order-1 lg:col-span-2">
          {/* Seasons and Episodes */}
          {categoryType === "tv" && (
            <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#262626]">
              <h2 className="text-lg text-[#999999] font-semibold mb-4">Seasons and Episodes</h2>
              {seasons.map((season) => (
                <div
                  key={season.id}
                  className="mb-4 border border-[#262626] rounded-lg bg-[#0F0F0F] overflow-hidden"
                >
                  <button
                    onClick={() => toggleSeason(season.season_number)}
                    className="w-full flex justify-between items-center px-4 py-3"
                  >
                    <span className="font-semibold text-white text-left">
                      {season.name}
                      {season.episode_count && (
                        <span className="ml-2 text-sm text-[#999999] font-normal">
                          {" "}
                          • {season.episode_count} Episodes
                        </span>
                      )}
                    </span>
                    <span className="w-9 h-9 flex items-center justify-center rounded-full bg-[#141414] border border-[#262626] hover:bg-[#1F1F1F] transition">
                      {expandedSeason === season.season_number ? (
                        <ArrowUp size={18} className="text-[#999999]" />
                      ) : (
                        <ArrowDown size={18} className="text-[#999999]" />
                      )}
                    </span>
                  </button>

                  {expandedSeason === season.season_number && episodesMap[season.season_number] && (
                    <>
                      {/* For small screen */}
                      <div className="sm:hidden space-y-4 p-4">
                        {episodesMap[season.season_number].map((episode, i) => (
                          <div key={episode.id} className="bg-[#141414] p-4 rounded-lg space-y-4">
                            <div className="flex items-center gap-4">
                              <div className="relative">
                                <img
                                  src={
                                    episode.still_path
                                      ? `https://image.tmdb.org/t/p/w300${episode.still_path}`
                                      : assets.defaultImage
                                  }
                                  alt={episode.name}
                                  loading="lazy"
                                  className="w-[180px] h-[105px] rounded-lg object-cover border border-[#262626]"
                                />
                                <button
                                  onClick={handleOpen}
                                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-[#0F0F0F] bg-opacity-70 rounded-full border-2 border-white"
                                >
                                  <FaPlay className="text-white text-sm opacity-90" />
                                </button>
                              </div>

                              <div className="text-[#999999] font-bold text-xl pr-1 min-w-[30px] text-right">
                                {String(i + 1).padStart(2, "0")}
                              </div>
                            </div>

                            <span className="flex items-center gap-1 text-xs text-[#999999] bg-[#141414] border border-[#262626] rounded-md px-2 py-1 w-max">
                              <FaClock />
                              {episode.runtime || "??"} min
                            </span>

                            <h4 className="text-white font-medium text-base leading-snug">{episode.name}</h4>
                          </div>
                        ))}
                      </div>

                      {/* For large screen */}
                      <div className="hidden sm:block">
                        {episodesMap[season.season_number].map((episode, i) => (
                          <React.Fragment key={episode.id}>
                            <div className="flex gap-4 p-4 items-center">
                              <div className="text-[#999999] font-bold text-lg min-w-[32px] flex justify-center items-center">
                                {String(i + 1).padStart(2, "0")}
                              </div>

                              <div className="relative">
                                <img
                                  src={
                                    episode.still_path
                                      ? `https://image.tmdb.org/t/p/w300${episode.still_path}`
                                      : assets.defaultImage
                                  }
                                  alt={episode.name}
                                  loading="lazy"
                                  className="w-[120px] h-[70px] rounded-lg object-cover border border-[#262626]"
                                />
                                <button
                                  onClick={handleOpen}
                                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-[#0F0F0F] bg-opacity-70 rounded-full border-2 border-white"
                                >
                                  <FaPlay className="text-white text-sm opacity-90" />
                                </button>
                              </div>

                              <div className="flex flex-1 flex-col gap-1">
                                <div className="flex justify-between items-start">
                                  <h4 className="text-white font-medium text-base">{episode.name}</h4>
                                  <span className="flex items-center gap-1 text-sm text-[#999999] bg-[#141414] border border-[#262626] rounded-md px-2 py-1 whitespace-nowrap ml-2">
                                    <FaClock />
                                    {episode.runtime || "??"} min
                                  </span>
                                </div>
                                <p className="text-sm text-[#999999]">{episode.overview}</p>
                              </div>
                            </div>

                            {i !== episodesMap[season.season_number].length - 1 && (
                              <hr className="border-[#262626] mx-4" />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#262626]">
            <h2 className="text-lg text-[#999999] font-semibold mb-2">Description</h2>
            <p className="text-sm md-max:text-xs text-white">{media.overview}</p>
          </div>

          {/* Cast */}
          <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#262626]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg text-[#999999] font-semibold">Cast</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => carouselRef.current?.previous()}
                  className="w-9 h-9 flex items-center justify-center text-[#999999] rounded-full bg-[#141414] border border-[#262626] hover:bg-[#1F1F1F] transition"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  onClick={() => carouselRef.current?.next()}
                  className="w-9 h-9 flex items-center justify-center text-[#999999] rounded-full bg-[#141414] border border-[#262626] hover:bg-[#1F1F1F] transition"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            <Carousel
              ref={carouselRef}
              responsive={responsive}
              arrows={false}
              itemClass="!m-0 !p-[2px]"
              containerClass="pb-2"
            >
              {cast.slice(0, 10).map((actor) => (
                <div key={actor.id} className="text-center">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                        : assets.defaultImage
                    }
                    alt={actor.name}
                    className="w-[84px] h-[84px] sm:w-[90px] sm:h-[90px] object-cover rounded-lg"
                  />
                  <p className="mt-2 text-xs sm:text-sm text-white truncate w-[90px]">{actor.name}</p>
                </div>
              ))}
            </Carousel>
          </div>

          {/* Reviews */}
          <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#262626] min-h-[300px] md:min-h-[340px] flex flex-col justify-between">
            {/* Header */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg text-[#999999] font-semibold">Reviews</h2>
                <button className="px-4 py-2 bg-[#141414] border border-[#262626] text-xs sm:text-sm text-white rounded-lg hover:bg-black4">
                  + Add Your Review
                </button>
              </div>

              {/* Loading indicator */}
              {reviewsLoading && (
                <p className="text-center text-[#999999] my-8">Loading reviews...</p>
              )}
              {!reviewsLoading && displayedReviews.length === 0 && (
                <p className="text-center text-[#999999] my-8">No reviews yet.</p>
              )}

              {/* Review Cards (Sliding as a group) */}
              {!reviewsLoading && displayedReviews.length > 0 && (
                <div className="relative min-h-[180px] overflow-hidden">
                  <AnimatePresence custom={direction} mode="wait">
                    <motion.div
                      key={activeReviewIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
                    >
                      {Array.from({ length: isMobile ? 1 : 2 }).map((_, offset) => {
                        const index = (activeReviewIndex + offset) % displayedReviews.length;
                        const review = displayedReviews[index];

                        return (
                          <div
                            key={index}
                            className="bg-[#0F0F0F] p-6 rounded-xl border border-[#262626] overflow-hidden flex flex-col"
                          >
                            {/* Header: avatar, name, stars */}
                            <div className="flex justify-between items-center mb-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={review.avatar || assets.defaultImage}
                                  alt={review.name}
                                  className="w-8 h-8 rounded-full object-cover hidden sm:block"
                                />
                                <div>
                                  <h4 className="text-sm sm:text-base font-medium text-white">{review.name}</h4>
                                  <p className="text-xs sm:text-sm text-[#999999]">{review.location}</p>
                                </div>
                              </div>

                              <span className="flex items-center gap-0.5 bg-[#141414] px-2 py-1 rounded-full border border-[#262626] text-[#E50000] text-xs sm:text-sm">
                                {review.rating !== null && review.rating !== undefined ? (
                                  <>
                                    {getStarIcons(review.rating).map((type, i) =>
                                      type === "full" ? (
                                        <FaStar key={i} />
                                      ) : type === "half" ? (
                                        <FaStarHalfAlt key={i} />
                                      ) : (
                                        <FaRegStar key={i} />
                                      )
                                    )}
                                    <span className="text-white text-xs sm:text-sm ml-1">
                                      {review.rating.toFixed(1)}
                                    </span>
                                  </>
                                ) : (
                                  <span className="text-gray-500">No Rating</span>
                                )}
                              </span>
                            </div>

                            {/* Review: comment and read more toggle */}
                            <div className="text-xs sm:text-sm text-[#999999] relative">
                              {!expandedReviews[index] && review.comment && review.comment.length > 250 ? (
                                <span>
                                  {getTrimmedText(review.comment, 250)}
                                  <button
                                    className="text-[#E50000] text-xs hover:underline inline ml-1"
                                    onClick={() => handleToggleReview(index)}
                                    type="button"
                                    style={{ display: "inline" }}
                                  >
                                    Read more
                                  </button>
                                </span>
                              ) : (
                                <span>
                                  {review.comment}
                                  {review.comment && review.comment.length > 250 && (
                                    <button
                                      className="text-[#E50000] text-xs hover:underline mt-2 ml-1"
                                      onClick={() => handleToggleReview(index)}
                                      type="button"
                                      style={{ display: "inline" }}
                                    >
                                      Read less
                                    </button>
                                  )}
                                </span>
                              )}
                            </div>

                            {/* Date: always shows */}
                            <div className="mt-4">
                              {review.created ? (
                                <p className="text-[10px] text-[#888]">{formatRelativeDate(review.created)}</p>
                              ) : (
                                <p className="text-[10px] text-[#888] opacity-50">Unknown</p>
                              )}
                            </div>
                          </div>

                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Navigation (Fixed at bottom of the box) */}
            {!reviewsLoading && displayedReviews.length > 0 && (
              <div className="flex justify-center items-center gap-2.5 mt-0">
                <button
                  onClick={() => {
                    setDirection(-1);
                    setActiveReviewIndex((prev) =>
                      prev === 0 ? displayedReviews.length - 1 : prev - 1
                    );
                  }}
                  className="w-9 h-9 flex items-center justify-center text-[#999999] rounded-full bg-[#141414] border border-[#262626] hover:bg-[#1F1F1F] transition"
                >
                  <ArrowLeft size={18} />
                </button>

                <div className="flex gap-1.5">
                  {displayedReviews.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-[2.5px] rounded-full transition-all duration-300 ${idx === activeReviewIndex ? "bg-[#E50000] w-5" : "bg-[#333333] w-3"
                        }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => {
                    setDirection(1);
                    setActiveReviewIndex((prev) => (prev + 1) % displayedReviews.length);
                  }}
                  className="w-9 h-9 flex items-center justify-center text-[#999999] rounded-full bg-[#141414] border border-[#262626] hover:bg-[#1F1F1F] transition"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#262626] space-y-7 order-1 lg:order-2 lg:col-span-1 self-start">
          {/* Release Date */}
          <div>
            <h3 className="text-sm text-[#999999] flex items-center gap-1">
              <FaRegCalendarAlt /> Released Date
            </h3>
            <p className="text-base font-semibold">
              {new Date(media.first_air_date || media.release_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-sm text-[#999999] flex items-center gap-1">
              <BsTranslate /> Available Languages
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {media.spoken_languages?.map((lang, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-[#141414] text-sm rounded border border-[#262626]"
                >
                  {lang.english_name}
                </span>
              ))}
            </div>
          </div>

          {/* Ratings */}
          <div>
            <h3 className="text-sm text-[#999999] flex items-center gap-1">
              <FaRegStar /> Ratings
            </h3>
            <div className="flex gap-4 mt-2">
              {/* IMDb Rating */}
              <div className="p-2.5 bg-[#141414] text-sm rounded border border-[#262626]">
                <span className="text-white font-medium">IMDb</span>
                <div className="flex items-center gap-0.5 text-[#E50000]">
                  {getStarIcons((media.vote_average ?? 0) / 2).map((type, idx) => {
                    if (type === "full") return <FaStar key={idx} />;
                    if (type === "half") return <FaStarHalfAlt key={idx} />;
                    return <FaRegStar key={idx} />;
                  })}
                  <span className="text-white ml-2">{((media.vote_average ?? 0) / 2).toFixed(1)}</span>
                </div>
              </div>

              {/* StreamVibe Rating */}
              <div className="p-2.5 bg-[#141414] text-sm rounded border border-[#262626]">
                <span className="text-white font-medium">StreamVibe</span>
                <div className="flex items-center gap-0.5 text-[#E50000]">
                  {getStarIcons(calculateAverageRating()).map((type, idx) => {
                    if (type === "full") return <FaStar key={idx} />;
                    if (type === "half") return <FaStarHalfAlt key={idx} />;
                    return <FaRegStar key={idx} />;
                  })}
                  <span className="text-white ml-2">{calculateAverageRating().toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Genres */}
          <div>
            <h3 className="text-sm text-[#999999] flex items-center gap-1">
              <BsGrid /> Genres
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {media.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-[#141414] text-sm rounded border border-[#262626]"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          {/* Director */}
          {director && (
            <div>
              <h3 className="text-sm text-[#999999]">Director</h3>
              <div className="flex items-center gap-3 mt-2 p-2.5 bg-[#141414] rounded border border-[#262626]">
                <img
                  src={
                    director.profile_path
                      ? `https://image.tmdb.org/t/p/w300${director.profile_path}`
                      : assets.defaultImage
                  }
                  className="w-12 h-12 rounded object-cover"
                  alt={director.name}
                />
                <p className="font-semibold">{director.name}</p>
              </div>
            </div>
          )}

          {/* Music */}
          {musicDirector && (
            <div>
              <h3 className="text-sm text-[#999999]">Music</h3>
              <div className="flex items-center gap-3 mt-2 p-2.5 bg-[#141414] rounded border border-[#262626]">
                <img
                  src={
                    musicDirector.profile_path
                      ? `https://image.tmdb.org/t/p/w300${musicDirector.profile_path}`
                      : assets.defaultImage
                  }
                  className="w-12 h-12 rounded object-cover"
                  alt={musicDirector.name}
                />
                <p className="font-semibold">{musicDirector.name}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
