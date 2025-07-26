import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Movies_Shows from "./pages/Movies_Shows";
import Support from "./pages/Support";
import NavigationBar from "./components/NavigationBar";
import LoadingBar from "react-top-loading-bar";
import Footer from "./components/Footer";
import FreeTrial from "./components/FreeTrial";
import CategoriesList from "./pages/CategoriesList";
import TopGenreList from "./pages/TopGenreList";
import Subscriptions from "./pages/Subscriptions";
import CategoriesState from "./context/CategoriesState";
import MovieDetails from "./pages/MovieDetails";
import SearchList from "./pages/SearchList";
import ShowsSection from "./components/ShowsSection/ShowsSection";
import 'font-awesome/css/font-awesome.min.css';
import { FaPlay } from "react-icons/fa";
import { ThemeProvider } from "@material-tailwind/react";

function App() {
  const [progress, setProgress] = useState(0);
  const [showSplash, setShowSplash] = useState(false);

  // Run once per session
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (!hasVisited) {
      setShowSplash(true);
      sessionStorage.setItem("hasVisited", "true");

      setTimeout(() => {
        setShowSplash(false);
      }, 3000);
    }
  }, []);

  // Splash screen
  if (showSplash) {
    return (
      <div className="w-screen h-screen bg-[#141414] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 flex items-center justify-center">
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
            <FaPlay className="text-[#E50000] w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 z-10" />
          </div>
          <div className="mt-1 flex text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light">
            <span className="text-white font-semibold">Stream</span>
            <span className="text-[#E50000] font-normal">Vibe</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <CategoriesState>
        <LoadingBar
          height={3}
          color="rgb(229, 0, 0)"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home setProgress={setProgress} />} />
          <Route path="/categoriesList" element={<CategoriesList />} />
          <Route path="/topGenreList" element={<TopGenreList />} />
          <Route path="/searchlist" element={<SearchList />} />
          <Route path="/:categoryType/:id" element={<MovieDetails />} />
          <Route path=":id" element={<MovieDetails />} />
          <Route path="/movies" element={<Movies_Shows />} />
          <Route path="/shows" element={<ShowsSection />} />
          <Route path="/support" element={<Support />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="*" element={<div className="text-center text-white mt-10 text-2xl">404 | Page Not Found</div>} />
        </Routes>

        {/* 🪄 Only on first visit */}
        <FreeTrial />
        <Footer />
      </CategoriesState>
    </ThemeProvider>
  );
}

export default App;
