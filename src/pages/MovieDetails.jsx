import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaPlay, FaVolumeUp, FaPlus, FaThumbsUp, FaStar, FaStarHalfAlt, FaRegStar, FaRegCalendarAlt, } from "react-icons/fa";
import { BsTranslate, BsGrid, } from 'react-icons/bs';
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Dialog } from "@material-tailwind/react";

// ...imports stay the same

function MovieDetails() {
  const { categoryType, id } = useParams();
  console.log("categoryType:", categoryType);
  console.log("id:", id);
  
  const [media, setMedia] = useState({});
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [videoData, setVideoData] = useState("");
  const [open, setOpen] = useState(false);

  const apikey = "7efbe02b35a58e752e4a6262a9fd2adc";
  const handleOpen = () => setOpen(!open);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 8, slidesToSlide: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 6, slidesToSlide: 4 },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: 4 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 2 },
  };

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWZiZTAyYjM1YTU4ZTc1MmU0YTYyNjJhOWZkMmFkYyIsIm5iZiI6MTc0MDc1MTQ5My4zNTgsInN1YiI6IjY3YzFjMjg1OWFkY2QyNTYyNTM1YzIyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OvJ5K7QpCiaubjID0pJj146d-S05U_0E6JD0pxV_D_o",
    },
  };

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

    fetch(`https://api.themoviedb.org/3/${category}/${id}/videos?api_key=${apikey}`)
      .then((res) => res.json())
      .then((data) => setVideoData(data.results[0]?.key || ""))
      .catch(console.error);
  }, [id, categoryType]);

  const director = crew.find((p) => p.job === "Director");
  const musicDirector = crew.find((p) => p.job === "Original Music Composer");

  return (
    <div className="w-full max-w-[1400px] mx-auto text-white px-4 pb-20">
      {/* Background section */}
      <div className="relative mb-20">
        <img
          src={`https://image.tmdb.org/t/p/original/${media.backdrop_path}`}
          alt={media.title || media.name}
          className="w-full h-[600px] object-cover object-top rounded-lg"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg" />

        {/* Content overlay */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center w-full max-w-3xl px-4">
          <h1 className="text-4xl font-bold mb-3">{media.title || media.name}</h1>
          {media.tagline && (
            <p className="text-md text-[#999999] mb-6 hidden md:block">{media.tagline}</p>
          )}
          <div className="mt-4 flex justify-center items-center gap-4">
            <button
              onClick={handleOpen}
              className="bg-[#E50000] hover:bg-red-900 transition px-4 py-3 rounded-lg flex items-center gap-2">
              <FaPlay /> Play Now
            </button>
            <button className="bg-[#0F0F0F] p-3 rounded-lg text-white border border-[#262626]">
              <FaPlus />
            </button>
            <button className="bg-[#0F0F0F] p-3 rounded-lg text-white border border-[#262626]">
              <FaThumbsUp />
            </button>
            <button className="bg-[#0F0F0F] p-3 rounded-lg text-white border border-[#262626]">
              <FaVolumeUp />
            </button>
          </div>
        </div>
      </div>

      {/* YouTube Dialog for Playing Movie */}
      <Dialog size="xl" open={open} handler={handleOpen} className="bg-black">
        {/* <div className="flex justify-center items-center p-4"> */}
        {videoData ? (
          <iframe
            width="100%"
            height="500px"
            src={`https://www.youtube.com/embed/${videoData}?autoplay=1`}
            title="Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          />
        ) : (
          <p className="text-white">No trailer available.</p>
        )}
        {/* </div> */}
      </Dialog>

      {/* Info */}
      <div className="grid md:grid-cols-3 gap-10 mt-10">
        {/* LEFT SECTION */}
        <div className="md:col-span-2 space-y-8">
          {/* Description */}
          <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#262626]">
            <h2 className="text-lg text-[#999999] font-semibold mb-2">Description</h2>
            <p className="text-sm text-white">{media.overview}</p>
          </div>

          {/* Cast */}
          <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#262626]">
            <h2 className="text-lg text-[#999999] font-semibold mb-4">Cast</h2>
            <Carousel responsive={responsive}>
              {cast.slice(0, 10).map((actor) => (
                <div key={actor.id} className="text-center px-2">
                  <img
                    src={actor.profile_path
                      ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                      : "https://via.placeholder.com/150?text=No+Image"}
                    alt={actor.name}
                    className="w-24 h-24 object-fill rounded-lg mx-auto"
                  />
                  <p className="mt-2 text-sm text-gray-300">{actor.name}</p>
                </div>
              ))}
            </Carousel>
          </div>

          {/* Reviews Section */}
          <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#262626]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg text-[#999999] font-semibold">Reviews</h2>
              <button className="px-4 py-2 bg-[#141414] border border-[#262626] text-white rounded-lg hover:bg-black4">
                + Add Your Review
              </button>
            </div>

            {/* Review Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-[#0F0F0F] p-6 rounded-xl border border-[#262626]">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h4 className="font-semibold text-white">Auro Sampad</h4>
                    <p className="text-sm text-[#999999]">From India</p>
                  </div>
                  <span className="flex items-center gap-0.5 bg-[#141414] px-2 py-1 rounded-full border border-[#262626] text-[#E50000] text-sm font-medium">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalfAlt />
                    <span className="text-white text-sm ml-2">4.5</span>
                  </span>
                </div>
                <p className="text-sm text-[#999999]">
                  This movie was recommended to me by a very dear friend who went for the movie by herself. I went to the cinemas to watch but had a houseful board so couldn&apos;t watch it.
                </p>
              </div>

              <div className="bg-[#0F0F0F] p-6 rounded-xl border border-[#262626]">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h4 className="font-semibold text-white">Anwesh Kumar</h4>
                    <p className="text-sm text-[#999999]">From India</p>
                  </div>
                  <span className="flex items-center gap-0.5 bg-[#141414] px-2 py-1 rounded-full border border-[#262626] text-[#E50000] text-sm font-medium">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaRegStar />
                    <span className="text-white text-sm ml-2">4</span>
                  </span>
                </div>
                <p className="text-sm text-[#999999]">
                  A restless king promises his lands to the local tribals in exchange of a stone (Panjurli, a deity of Keradi Village) wherein he finds solace and peace of mind.
                </p>
              </div>
            </div>

            {/* Optional Pagination (fake) */}
            <div className="flex justify-center gap-2 items-center">
              <button className="w-8 h-8 rounded-full bg-[#141414] border border-[#262626] text-white flex items-center justify-center hover:bg-black4">
                <BsArrowLeft />
              </button>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-[#E50000] rounded-full"></span>
                <span className="w-2 h-2 bg-gray-800 rounded-full"></span>
                <span className="w-2 h-2 bg-gray-800 rounded-full"></span>
              </div>
              <button className="w-8 h-8 rounded-full bg-[#141414] border border-[#262626] text-white flex items-center justify-center hover:bg-black4">
                <BsArrowRight />
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT SECTION */}
        <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#262626] space-y-7">
          {/* Released Date */}
          <div>
            <h3 className="text-sm text-[#999999] flex items-center gap-1">
              <FaRegCalendarAlt /> Released Date
            </h3>
            <p className="text-base font-semibold">
              {new Date(media.first_air_date || media.release_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          {/* Available Languages */}
          <div className="">
            <h3 className="text-sm text-[#999999] flex items-center gap-1">
              <BsTranslate /> Available Languages
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {media.spoken_languages?.map((lang, i) => (
                <span key={i} className="px-3 py-1 bg-[#141414] text-sm rounded border border-[#262626]">
                  {lang.english_name}
                </span>
              ))}
            </div>
          </div>

          {/* Ratings */}
          <div className="">
            <h3 className="text-sm text-[#999999] flex items-center gap-1"><FaRegStar />Ratings</h3>
            <div className="flex gap-4 mt-2">
              {/* IMDb Card */}
              <div className="p-2.5 bg-[#141414] text-sm rounded border border-[#262626] flex flex-col items-start">
                <span className="text-white font-medium mb-1">IMDb</span>
                <div className="flex items-center gap-0.5 text-[#E50000]">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfAlt />
                  <span className="text-white text-sm ml-2">4.5</span>
                </div>
              </div>

              {/* Streamvibe Card */}
              <div className="p-2.5 bg-[#141414] text-sm rounded border border-[#262626]  flex flex-col items-start">
                <span className="text-white font-medium mb-1">StreamVibe</span>
                <div className="flex items-center gap-0.5 text-[#E50000]">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaRegStar />
                  <span className="text-white text-sm ml-2">4</span>
                </div>
              </div>

            </div>
          </div>

          {/* Genres */}
          <div className="">
            <h3 className="text-sm text-[#999999] flex items-center gap-1">
              <BsGrid />Genres
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {media.genres?.map((genre) => (
                <span key={genre.id} className="px-3 py-1 bg-[#141414] text-sm rounded border border-[#262626]">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          {/* Director */}
          {director && (
            <div className="">
              <h3 className="text-sm text-[#999999]">Director</h3>
              <div className="flex items-center gap-3 mt-2 p-2.5 bg-[#141414] rounded border border-[#262626]">
                <img
                  src={director.profile_path
                    ? `https://image.tmdb.org/t/p/w300${director.profile_path}`
                    : "https://via.placeholder.com/50?text=No+Image"}
                  className="w-12 h-12 rounded object-fill"
                  alt={director.name}
                />
                <div>
                  <p className="font-semibold">{director.name}</p>
                  {/* <p className="text-sm text-[#999999]">From India</p> */}
                </div>
              </div>
            </div>
          )}

          {/* Music */}
          {musicDirector && (
            <div className="">
              <h3 className="text-sm text-[#999999]">Music</h3>
              <div className="flex items-center gap-3 mt-2 p-2.5 bg-[#141414] rounded border border-[#262626]">
                <img
                  src={musicDirector.profile_path
                    ? `https://image.tmdb.org/t/p/w300${musicDirector.profile_path}`
                    : "https://via.placeholder.com/50?text=No+Image"}
                  className="w-12 h-12 rounded object-fill"
                  alt={musicDirector.name}
                />
                <div>
                  <p className="font-semibold">{musicDirector.name}</p>
                  {/* <p className="text-sm text-[#999999]">From India</p> */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
