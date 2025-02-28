import { useState } from 'react';
import MoviesSection from '../components/MoviesSection';
import ShowsSection from '../components/ShowsSection';
import HeroBanner from '../components/HeroBanner';

function Movies() {
  const [showMovies, setShowMovies] = useState(true);

  return (
    <div className='text-white'>
    <HeroBanner />
      {/* Toggle Buttons - Only for Small Screens */}
      <div className='md:hidden flex justify-center items-center bg-black1 p-1 rounded-lg border border-gray-900 w-fit mx-auto mb-2'>
        <button
          className={`px-12 py-2 rounded-lg transition-all ${showMovies ? "bg-black4 text-white" : "text-gray-500"}`}
          onClick={() => setShowMovies(true)}
        >
          Movies
        </button>
        <button
          className={`px-12 py-2 rounded-lg transition-all ${!showMovies ? "bg-black4 text-white" : "text-gray-500"}`}
          onClick={() => setShowMovies(false)}
        >
          Shows
        </button>
      </div>

      {/* Always show both sections on large screens */}
      <div className='hidden md:block'>
        <MoviesSection />
        <ShowsSection />
      </div>

      {/* Toggle between sections on small screens */}
      <div className='md:hidden'>
        {showMovies ? <MoviesSection /> : <ShowsSection />}
      </div>
    </div>
  );
}

export default Movies;
