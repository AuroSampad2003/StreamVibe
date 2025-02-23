import { useEffect} from 'react'
import HeroSection from '../components/HeroSection'
import Categories from '../components/Categories'
import Devices from '../components/Devices'
import Faq from '../components/Faq'

// eslint-disable-next-line react/prop-types
function Home({setProgress}) {
  useEffect(() =>{
    setProgress(100)
  },[])
  return (
    <div>
        <HeroSection/>
        <div className="text-white px-20 xl-max:px-10 sm-max:px-3 ">
        <div>
          <h1 className="font-semibold text-4xl xl-max:text-3xl sm-max:text-2xl">
            Explore our wide variety of categories
          </h1>
          <p className="mt-5 text-lg xl-max:text-base sm-max:text-sm text-gray1">
            Whether you&apos;re looking for a comedy to make you laugh, a drama to
            make you think, or a documentary to learn something new
          </p>
        </div>
        </div>
        <Categories setProgress={setProgress}/>
        <Devices/>
        <Faq/>
    </div>
  )
}

export default Home