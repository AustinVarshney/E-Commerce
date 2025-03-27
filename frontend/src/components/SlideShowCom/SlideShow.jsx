import React, { useRef, useState } from 'react'
import './SlideShow.scss'
import { Fade, Zoom } from 'react-slideshow-image';
import Pic1 from '../../assets/Pic1.jpg'
import Pic2 from '../../assets/Pic2.jpg'
import Pic3 from '../../assets/Pic3.jpg'
import 'react-slideshow-image/dist/styles.css'

const fadeImages = [
  {
    url: `${Pic1}`,
    discount: 50,
    title: 'ChromaFit Running Shoes',
    link: `https://www.google.com`,
  },
  {
    url: `${Pic2}`,
    discount: 30,
    title: 'BattleBeast VR Headset',
    link: `https://www.google.com`,
  },
  {
    url: `${Pic3}`,
    discount: 20,
    title: 'PixelPlay Streaming Shoes',
    link: `https://www.google.com`,
  },
];

const SlideShow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const fadeRef = useRef(null);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    fadeRef.current.goTo(index);
  };

  return (
    <div className='outerSSDiv1 slide-container'>
      <Fade ref={fadeRef} duration={2000} transitionDuration={500} onChange={(oldIndex, newIndex) => setCurrentSlide(newIndex)} defaultIndex={currentSlide}>
        {fadeImages.map((fadeImage, index) => (
          <div key={index} className='innerSSDiv1'>
            <div className='innerMostSSDiv1'>
              <p className='innerSSPara1' style={{ margin: '0' }}>Exclusive {fadeImage.discount}% off</p>
              <p className='innerSSPara2' style={{ margin: '0' }}>{fadeImage.title}</p>
              <a href={fadeImage.link}><button>Order Now!</button></a>
            </div>
            <div className='innerMostSSDiv2'>
              <img src={fadeImage.url} />
            </div>
          </div>
        ))}
      </Fade>

      <div className="custom-dots">
        {fadeImages.map((_, index) => (
          <div
            key={index}
            className={`custom-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)} // Navigate when clicking the dot
          />
        ))}
      </div>
    </div>
  )
}

export default SlideShow
