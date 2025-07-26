import "react";
import Genres from "./Genres";
import PopularGenres from "./PopularGenres";
import TrendingNow from "./TrendingNow";
import NewReleases from "./NewReleases";
import TopRated from "./TopRated";

const MoviesSection = () => {
  const categoryType = "movie";

  return (
    <div className="text-white px-20 xl-max:px-10 sm-max:px-3 mt-16 mb-16">
      <div className="md:border md:border-[#262626] md:rounded-xl md:px-2">
        <h2 className="hidden md:inline font-bold text-xl md:text-lg mb-2 relative bottom-4 left-9 rounded-lg px-3 py-2 bg-[#E50000]">
          Movies
        </h2>
        <div id="movie-genres"><Genres categoryType={categoryType} /></div>
        <div id="movie-popular"><PopularGenres categoryType={categoryType} /></div>
        <div id="movie-trending"><TrendingNow /></div>
        <div id="movie-new"><NewReleases /></div>
        <div id="movie-top-rated"><TopRated /></div>
      </div>
    </div>
  );
};

export default MoviesSection;
