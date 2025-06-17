import React from 'react'
import './MoreProducts.scss'
import Pic1 from '../../assets/Pic1.jpg'
import Pic2 from '../../assets/Pic2.jpg'
import Pic3 from '../../assets/Pic3.jpg'
import Pic4 from '../../assets/Pic4.jpg'
import Pic5 from '../../assets/Pic5.jpg'
import Pic6 from '../../assets/Pic6.jpg'
import Pic7 from '../../assets/Pic7.jpg'
import ProductCard from '../ProductCard/ProductCard'

const MoreProducts = () => {

    const products = [
        { PicImg: Pic1, discount: 36, heading: 'Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max', rating: 4.7, reviews: 336, price: 5600 },
        { PicImg: Pic2, discount: 54, heading: 'Gaming Laptop 15.6", Intel i9, RTX 4080, 32GB RAM, 1TB SSD', rating: 4.0, reviews: 456, price: 4000 },
        { PicImg: Pic3, discount: 90, heading: 'Smartwatch with AMOLED Display, Heart Rate & Sleep Tracking', rating: 4.5, reviews: 30, price: 100 },
        { PicImg: Pic4, discount: 19, heading: '4K Ultra HD Smart TV, 55-inch, Dolby Vision & HDR10+', rating: 3.8, reviews: 2, price: 500 },
        { PicImg: Pic5, discount: 18, heading: 'Mechanical Keyboard, RGB Backlit, Hot-Swappable Switches', rating: 3.6, reviews: 542, price: 6600 },
        { PicImg: Pic6, discount: 10, heading: 'Drone with 4K Camera, GPS, 40-Minute Flight Time', rating: 5.0, reviews: 1024, price: 9000 },
        { PicImg: Pic7, discount: 2, heading: 'Portable Power Bank, 20000mAh, Fast Charging USB-C PD', rating: 2.2, reviews: 556, price: 10000 }
    ];


    return (
        <div className='more-products'>
            <p className="more-products-title">You may also like</p>
            <div className='cards-AllPro'>
                {products.map((product, index) => (
                    <ProductCard
                        key={index}
                        PicImg={product.PicImg}
                        discount={product.discount}
                        heading={product.heading}
                        linkToProduct={'/'}
                        rating={product.rating}
                        reviews={product.reviews}
                        price={product.price}
                        linkToCard={'/auth'}
                    />
                ))}
            </div>
        </div>
    )
}

export default MoreProducts
