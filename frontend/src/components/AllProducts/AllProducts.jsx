import React, { useState } from 'react';
import './AllProducts.scss';
import ProductCard from '../ProductCard/ProductCard';
import Pic1 from '../../assets/Pic1.jpg';
import Pic2 from '../../assets/Pic2.jpg';
import Pic3 from '../../assets/Pic3.jpg';
import Pic4 from '../../assets/Pic4.jpg';
import Pic5 from '../../assets/Pic5.jpg';
import Pic6 from '../../assets/Pic6.jpg';
import Pic7 from '../../assets/Pic7.jpg';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const products = [
    { PicImg: Pic1, discount: 36, heading: 'Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max', rating: 4.7, reviews: 336, price: 5600 },
    { PicImg: Pic2, discount: 54, heading: 'Gaming Laptop 15.6", Intel i9, RTX 4080, 32GB RAM, 1TB SSD', rating: 4.0, reviews: 456, price: 4000 },
    { PicImg: Pic3, discount: 90, heading: 'Smartwatch with AMOLED Display, Heart Rate & Sleep Tracking', rating: 4.5, reviews: 30, price: 100 },
    { PicImg: Pic4, discount: 19, heading: '4K Ultra HD Smart TV, 55-inch, Dolby Vision & HDR10+', rating: 3.8, reviews: 2, price: 500 },
    { PicImg: Pic5, discount: 18, heading: 'Mechanical Keyboard, RGB Backlit, Hot-Swappable Switches', rating: 3.6, reviews: 542, price: 6600 },
    { PicImg: Pic6, discount: 10, heading: 'Drone with 4K Camera, GPS, 40-Minute Flight Time', rating: 5.0, reviews: 1024, price: 9000 },
    { PicImg: Pic7, discount: 2, heading: 'Portable Power Bank, 20000mAh, Fast Charging USB-C PD', rating: 2.2, reviews: 556, price: 10000 }
];

const AllProducts = () => {
    const [isOpenSort, setisOpenSort] = useState(false);
    const [sortedProducts, setSortedProducts] = useState([...products]);

    const handleSortSection = () => {
        setisOpenSort(!isOpenSort);
    }

    // Sorting Function
    const handleSort = (criteria) => {
        let sortedArray = [...sortedProducts];

        setisOpenSort(!isOpenSort);

        switch (criteria) {
            case 'Most Popular':  
                sortedArray.sort((a, b) => b.rating - a.rating);
                break;
            case 'Increasing Price':  
                sortedArray.sort((a, b) => a.price - b.price);
                break;
            case 'Decreasing Price':  
                sortedArray.sort((a, b) => b.price - a.price);
                break;
            case 'No. of Reviews':  
                sortedArray.sort((a, b) => b.reviews - a.reviews);
                break;
            case 'Discount %':  
                sortedArray.sort((a, b) => b.discount - a.discount);
                break;
            default:
                break;
        }

        setSortedProducts(sortedArray);
        setIsOpenSort(false);
    };

    return (
        <div className='outer-AllPro-container'>
            <div className='heading-AllPro'>
                <p>Accessories</p>
            </div>
            <div className='filter-AllPro'>
                <button onClick={handleSortSection}><SwapVertIcon />Sort<KeyboardArrowDownIcon /></button>
                <div className='sorted-list-container-AllPro' style={isOpenSort ? {} : {display: 'none'}}>
                    <button onClick={() => [handleSort('Most Popular'), handleSortSection()]}>Most Popular</button>
                    <button onClick={() => handleSort('Increasing Price')}>Increasing Price</button>
                    <button onClick={() => handleSort('Decreasing Price')}>Decreasing Price</button>
                    <button onClick={() => handleSort('No. of Reviews')}>No. of reviews</button>
                    <button onClick={() => handleSort('Discount %')}>Discount %</button>
                </div>
            </div>
            <div className='cards-AllPro'>
                {sortedProducts.map((product, index) => (
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
    );
};

export default AllProducts;
