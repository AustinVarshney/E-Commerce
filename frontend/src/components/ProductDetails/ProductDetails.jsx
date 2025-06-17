import "./ProductDetails.scss";
import Pic1 from "../../assets/Pic1.jpg";
import Pic2 from "../../assets/Pic2.jpg";
import Pic3 from "../../assets/Pic3.jpg";
import Pic4 from "../../assets/Pic4.jpg";
import Pic8 from "../../assets/Pic8.jpg";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import Star from "../../assets/Star.svg";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import NotFavouriteIcon from "../../assets/Favourite.png";
import FavoriteIcon from '../../assets/Favourite2.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState, useEffect } from "react";

const ProductDetails = () => {
    let [quantity, setQuantity] = useState(1);
    let [currentIndex, setCurrentIndex] = useState(0);
    let [isZoomed, setIsZoomed] = useState(false);
    let [isFavourite, setIsFavourite] = useState(false);

    const images = [Pic8, Pic2, Pic3, Pic4];

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    }

    const decrementQuantity = () => {
        setQuantity(quantity - 1);

        if (quantity <= 1) {
            setQuantity(1);
        }
    }

    const goleft = () => {
        setCurrentIndex((currentIndex) => {
            return currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        });
    };

    const goright = () => {
        setCurrentIndex((currentIndex) => {
            return currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        });
    }

    const handleZoom = () => {
        setIsZoomed(true);
    };

    const handleCloseZoom = () => {
        setIsZoomed(false);
    };

    const isMainImg = (index) => {
        return index === currentIndex;
    }

    const handleFavouriteToggle = () => {
        setIsFavourite(!isFavourite);
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setIsZoomed(false);
            }
        };

        if (isZoomed) {
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isZoomed]);

    return (
        <div className="product-details">
            <div className="product_image">
                <div className="product-main-image-container">
                    <img src={images[currentIndex]} className="product-main-image" onClick={handleZoom}/>
                    <div className="left-arrow" onClick={goleft}>
                        <ArrowBackIosNewIcon style={{ fontSize: "1rem", marginLeft: "-0.1rem" }} />
                    </div>
                    <div className="right-arrow" onClick={goright}>
                        <ArrowForwardIosIcon style={{ fontSize: "1rem", marginRight: "-0.1rem" }} />
                    </div>
                    <div className="zoom-image" onClick={handleZoom}>
                        <ZoomOutMapIcon style={{ fontSize: "0.9rem" }} />
                    </div>

                    {isZoomed && (
                        <div className="zoom-overlay" onClick={handleCloseZoom}>
                            <img
                                src={images[currentIndex]}
                                alt="Zoomed Product"
                                className="zoomed-image"
                            />
                        </div>
                    )}
                </div>
                <div className="product-more-images-container">
                    {images.map((imageSrc, index) => (
                        <img src={imageSrc} key={index} onClick={() => { setCurrentIndex(index) }}
                            className="more-image-containers" 
                            style={isMainImg(index) ? {outline: "3px solid rgba(255,187,51,1)", outlineOffset: "-3px"} : {}}
                            />
                    ))}
                </div>
            </div>
            {/* ---------------------------------------------------------------------------------------- */}
            <div className="product-details_info">
                <p className="product-title">Premium Comfort Ergonomic Office Chair</p>

                <div className="product-rating">
                    <div className="rating-stars">
                        <img src={Star} alt="Rating" />
                        <img src={Star} alt="Rating" />
                        <img src={Star} alt="Rating" />
                        <img src={Star} alt="Rating" />
                        <img src={Star} alt="Rating" />
                    </div>
                    <p className="rating-text">5 (127 reviews)</p>
                </div>

                <div className="product-price">
                    <p className="price-after-discount">$249.99</p>
                    <p className="price-before-discount">$299.99</p>
                    <p className="product-discount">Save 17%</p>
                </div>

                <p className="product-desc">
                    Experience unparalleled comfort with our premium ergonomic office chair. Designed to provide optimal support for your back and neck during long working hours. The breathable mesh material ensures proper ventilation, while the adjustable armrests and height settings allow you to customize the chair to your specific needs.
                </p>

                <hr style={{borderColor: "#6f6f6f"}}/>

                <p className="quantity-text">Quantity</p>
                <div className="product-quantity">
                    <div className="dec-quantity" onClick={decrementQuantity}><RemoveIcon style={{ fontSize: "2rem" }} /></div>
                    <div className="actual-quantity">{quantity}</div>
                    <div className="inc-quantity" onClick={incrementQuantity}><AddIcon style={{ fontSize: "2rem" }} /></div>
                </div>

                <div className="product-purchase">
                    <div className="product-buy">
                        <button className="product-buynow">Buy Now</button>
                    </div>
                    <div className="addCart-favourite">
                        <button className="add-to-cart"><ShoppingCartIcon style={{ marginRight: "0.2rem" }} />Add To Cart</button>
                        <img src={isFavourite ? FavoriteIcon : NotFavouriteIcon} className="favourite-product" alt="Favourite" onClick={handleFavouriteToggle} style={{ filter: "grayscale(1)" }} />
                    </div>
                </div>

                <div className="product-more-info">
                    <p className="more-info1">In Stock</p>
                    <p className="more-info2">Free shippings on order over $50</p>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
