import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import NotFavouriteIcon from "../../assets/Favourite.png";
// import FavoriteIcon from '../../assets/Favourite2.png';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Pic2 from "../../assets/Pic2.jpg";
import Pic3 from "../../assets/Pic3.jpg";
import Pic4 from "../../assets/Pic4.jpg";
import Pic8 from "../../assets/Pic8.jpg";
import Star from "../../assets/Star.svg";
import { useAuth } from '../../Context/AuthContext';
import { useCart } from '../../Context/CartContext';
import { useWishlist } from '../../Context/WishListContext';
import "./ProductDetails.scss";

const ProductDetails = ({ pName, pRating, pPrice, pDiscount, pReview, pImage }) => {
    let [quantity, setQuantity] = useState(1);
    let [currentIndex, setCurrentIndex] = useState(0);
    let [isZoomed, setIsZoomed] = useState(false);
    let [isFavourite, setIsFavourite] = useState(false);
    const { addToCart } = useCart();
    const images = [Pic8, Pic2, Pic3, Pic4];
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate()
    const { addToWishlist, removeFromWishlist } = useWishlist();


    const product = {
        _id: pName + "-" + pPrice,
        name: pName,
        price: pPrice - (pPrice * pDiscount) / 100,
        originalPrice: pPrice,
        discount: pDiscount,
        image: pImage,
        quantity,
    };

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

    const handleAddToCart = () => {
        if (!isLoggedIn) {
            setTimeout(() => {
                toast.error("Please log in to add items to your cart.");
            }, 1000);
            navigate("/auth")
            return;
        }
        const productToAdd = {
            name: pName,
            price: pPrice - (pPrice * pDiscount) / 100,
            originalPrice: pPrice,
            discount: pDiscount,
            image: pImage,
            quantity: quantity,
        };

        toast.success('🛒 Product added to cart!', { autoClose: 2000 });
        addToCart(productToAdd);
    }

    const handleBuyNow = () => {
        if (!isLoggedIn) {
            setTimeout(() => {
                toast.error("Please log in to add items to your cart.");
            }, 1000);
            navigate("/auth")
            return;
        }
    }

    const handleFavouriteToggle = () => {
        if (!isLoggedIn) {
            setTimeout(() => {
                toast.error("Please log in to add items to your wishlist.");
            }, 1000);
            navigate("/auth");
            return;
        }

        if (!isFavourite) {
            setIsFavourite(true);
            addToWishlist(product);
            toast.success("Product added to Wishlist!");
        } else {
            setIsFavourite(false);
            removeFromWishlist(product._id);
            toast.info("Product removed from Wishlist.");
        }
    };

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
                    <img src={pImage} className="product-main-image" onClick={handleZoom} />
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
                            style={isMainImg(index) ? { outline: "3px solid rgba(255,187,51,1)", outlineOffset: "-3px" } : {}}
                        />
                    ))}
                </div>
            </div>
            {/* ---------------------------------------------------------------------------------------- */}
            <div className="product-details_info">
                <p className="product-title">{pName}</p>

                <div className="product-rating">
                    <div className="rating-stars">
                        <img src={Star} alt="Rating" />
                        <img src={Star} alt="Rating" />
                        <img src={Star} alt="Rating" />
                        <img src={Star} alt="Rating" />
                        <img src={Star} alt="Rating" />
                    </div>
                    <p className="rating-text">{pRating} ({pReview} reviews)</p>
                </div>

                <div className="product-price">
                    <p className="price-after-discount">&#8377; {pPrice - pPrice * pDiscount / 100}</p>
                    <p className="price-before-discount">&#8377; {pPrice}</p>
                    <p className="product-discount">Save {pDiscount}%</p>
                </div>

                <p className="product-desc">
                    Experience unparalleled comfort with our premium ergonomic office chair. Designed to provide optimal support for your back and neck during long working hours. The breathable mesh material ensures proper ventilation, while the adjustable armrests and height settings allow you to customize the chair to your specific needs.
                </p>

                <hr style={{ borderColor: "#6f6f6f" }} />

                <p className="quantity-text">Quantity</p>
                <div className="product-quantity">
                    <div className="dec-quantity" onClick={decrementQuantity}><RemoveIcon style={{ fontSize: "2rem" }} /></div>
                    <div className="actual-quantity">{quantity}</div>
                    <div className="inc-quantity" onClick={incrementQuantity}><AddIcon style={{ fontSize: "2rem" }} /></div>
                </div>

                <div className="product-purchase">
                    <div className="product-buy">
                        <button className="product-buynow" onClick={handleBuyNow}>Buy Now</button>
                    </div>
                    <div className="addCart-favourite">
                        <button className="add-to-cart" onClick={handleAddToCart} ><ShoppingCartIcon style={{ marginRight: "0.2rem" }} />Add To Cart</button>
                        {/* <img src={isFavourite ? FavoriteIcon : NotFavouriteIcon} className="favourite-product" alt="Favourite" onClick={handleFavouriteToggle} style={{ filter: "grayscale(1)" }} /> */}
                        {isFavourite ?
                            <FavoriteIcon className='favourite-product' onClick={handleFavouriteToggle} style={{ color: '#f1284c' }} />
                            :
                            <FavoriteBorderIcon className='favourite-product' onClick={handleFavouriteToggle} />
                        }
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
