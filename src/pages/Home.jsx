import { useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import Categories from '../components/Categories'
import Devices from '../components/Devices'
import Faq from '../components/Faq'

// eslint-disable-next-line react/prop-types
function Home({ setProgress }) {
  useEffect(() => {
    setProgress(100)
  }, [])

  return (
    <div>
      <HeroSection />
      <Categories setProgress={setProgress} />
      <Devices />
      <Faq />
    </div>
  )
}

export default Home
