import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Movies from "./pages/Movies";
import Support from "./pages/Support";
import NavigationBar from "./components/NavigationBar";
import LoadingBar from "react-top-loading-bar";
import { useState } from "react";
import Footer from "./components/Footer";
import CategoriesList from "./pages/CategoriesList";
import CategoriesState from "./context/CategoriesState";
import MovieDetails from "./pages/MovieDetails";
import SearchList from "./pages/SearchList";
import 'font-awesome/css/font-awesome.min.css';
import { ThemeProvider } from "@material-tailwind/react";


function App() {
  const [progress, setProgress] = useState(0);

  const theme = {
    drawer: {
      defaultProps: {
        size: 300,
        overlay: true,
        placement: "right",
        overlayProps: undefined,
        className: "",
        dismiss: undefined,
        onClose: undefined,
        transition: {
          type: "tween",
          duration: 0.3,
        },
      },
      styles: {
        base: {
          drawer: {
            position: "fixed",
            zIndex: "z-[9999]",
            pointerEvents: "pointer-events-auto",
            backgroundColor: "bg-black",
            boxSizing: "box-border",
            width: "w-full",
            boxShadow: "shadow-2xl shadow-blue-gray-900/10",
          },
          overlay: {
            position: "absolute",
            inset: "inset-0",
            width: "w-full",
            height: "h-screen",
            pointerEvents: "pointer-events-auto",
            zIndex: "z-[9995]",
            backgroundColor: "bg-black",
            backgroundOpacity: " bg-opacity-60",
            backdropBlur: "backdrop-blur-sm",
          },
        },
      },
    },
  };
  return (
    <ThemeProvider value={theme}>
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
        <Route path="/searchlist" element={<SearchList />} />
        <Route path=":id" element={<MovieDetails />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/support" element={<Support />} />
      </Routes>
      <Footer />
    </CategoriesState>
    </ThemeProvider>
  );
}

export default App;
