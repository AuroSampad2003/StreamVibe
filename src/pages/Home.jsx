import { useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import Categories from '../components/Categories'
import Devices from '../components/Devices'
import Faq from '../components/Faq'
import Plan from '../components/Plan'

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
      <Plan />
    </div>
  )
}

export default Home
