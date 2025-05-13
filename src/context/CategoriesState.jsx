import { useEffect, useState } from "react";
import CategoriesContext from "./CategoriesContext";

const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWZiZTAyYjM1YTU4ZTc1MmU0YTYyNjJhOWZkMmFkYyIsIm5iZiI6MTc0MDc1MTQ5My4zNTgsInN1YiI6IjY3YzFjMjg1OWFkY2QyNTYyNTM1YzIyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OvJ5K7QpCiaubjID0pJj146d-S05U_0E6JD0pxV_D_o";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: API_KEY,
  },
};

const useFetchByGenre = (genreId, type) => {
  const [details, setDetails] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!genreId || !type) return;

    const fetchData = async () => {
      setIsFetching(true);
      setError(null);
      const allItems = [];
      const endpoint = type === "movie" ? "discover/movie" : "discover/tv";

      try {
        for (let page = 1; page <= 5; page++) {
          const res = await fetch(
            `https://api.themoviedb.org/3/${endpoint}?include_adult=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`,
            options
          );
          if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

          const data = await res.json();
          if (data.results?.length) {
            allItems.push(...data.results);
          }
        }
        setDetails(allItems);
      } catch (err) {
        console.error("Fetch by genre failed:", err);
        setError(`Failed to fetch ${type} content. ${err.message || ""}`);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [genreId, type]);

  return { details, isFetching, error };
};

// eslint-disable-next-line react/prop-types
const CategoriesState = ({ children, initialType = "movie" }) => {
  const [categoryType, setCategoryType] = useState(initialType);
  const [genresList, setGenresList] = useState([]);
  const [genresId, setGenresId] = useState(null);
  const [isFetchingGenres, setIsFetchingGenres] = useState(false);
  const [genresError, setGenresError] = useState(null);

  const { details: genresDetails, isFetching, error } = useFetchByGenre(genresId, categoryType);

  useEffect(() => {
    const fetchGenresList = async () => {
      setIsFetchingGenres(true);
      setGenresError(null);

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/genre/${categoryType}/list?language=en`,
          options
        );
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const data = await res.json();
        const genres = data.genres || [];

        setGenresList(genres);

        // Only auto-select the first genre if none is selected
        setGenresId((prevId) => prevId || genres[0]?.id || null);
      } catch (err) {
        console.error(`Failed to fetch genres for ${categoryType}:`, err);
        setGenresError(`Failed to fetch genres for ${categoryType}. ${err.message || ""}`);
      } finally {
        setIsFetchingGenres(false);
      }
    };

    // Fetch genres only when categoryType changes
    fetchGenresList();
  }, [categoryType]);  // This ensures it runs on both `movie` and `tv`

  return (
    <CategoriesContext.Provider
      value={{
        genresList,
        genresDetails,
        genresId,
        setGenresId,
        categoryType,
        setCategoryType,
        isFetchingGenres,
        isFetching,
        error,
        genresError,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesState;

