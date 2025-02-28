import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Dialog } from "@material-tailwind/react";

function MovieDetails() {
  const { id, categoryType } = useParams();
  const [media, setMedia] = useState({});
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [open, setOpen] = React.useState(false);

  const apikey = "7efbe02b35a58e752e4a6262a9fd2adc";
  const handleOpen = () => setOpen(!open);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 8, slidesToSlide: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 8, slidesToSlide: 5 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 4 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 2 },
  };

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWZiZTAyYjM1YTU4ZTc1MmU0YTYyNjJhOWZkMmFkYyIsIm5iZiI6MTc0MDc1MTQ5My4zNTgsInN1YiI6IjY3YzFjMjg1OWFkY2QyNTYyNTM1YzIyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OvJ5K7QpCiaubjID0pJj146d-S05U_0E6JD0pxV_D_o"
    },
  };

  useEffect(() => {
    const category = categoryType === "tv" ? "tv" : "movie";
    
    fetch(`https://api.themoviedb.org/3/${category}/${id}?language=en-US`, options)
      .then((res) => res.json())
      .then((response) => setMedia(response))
      .catch((error) => console.error(error));

    fetch(`https://api.themoviedb.org/3/${category}/${id}/credits?language=en-US`, options)
      .then((res) => res.json())
      .then((response) => {
        setCast(response.cast);
        setCrew(response.crew);
      })
      .catch((error) => console.error(error));

    fetch(`https://api.themoviedb.org/3/${category}/${id}/videos?api_key=${apikey}`)
      .then((res) => res.json())
      .then((response) => setVideoData(response.results[0]?.key || ""))
      .catch((error) => console.error(error));
  }, [id, categoryType]);

  const director = crew.find((person) => person.job === "Director");
  const musicDirector = crew.find((person) => person.job === "Original Music Composer");

  return (
    <div className="text-white min-h-screen p-4">
      <div className="relative mb-10 md-max:h-[500px] md:h-[700px]">
        <img
          src={`https://image.tmdb.org/t/p/original/${media.backdrop_path}`}
          alt={media.title || media.name}
          className="w-3/4 h-[700px] mx-auto rounded-xl md-max:absolute md-max:inset-0 md-max:w-full md-max:h-full md-max:object-cover"
        />
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 p-4 text-center">
          <h1 className="text-3xl font-bold mb-3 md-max:text-xl">{media.title || media.name}</h1>
          <p className="text-gray1 max-w-2xl mb-6 md-max:text-sm md-max:hidden">{media.tagline}</p>
          <button onClick={handleOpen} className="bg-red2 text-white px-4 py-2 rounded-lg text-base flex items-center gap-2 hover:bg-red-700 transition">
            <span className="material-icons">play_arrow</span> Play Trailer
          </button>
          <Dialog open={open} handler={handleOpen} className="bg-black">
            <div className="flex justify-center items-center">
              <iframe className="w-[700px] h-[600px] md-max:h-[400px]" src={`https://www.youtube.com/embed/${videoData}`} allowFullScreen></iframe>
            </div>
          </Dialog>
        </div>
      </div>
      <div className="bg-black3 border border-black5 p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl md-max:text-xl font-semibold mb-4 text-gray1">Description</h2>
        <p className="text-sm">{media.overview}</p>
      </div>
      <div className="bg-black3 border border-black5 p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl md-max:text-xl font-semibold mb-4 text-gray1">Cast</h2>
        <Carousel responsive={responsive}>
          {cast.slice(0, 10).map((actor) => (
            <div key={actor.id} className="flex-shrink-0 text-center w-24">
              <img src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt={actor.name} className="w-full h-32 rounded-lg" />
              <p className="mt-2 text-base md-max:text-sm text-gray-300">{actor.name}</p>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="bg-black3 border border-black5 text-white p-6 rounded-lg shadow-md space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray1">Released Year</h3>
          <p className="text-gray-300 mt-1">{media.first_air_date?.split("-")[0] || media.release_date?.split("-")[0]}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray1">Available Languages</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {media.spoken_languages?.map((lang, index) => (
              <span key={index} className="bg-black2 px-3 py-1 text-sm rounded-full border border-black5">{lang.english_name}</span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray1">Genres</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {media.genres?.map((genre) => (
              <span key={genre.id} className="bg-black1 px-3 py-1 text-sm rounded-full border border-black5">{genre.name}</span>
            ))}
          </div>
        </div>
        {director && <div className="bg-black1 p-4 rounded-lg"><h3 className="text-lg font-medium text-gray1">Director</h3><p className="text-gray-300 mt-1">{director.name}</p></div>}
        {musicDirector && <div className="bg-black1 p-4 rounded-lg"><h3 className="text-lg font-medium text-gray1">Music</h3><p className="text-gray-300 mt-1">{musicDirector.name}</p></div>}
      </div>
    </div>
  );
}

export default MovieDetails;
