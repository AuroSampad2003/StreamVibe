import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Upcoming() {
 
const [data, setData] = useState([])
const [isFetching, setIsFetching] = useState(true); // To track if data is being fetched

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    slidesToSlide: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzFjYzVlMWNkZTgzM2RmNzYzMDhlYjA5YjA1MjMyYyIsIm5iZiI6MTcyOTcwNzEwOS4xNDUsInN1YiI6IjY3MTkzYzY1NWQwZGU4OTA0MmQ4Y2NjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S3iT07Rh4-YwsGl_gim7COtEGHfG2NAK8srhHhzTJDg'
  }
};

  useEffect(()=> {
    if (isFetching) {
    fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
    .then(res => res.json())
    .then(res => {
      setData(res.results)
      setIsFetching(false); // Mark fetching as complete
    })
    .catch(err => console.error(err))
  }
  }, [isFetching]);

  return (
    <div className='text-white px-20 xl-max:px-10 sm-max:px-3 '>
      <div className='border border-black5 rounded-2xl'>

      <h2 className="inline font-bold text-xl md-max:text-lg mb-2 relative bottom-4 left-9 rounded-lg px-3 py-2 bg-red1">Upcoming</h2>
      <Carousel
          responsive={responsive}
           className="py-3"
        >
        {
          data.map((item,index) => {
            return(
              <Link to={`/${item.id}`} key={index}  >
              <div className='border border-black5  bg-black3 rounded-2xl mx-4 p-5'>
                <img className='w-[250px] mx-auto rounded-2xl' src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt="" />
                <h1 className='text-center font-bold mt-3'>{item.title}</h1>
                <h1 className='text-center text-gray1 bg-black2 py-1 w-fit mx-auto px-3 mt-1 border border-black5 rounded-3xl'>Realeased at {item.release_date}</h1>
              </div>
              </Link>
            )
          })
        }
      </Carousel>
      </div>
    </div>
  )
}

export default Upcoming