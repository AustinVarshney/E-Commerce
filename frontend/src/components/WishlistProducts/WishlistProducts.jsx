import React from 'react'
import "./WishlistProducts.scss"
import WishlistProduct from '../WishlistProduct/WishlistProduct';
import { NavLink, Outlet } from 'react-router-dom';
import Pic1 from '../../assets/Pic1.jpg';
import Pic2 from '../../assets/Pic2.jpg';
import Pic3 from '../../assets/Pic3.jpg';
import Pic4 from '../../assets/Pic4.jpg';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const WishlistProducts = () => {
    const products = [
        { PicImg: Pic1, discount: 36, heading: 'Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max', rating: 4.7, reviews: 336, price: 5600, index: '1' },
        { PicImg: Pic2, discount: 0, heading: 'Gaming Laptop 15.6", Intel i9, RTX 4080, 32GB RAM, 1TB SSD', rating: 4.0, reviews: 456, price: 4000, index: '2' },
        { PicImg: Pic3, discount: 90, heading: 'Smartwatch with AMOLED Display, Heart Rate & Sleep Tracking', rating: 4.5, reviews: 30, price: 100, index: '3' },
        { PicImg: Pic4, discount: 19, heading: '4K Ultra HD Smart TV, 55-inch, Dolby Vision & HDR10+', rating: 3.8, reviews: 2, price: 500, index: '4' },
    ];

    return (
        <>
            {products.length ?
                <div className="cards-AllPro">
                    {products.map((product, index) => (
                        <NavLink
                            key={index}
                            to={`/products/product-details/${index}`}
                            className="product-link"
                        >
                            <WishlistProduct
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
                        </NavLink>
                    ))}
                </div>
                :
                <div className='no-wishlist-item'>
                    You haven't any Wishlisted Product <SentimentVeryDissatisfiedIcon />
                </div>
            }

            <Outlet />
        </>
    )
}

export default WishlistProducts
