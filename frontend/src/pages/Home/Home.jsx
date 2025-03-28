import React from 'react'
import './Home.scss'
import Navbar from '../../components/Navbar/Navbar'
import SlideShow from '../../components/SlideShowCom/SlideShow'
import PopProducts from '../../components/PopProducts/PopProducts'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <div>
      <SlideShow />
      <PopProducts/>
    </div>
  )
}

export default Home
