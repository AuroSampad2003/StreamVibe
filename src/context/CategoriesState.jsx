/* eslint-disable react/prop-types */
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

const useFetchByGenre = (genresId, type) => {
  const [details, setDetails] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!genresId) return;

    const fetchData = async () => {
      setIsFetching(true);
      setError(null);
      const allItems = [];
      const endpoint = type === "movie" ? "discover/movie" : "discover/tv";

      try {
        for (let page = 1; page <= 15; page++) {
          const response = await fetch(
            `https://api.themoviedb.org/3/${endpoint}?include_adult=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genresId}`,
            options
          );
          const data = await response.json();
          if (data.results) {
            allItems.push(...data.results);
          }
        }
        setDetails(allItems);
      } catch (error) {
        setError(`Error fetching ${type}. Please try again later.`);
        console.error(`Error fetching ${type}:`, error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [genresId, type]);

  return { details, isFetching, error };
};

const CategoriesState = (props) => {
  const [genresList, setGenresList] = useState([]);
  const [genresId, setGenresId] = useState("28"); // Default: Action (Movies)
  const [categoryType, setCategoryType] = useState("movie"); // "movie" or "tv"
  const [isFetchingGenres, setIsFetchingGenres] = useState(true);

  const { details: genresDetails, isFetching, error } = useFetchByGenre(genresId, categoryType);

  useEffect(() => {
    const fetchGenresList = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/${categoryType}/list?language=en`,
          options
        );
        const data = await response.json();
        setGenresList(data.genres || []); // Ensure genresList is never undefined
      } catch (error) {
        console.error(`Error fetching ${categoryType} genres:`, error);
      } finally {
        setIsFetchingGenres(false);
      }
    };

    fetchGenresList();
  }, [categoryType]);
  
  return (
    <CategoriesContext.Provider
      value={{
        genresList: genresList || [], // Ensure it always has a default value
        genresDetails,
        genresId,
        setGenresId,
        categoryType,
        setCategoryType,
        isFetchingGenres,
        isFetching,
        error,
      }}
    >
      {props.children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesState;
