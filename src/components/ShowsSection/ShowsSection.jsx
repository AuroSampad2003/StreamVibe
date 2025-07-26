import "react";
import Genres from "./Genres";
import PopularGenres from "./PopularGenres";
import TrendingNow from "./TrendingNow";
import NewReleases from "./NewReleases";
import TopRated from "./TopRated";

const ShowsSection = () => {
  const categoryType = "tv";

  return (
    <div className="text-white px-20 xl-max:px-10 sm-max:px-3 mt-16 mb-16">
      <div className="md:border md:border-[#262626] md:rounded-2xl md:px-2">
        <h2 className="hidden md:inline font-bold text-xl md:text-lg mb-2 relative bottom-4 left-9 rounded-lg px-3 py-2 bg-[#E50000]">
          Shows
        </h2>
        <div id="tv-genres">
          <Genres categoryType={categoryType} />
        </div>
        <div id="tv-popular">
          <PopularGenres categoryType={categoryType} />
        </div>
        <div id="tv-trending">
          <TrendingNow />
        </div>
        <div id="tv-new">
          <NewReleases />
        </div>
        <div id="tv-top-rated">
          <TopRated />
        </div>

      </div>
    </div>
  );
};

export default ShowsSection;
