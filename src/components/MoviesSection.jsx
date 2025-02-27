import "react";
import Genres from "./MGenres";
import NewReleases from "./MNewReleases";
import TopRated from "./MTopRated";
import TrendingNow from "./MTrendingNow";
import PopularGenres from "./MPopularGenres";

const MoviesSection = () => {
    return (
        <div className="text-white px-20 xl-max:px-10 sm-max:px-3 mt-16 mb-16">
            <div className="md:border md:border-black5 md:rounded-2xl md:px-2">
                <h2 className="hidden md:inline font-bold text-xl md:text-lg mb-2 relative bottom-4 left-9 rounded-lg px-3 py-2 bg-red1">Movies</h2>

                {/* <div className="movies-sections mt-6 space-y-1"> */}
                    {/* Our Genres */}
                    
                        <Genres />

                    {/* Popular Top 10 in Genres */}
                    
                        <PopularGenres />

                    {/* Trending Now */}
                    
                        <TrendingNow />
                    
                    {/* New Releases */}
                    
                        <NewReleases />
                    
                    {/* Must-Watch Movies */}
                    
                        <TopRated />
    
                {/* </div> */}
            </div>

        </div>
    );
};

export default MoviesSection;
