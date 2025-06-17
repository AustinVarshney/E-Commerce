import React, { useState } from 'react'
import "./ProductMoreInfo.scss"
import Pic1 from "../../assets/Pic1.jpg";
import Pic2 from "../../assets/Pic2.jpg";
import Pic3 from "../../assets/Pic8.jpg";

const ProductMoreInfo = () => {
    let [whichSectionOpen, setWhichSectionOpen] = useState("features");

    const handleSectionClick = (section) => {
        setWhichSectionOpen(section);
    }

    return (
        <div className='product-additional-info'>
            <div className='additional-titles'>
                <div className={`additional-title ${whichSectionOpen === "features" ? 'highlighted-title' : ''}`} onClick={() => handleSectionClick("features")}>Features</div>
                <div className={`additional-title ${whichSectionOpen === "specifications" ? 'highlighted-title' : ''}`} onClick={() => handleSectionClick("specifications")}>Specifications</div>
                <div className={`additional-title ${whichSectionOpen === "reviews" ? 'highlighted-title' : ''}`} onClick={() => handleSectionClick("reviews")}>Reviews</div>
            </div>

            <div className={`feature-content ${whichSectionOpen === "features" ? 'active-feature-content' : ''}`}>
                <ul> 
                    <li>Ergonomic design for optimal back support</li>
                    <li>Breathable mesh material</li>
                    <li>Adjustable armrests and height</li>
                    <li>360° swivel with smooth-rolling casters</li>
                    <li>Weight capacity: 300 lbs</li>
                    <li>5-year warranty</li>
                </ul>
            </div>

            <div className={`specification-content ${whichSectionOpen === "specifications" ? 'active-specification-content' : ''}`}>
                <div>
                    <p className='specification-title'>Dimensions</p>
                    <p className='specification-description'>26"W x 26"D x 38-42"H</p>
                </div>
                <div>
                    <p className='specification-title'>Weight</p>
                    <p className='specification-description'>35 lbs</p>
                </div>
                <div>
                    <p className='specification-title'>Material</p>
                    <p className='specification-description'>High-quality mesh, metal frame</p>
                </div>
                <div>
                    <p className='specification-title'>Color-options</p>
                    <p className='specification-description'>Black, Gray, BlueBlack, Gray, Blue</p>
                </div>
                <div>
                    <p className='specification-title'>Assembly</p>
                    <p className='specification-description'>Required (tools included)</p>
                </div>
            </div>

            <div className={`reviews-content ${whichSectionOpen === "reviews" ? 'active-review-content' : ''}`}>
                <div className='product-review'>
                    <div className='review-profile'>
                        <img src={Pic1} alt="Review Profile" />
                    </div>
                    <div className='review-info'>
                        <div className='review-name-date'>
                            <p className='review-name'>Alex Johnson</p>
                            <p className='review-date'>11/05/2025</p>
                        </div>
                        <div className='review-rating'>
                            <span className='review-stars'>★★★★★</span>
                        </div>
                        <p className='review-title'>Excellent chair, worth every penny</p>
                        <p className='review-description'>I've been using this chair for about a month now and it has significantly improved my posture and reduced back pain. The assembly was straightforward and the quality is outstanding.</p>
                    </div>
                </div>

                <div className='product-review'>
                    <div className='review-profile'>
                        <img src={Pic2} alt="Review Profile" />
                    </div>
                    <div className='review-info'>
                        <div className='review-name-date'>
                            <p className='review-name'>Sarah Miller</p>
                            <p className='review-date'>10/28/2023</p>
                        </div>
                        <div className='review-rating'>
                            <span className='review-stars'>★★★★</span>
                        </div>
                        <p className='review-title'>Great comfort, minor issues</p>
                        <p className='review-description'>The chair is very comfortable for long working hours. The only issue I've found is that the armrests could be a bit more adjustable. Otherwise, it's a great purchase. </p>
                    </div>
                </div>

                <div className='product-review'>
                    <div className='review-profile'>
                        <img src={Pic3} alt="Review Profile" />
                    </div>
                    <div className='review-info'>
                        <div className='review-name-date'>
                            <p className='review-name'>David Chen</p>
                            <p className='review-date'>10/28/2023</p>
                        </div>
                        <div className='review-rating'>
                            <span className='review-stars'>★★★★★</span>
                        </div>
                        <p className='review-title'>Best office chair I've owned</p>
                        <p className='review-description'>After trying several office chairs over the years, this one stands out as the best. The lumbar support is excellent and the breathable material keeps me cool during long work sessions.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductMoreInfo
