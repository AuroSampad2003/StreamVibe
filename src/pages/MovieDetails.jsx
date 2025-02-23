import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Rating } from "@material-tailwind/react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [videoData, setVideoData] = useState([]);
  // const [rated, setRated] = useState(1);
  const [open, setOpen] = React.useState(false);

  const apikey = "0c1cc5e1cde833df76308eb09b05232c";

  const handleOpen = () => setOpen(!open);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
      slidesToSlide: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
      slidesToSlide: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzFjYzVlMWNkZTgzM2RmNzYzMDhlYjA5YjA1MjMyYyIsIm5iZiI6MTcyOTcwNzEwOS4xNDUsInN1YiI6IjY3MTkzYzY1NWQwZGU4OTA0MmQ4Y2NjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S3iT07Rh4-YwsGl_gim7COtEGHfG2NAK8srhHhzTJDg",
    },
  };

  // Fetch video credits

  useEffect(() => {
    // Fetch movie details
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then((res) => res.json())
      .then((response) => {
        setMovie(response);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch movie credits
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((response) => {
        setCast(response.cast);
        setCrew(response.crew);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch Video keys
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apikey}`)
      .then((res) => res.json())
      .then((response) => {
        setVideoData(response.results[0].key);
        console.log(response.results[0].key);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  //  Director nd Music Director from Crew
  const director = crew.find((person) => person.job === "Director");
  const musicDirector = crew.find(
    (person) => person.job === "Original Music Composer"
  );

  return (
    <div className=" text-white min-h-screen p-4">
      {/* Top Section */}
      <div className="relative mb-10 md-max:h-[500px] md:h-[700px]">
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt={movie.title}
          className="w-3/4 h-[700px] mx-auto rounded-xl md-max:absolute md-max:inset-0 md-max:w-full md-max:h-full md-max:object-cover md-max:object-center"
        />
        <div className="w-3/4 mx-auto md-max:w-full absolute inset-0 rounded-lg"></div>
        <div className="absolute bottom-3 md-max:bottom-0 left-1/2 transform -translate-x-1/2 p-4 text-center ">
          <h1 className="text-3xl font-bold mb-3 md-max:text-xl">
            {movie.title}
          </h1>
          <p className=" text-gray1 max-w-2xl mb-6 md-max:text-sm md-max:hidden">
            {movie.tagline}
          </p>

          <div className="flex md-max:flex-col justify-center gap-4">
            {/* play button */}
            <button
              onClick={handleOpen}
              className="bg-red2 text-white px-4 py-2 rounded-lg text-base flex items-center  justify-center gap-2 hover:bg-red-700 transition"
            >
              <span className="material-icons">play_arrow</span>
              Play Trailer
            </button>

            {/* video Dialog */}
            <Dialog open={open} handler={handleOpen} className="bg-black">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <iframe
                  className="w-[700px] h-[600px] md-max:h-[400px]"
                  src={`https://www.youtube.com/embed/${videoData}`}
                  allowfullscreen
                ></iframe>
              </div>
            </Dialog>

            {/* group of button */}
            <div className="flex justify-center gap-2">
              <button className="bg-black3 text-white text-base flex items-center gap-2 p-3 rounded-2xl hover:text-yellow-600 transition">
                <span className="material-icons">add</span>
              </button>

              <button className="bg-black3 text-white text-base flex items-center gap-2 p-3 rounded-2xl hover:text-red-600 transition">
                <span className="material-icons">thumb_up</span>
              </button>

              <button className="bg-black3 text-white text-base flex items-center gap-2 p-3 rounded-2xl hover:text-blue-600 transition">
                <span className="material-icons">volume_up</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-black3 border border-black5 p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl md-max:text-xl font-semibold mb-4 text-gray1">
          Description
        </h2>
        <p className="text-sm">{movie.overview}</p>
      </div>

      {/* Cast Section */}

      <div className="bg-black3 border border-black5 p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl md-max:text-xl font-semibold mb-4 text-gray1">
          Cast
        </h2>
        <Carousel responsive={responsive}>
          {cast.slice(0, 10).map((actor) => (
            <div key={actor.id} className="flex-shrink-0 text-center w-24">
              <img
                src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                alt={actor.name}
                className="w-full h-32 rounded-lg"
              />
              <p className="mt-2 text-base md-max:text-sm text-gray-300">
                {actor.name}
              </p>
            </div>
          ))}
        </Carousel>
      </div>

      <div className="bg-black3 border border-black5 text-white p-6 rounded-lg shadow-md space-y-6">
        {/*Year */}
        <div>
          <div className="flex items-center gap-1">
            <img src={assets.realeased} alt="" />
            <h3 className="text-lg font-medium text-gray1">Released Year</h3>
          </div>
          <p className="text-gray-300 mt-1">
            {new Date(movie.release_date).getFullYear()}
          </p>
        </div>

        {/*Languages*/}
        <div>
          <div className="flex items-center gap-1">
            <img src={assets.available} alt="" />
            <h3 className="text-lg font-medium text-gray1">
              Available Languages
            </h3>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {movie.spoken_languages?.map((lang, index) => (
              <span
                key={index}
                className="bg-black2 px-3 py-1 text-sm rounded-full border border-black5"
              >
                {lang.english_name}
              </span>
            ))}
          </div>
        </div>

        {/*Ratings*/}
        <div>
          <div className="flex items-center gap-1">
            <img src={assets.realeased} alt="" />
            <h3 className="text-lg font-medium text-gray1">Ratings</h3>
          </div>
          <div className="mt-2 flex md-max:flex-col gap-4">
            <div className="mt-2 flex items-center">
              <div className="bg-black1 px-1 py-2 rounded-lg text-center shadow">
                <p className="font-semibold text-gray1">IMDb</p>
                <p>{parseInt(movie.vote_average)}</p>
                {/* <Rating value={rated} onChange={() =>  setRated(parseInt(movie.vote_average/2))} /> */}
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <div className="bg-black1 px-1 py-2 rounded-lg text-center shadow">
                <p className="font-semibold text-gray1">Streamvibe</p>
                <p>{parseInt(movie.vote_average)}</p>
                {/* <Rating value={rated} onChange={() =>  setRated(parseInt(movie.vote_average/2))} /> */}
              </div>
            </div>
          </div>
        </div>

        {/*Genres*/}
        <div>
          <div className="flex items-center gap-1">
            <img src={assets.genres} alt="" />
            <h3 className="text-lg font-medium text-gray1">Genres</h3>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="bg-black1 px-3 py-1 text-sm rounded-full border border-black5"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>

        {/*Director*/}
        {director && (
          <div className="bg-black1 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray1">Director</h3>
            <p className="text-gray-300 mt-1">{director.name}</p>
          </div>
        )}

        {/*Music Director*/}
        {musicDirector && (
          <div className="bg-black1 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray1">Music</h3>
            <p className="text-gray-300 mt-1">{musicDirector.name}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
