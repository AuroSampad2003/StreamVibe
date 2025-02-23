import React from 'react'
import Upcoming from '../components/Upcoming'
import Popular from '../components/Popular'
import TopRated from '../components/TopRated'
import Genres from '../components/Genres'

function Movies() {
 
  return (
    <div className='text-white'>
      <Genres/>
      <Upcoming/>
      <Popular/>
      <TopRated/>
    </div>
  )
}

export default Movies