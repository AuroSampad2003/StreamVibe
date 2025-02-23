import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function SearchList() {
  const location = useLocation();
  const [search, setGenreName] = useState(location.state?.search);
  const [movieList, setMovieList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // adjust this value to change the number of items per page

  const totalPages = Math.ceil(movieList.length / itemsPerPage);

  const handlePageChange = (direction) => {
    scrollTo(0, 0);
    setCurrentPage((prev) =>
      direction === "next"
        ? Math.min(prev + 1, totalPages)
        : Math.max(prev - 1, 1)
    );
  };

  const paginatedMovies = movieList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzFjYzVlMWNkZTgzM2RmNzYzMDhlYjA5YjA1MjMyYyIsIm5iZiI6MTcyOTcwNzEwOS4xNDUsInN1YiI6IjY3MTkzYzY1NWQwZGU4OTA0MmQ4Y2NjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S3iT07Rh4-YwsGl_gim7COtEGHfG2NAK8srhHhzTJDg'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`, options)
      .then(res => res.json())
      .then(response => {
        setMovieList(response.results);
        console.log(response.results);
      })
      .catch(error => {
        console.error(error);
      });
  }, [search]);

  return (
    <div className='text-white px-20 xl-max:px-10 sm-max:px-3 mb-9 mt-8'>
      <div  className=" border border-black5 rounded-xl">
        <div className="p-4">
        <h2 className="inline font-bold text-xl md-max:text-lg mb-2 relative bottom-8 left-3 rounded-lg px-3 py-2 bg-red1">{search}</h2>
        <div className='grid grid-cols-5 xl-max:grid-cols-4 md-max:grid-cols-2 sm-max:grid-cols-1 gap-7'>
      {paginatedMovies.map((item) => (
        <Link to={`/${item.id}`} key={item.id}  className=" bg-black3 border border-black5 p-3 rounded-xl shadow-lg hover:shadow-white/10  duration-300">
          <div className="p-4">
            <img  className="rounded-lg w-[250px] mx-auto" src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt="" />
            <div className="text-center mt-2 font-bold">{item.title}</div>
            
          </div>
        </Link>
      ))}
        </div>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 gap-4">
        <button  className="px-4 py-2 bg-black3 rounded-lg border border-black5 transition-transform duration-300 hover:scale-110" onClick={() => handlePageChange("prev")}>Previous</button>
        <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
        <button  className="px-4 py-2 bg-black3 rounded-lg border border-black5 transition-transform duration-300 hover:scale-110" onClick={() => handlePageChange("next")}>Next</button>
      </div>
    </div>
  );
}

export default SearchList;