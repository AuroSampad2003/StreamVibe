import { createContext, useState, useEffect } from "react";

const CategoriesContext = createContext();

// eslint-disable-next-line react/prop-types
export const CategoriesProvider = ({ children }) => {
  const [genresList, setGenresList] = useState([]);
  const [genresDetails, setGenresDetails] = useState([]);

  useEffect(() => {
    // Simulate fetching genres list (Replace with API call)
    setTimeout(() => {
      setGenresList([
        { id: 28, name: "Action" },
        { id: 35, name: "Comedy" },
        { id: 18, name: "Drama" },
        { id: 10751, name: "Family" },
      ]);
    }, 1000);

    // Simulate fetching genre details (Replace with API call)
    setTimeout(() => {
      setGenresDetails([
        { id: 1, genre_ids: [28], title: "Mad Max", backdrop_path: "/madmax.jpg" },
        { id: 2, genre_ids: [35], title: "Superbad", backdrop_path: "/superbad.jpg" },
      ]);
    }, 1500);
  }, []);

  return (
    <CategoriesContext.Provider value={{ genresList, genresDetails }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesContext;
