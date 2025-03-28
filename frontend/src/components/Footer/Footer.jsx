import React from 'react'
import './Footer.scss'
import { NavLink } from 'react-router';

const Footer = () => {
  return (
    <div className='outerFooterDiv1'>
      <div className='outerFooterDiv2'>
        <div className='innerFooterDiv1'>
          <p className='innerFooterPara1'>Company Name</p>
          <p className='innerFooterPara2'>Lorem ipsum dolor sit amet consectetur. Pptate autem obcaecati, tenetur veniam illo odit odio ducimus ea exercitationem.</p>
        </div>
        <div className='innerFooterDiv4'>
          <div className='innerFooterDiv2'>
            <ul>
              <li><NavLink to="#">Company</NavLink></li>
              <li><NavLink to="#">Home</NavLink></li>
              <li><NavLink to="#">About Us</NavLink></li>
              <li><NavLink to="#">Privacy Policy</NavLink></li>
            </ul>
          </div>
          <div className='innerFooterDiv3'>
            <ul>
              <li>Get in Touch</li>
              <li>+1234567890</li>
              <li>contact@gmail.com</li>
            </ul>
          </div>
        </div>

      </div>
      <div className='outerFooterDiv3'>
        <p>Copyright@2025</p>
      </div>
    </div>
  )
}

export default Footer
