import { createContext, useState, useEffect } from "react";

const CategoriesContext = createContext();

// eslint-disable-next-line react/prop-types
export const CategoriesProvider = ({ children }) => {
  const [genresList, setGenresList] = useState({ movie: [], tv: [] });
  const [genresDetails, setGenresDetails] = useState([]);
  const [categoryType, setCategoryType] = useState("movie"); // Added categoryType for dynamic handling

  useEffect(() => {
    // Simulate fetching movie and TV genres (Replace with real API)
    setTimeout(() => {
      setGenresList({
        movie: [
          { id: 28, name: "Action" },
          { id: 35, name: "Comedy" },
          { id: 18, name: "Drama" },
          { id: 10751, name: "Family" },
        ],
        tv: [
          { id: 10759, name: "Action & Adventure" },
          { id: 35, name: "Comedy" },
          { id: 18, name: "Drama" },
          { id: 10751, name: "Family" },
        ],
      });
    }, 1000);

    // Simulate fetching combined items (Replace with real API)
    setTimeout(() => {
      setGenresDetails([
        // Movies
        { id: 1, genre_ids: [28], title: "Mad Max", media_type: "movie", poster_path: "/madmax.jpg" },
        { id: 2, genre_ids: [35], title: "Superbad", media_type: "movie", poster_path: "/superbad.jpg" },
        // TV Shows
        { id: 3, genre_ids: [10759], name: "The Mandalorian", media_type: "tv", poster_path: "/mandalorian.jpg" },
        { id: 4, genre_ids: [35], name: "Brooklyn Nine-Nine", media_type: "tv", poster_path: "/b99.jpg" },
      ]);
    }, 1500);
  }, []);

  const isFetching = genresList.movie.length === 0 || genresDetails.length === 0;

  // Handle genre selection dynamically based on categoryType
  const getGenres = () => {
    return genresList[categoryType];
  };

  // Handle item filtering dynamically based on categoryType
  const getItems = () => {
    return genresDetails.filter(item => item.media_type === categoryType);
  };

  return (
    <CategoriesContext.Provider value={{
      genresList,
      genresDetails,
      isFetching,
      categoryType,
      setCategoryType, // Allow component to change categoryType
      getGenres, // Use this to get the correct genres for selected category
      getItems, // Use this to get the filtered items based on category
    }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesContext;
