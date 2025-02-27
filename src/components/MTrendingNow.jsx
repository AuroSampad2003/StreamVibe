import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function TrendingNow() {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true); // To track if data is being fetched

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5, slidesToSlide: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5, slidesToSlide: 5 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 2 },  // Now 2 items per row on small screens
  };

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzFjYzVlMWNkZTgzM2RmNzYzMDhlYjA5YjA1MjMyYyIsIm5iZiI6MTcyOTcwNzEwOS4xNDUsInN1YiI6IjY3MTkzYzY1NWQwZGU4OTA0MmQ4Y2NjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S3iT07Rh4-YwsGl_gim7COtEGHfG2NAK8srhHhzTJDg'
    }
  };

  useEffect(() => {
    if (isFetching) {
      fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
        .then(res => res.json())
        .then(res => {
          setData(res.results);
          setIsFetching(false); // Mark fetching as complete
        })
        .catch(err => console.error(err));
    }
  }, [isFetching]);

  return (
    <div className="text-white px-20 xl:px-10 md:px-6 sm-max:px-0.5 mt-16 mb-16">
      <h2 className="font-bold text-2xl sm:text-xl mb-6">Trending Now</h2>
      <Carousel responsive={responsive} className="py-3">
        {data.map((item, index) => (
          <Link to={`/${item.id}`} key={index}>
            <div className='border border-black5 bg-black3 rounded-2xl mx-2 p-4'>  {/* Reduced mx-4 to mx-2 */}
              <img className='w-full rounded-2xl object-cover' src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt="" />
              <h1 className='text-center font-bold mt-3 text-sm sm:text-base'>{item.title}</h1>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
}

export default TrendingNow;
