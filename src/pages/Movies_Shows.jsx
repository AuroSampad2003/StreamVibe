import { useState } from 'react';
import MoviesSection from '../components/MoviesSection/MoviesSection';
import ShowsSection from '../components/ShowsSection/ShowsSection';
import HeroBanner from '../components/HeroBanner';
import CategoriesState from '../context/CategoriesState';

function Movies_Shows() {
  const [showMovies, setShowMovies] = useState(true);

  return (
    <div className='text-white'>
      <HeroBanner />

      {/* Toggle Buttons */}
      <div className='md:hidden flex justify-center items-center bg-[#0F0F0F] p-1 rounded-lg border border-[#262626] w-fit mx-auto mb-2'>
        <button
          className={`px-12 py-2 rounded-lg transition-all ${showMovies ? "bg-[#1F1F1F] text-white" : "text-[#999999]"}`}
          onClick={() => setShowMovies(true)}
        >
          Movies
        </button>
        <button
          className={`px-12 py-2 rounded-lg transition-all ${!showMovies ? "bg-[#1F1F1F] text-white" : "text-[#999999]"}`}
          onClick={() => setShowMovies(false)}
        >
          Shows
        </button>
      </div>

      {/* Always show both on large screens */}
      <div className='hidden md:block'>
        <CategoriesState initialType="movie">
          <MoviesSection />
        </CategoriesState>
        <CategoriesState initialType="tv">
          <ShowsSection />
        </CategoriesState>
      </div>

      {/* Toggle view on small screens */}
      <div className='md:hidden'>
        {showMovies ? (
          <CategoriesState initialType="movie">
            <MoviesSection />
          </CategoriesState>
        ) : (
          <CategoriesState initialType="tv">
            <ShowsSection />
          </CategoriesState>
        )}
      </div>
    </div>
  );
}

export default Movies_Shows;
