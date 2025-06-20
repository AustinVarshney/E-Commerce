import CloseIcon from '@mui/icons-material/Close';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import Pic1 from '../../assets/Pic1.jpg';
import Pic2 from '../../assets/Pic2.jpg';
import Pic3 from '../../assets/Pic3.jpg';
import Pic4 from '../../assets/Pic4.jpg';
import Pic5 from '../../assets/Pic5.jpg';
import Pic6 from '../../assets/Pic6.jpg';
import Pic7 from '../../assets/Pic7.jpg';
import Pic8 from '../../assets/Pic8.jpg';
import ProductCard from '../ProductCard/ProductCard';
import './AllProducts.scss';

export const products = [
    { PicImg: Pic1, discount: 36, heading: 'Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max', rating: 4.7, reviews: 336, price: 5600, index: '1' },
    { PicImg: Pic2, discount: 54, heading: 'Gaming Laptop 15.6", Intel i9, RTX 4080, 32GB RAM, 1TB SSD', rating: 4.0, reviews: 456, price: 4000, index: '2' },
    { PicImg: Pic3, discount: 90, heading: 'Smartwatch with AMOLED Display, Heart Rate & Sleep Tracking', rating: 4.5, reviews: 30, price: 100, index: '3' },
    { PicImg: Pic4, discount: 19, heading: '4K Ultra HD Smart TV, 55-inch, Dolby Vision & HDR10+', rating: 3.8, reviews: 2, price: 500, index: '4' },
    { PicImg: Pic5, discount: 18, heading: 'Mechanical Keyboard, RGB Backlit, Hot-Swappable Switches', rating: 3.6, reviews: 542, price: 6600, index: '5' },
    { PicImg: Pic6, discount: 10, heading: 'Drone with 4K Camera, GPS, 40-Minute Flight Time', rating: 5.0, reviews: 1024, price: 9000, index: '6' },
    { PicImg: Pic7, discount: 2, heading: 'Portable Power Bank, 20000mAh, Fast Charging USB-C PD', rating: 2.2, reviews: 556, price: 10000, index: '7' },
    { PicImg: Pic8, discount: 5, heading: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', rating: 4.2, reviews: 53, price: 15000, index: '8' },
];

const AllProducts = () => {
    const [isOpenSort, setisOpenSort] = useState(false);
    const [isFilterSectionOpen, setisFilterSectionOpen] = useState(false);
    const [sortedProducts, setSortedProducts] = useState([...products]);
    const location = useLocation();

    const isProductDetailsPage = location.pathname.includes('/product-details');

    useEffect(() => {
        document.body.style.overflow = isFilterSectionOpen ? 'hidden' : 'auto';
    }, [isFilterSectionOpen]);

    const handleSortSection = () => {
        setisOpenSort(!isOpenSort);
    }

    const handleFilterSection = () => {
        setisFilterSectionOpen(!isFilterSectionOpen);
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
    };

    return (
        <>
            <div className="outer-AllPro-container">
                {/* Background Overlay */}
                {isFilterSectionOpen && (
                    <div
                        className="filter-backdrop"
                        onClick={handleFilterSection} // click outside to close
                    />
                )}
                {isFilterSectionOpen && (
                    <div className="filter-panel">
                        <button className="close-btn" onClick={handleFilterSection}>
                            <CloseIcon />
                        </button>
                    </div>
                )}

                {!isProductDetailsPage && (
                    <>
                        <div className="filter-AllPro">
                            <button onClick={handleFilterSection}>
                                <FilterAltIcon />Filter<KeyboardArrowDownIcon />
                            </button>
                            <button onClick={handleSortSection}>
                                <SwapVertIcon />Sort<KeyboardArrowDownIcon />
                            </button>

                            {isOpenSort && (
                                <div className="sorted-list-container-AllPro">
                                    <button onClick={() => handleSort('Most Popular')}>Most Popular</button>
                                    <button onClick={() => handleSort('Increasing Price')}>Increasing Price</button>
                                    <button onClick={() => handleSort('Decreasing Price')}>Decreasing Price</button>
                                    <button onClick={() => handleSort('No. of Reviews')}>No. of reviews</button>
                                    <button onClick={() => handleSort('Discount %')}>Discount %</button>
                                </div>
                            )}
                        </div>

                        {/* Page Content */}
                        <div className="heading-AllPro">
                            <p>Accessories</p>
                        </div>
                    </>
                )}


                {!isProductDetailsPage && (
                    <div className="cards-AllPro">
                        {sortedProducts.map((product, index) => (
                            <NavLink
                                key={index}
                                to={`/products/product-details/${index}`}
                                className="product-link"
                            >
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
                            </NavLink>
                        ))}
                    </div>
                )}
                <Outlet />
            </div>
        </>
    );

};

export default AllProducts;