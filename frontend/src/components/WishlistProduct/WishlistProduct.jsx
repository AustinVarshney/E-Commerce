import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../Context/AuthContext';
import { useCart } from '../../Context/CartContext';
import "./WishlistProduct.scss"
import Pic1 from "../../assets/Pic1.jpg"
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentsIcon from '@mui/icons-material/Payments';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteIcon from '@mui/icons-material/Delete';

const WishlistProduct = ({ PicImg = Pic1, discount = 10, heading = "lorem ipsum lorem ipsumlorem ipsum", linkToProduct = "/", rating = 2, reviews = 25, price = 230 }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    const product = {
        _id: heading + "-" + price,
        image: PicImg,
        name: heading,
        price: price,
        link: linkToProduct,
        discount,
        rating,
        reviews,
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (!isLoggedIn) {
            setTimeout(() => {
                toast.error("Please log in to add items to your cart.");
            }, 1000);
            navigate("/auth")
            return;
        }
        addToCart(product);
        // console.log("Product card toast")
        toast.success('🛒 Product added to cart!', { autoClose: 2000 });
    };

    const handleCardClick = () => {
        navigate(linkToProduct);
    };
    
    return (
        <div className='outer-ProductCard-containr' onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <div className='image-ProCard'>
                <img src={PicImg} alt="Img not found" />
            </div>

            <div className='content-ProCard'>
                <div className='content-ProCard-1'>
                    <div className='discount-ProCard'>
                        <p style={discount == 0 ? { display: "none" } : {}}>Up to {discount}% off</p>
                    </div>
                    <div className='Favorite-WishCard'>
                        <VisibilityIcon className='favourite-1-ProCard' />
                        <FavoriteBorderIcon className='favourite-2-ProCard' />
                        <DeleteIcon className='favourite-3-ProCard' />
                        
                    </div>
                </div>

                <div className='content-ProCard-2'>
                    <div className='heading-ProCard'>
                        <h3>{heading}</h3>
                    </div>

                    <div className='reviews-ProCard'>
                        <p className='stars-ProCard'>
                            {[...Array(5)].map((_, i) => (
                                <StarBorderIcon key={i} style={{ fontSize: '1.5rem' }} />
                            ))}
                        </p>
                        <p className='rate-ProCard'>{rating}</p>
                        <p className='total-reviews-ProCard'>({reviews})</p>
                    </div>

                    <div className='two-more-options-ProCard'>
                        <div className='advanced-option-ProCard'>
                            <LocalShippingIcon style={{ fontSize: '0.9rem' }} />
                            <p>Fast Delivery</p>
                        </div>
                        <div className='advanced-option-ProCard'>
                            <PaymentsIcon style={{ fontSize: '0.9rem' }} />
                            <p>Best Price</p>
                        </div>
                    </div>
                </div>

                <div className='content-ProCard-3'>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', }}>
                        <p className='price-ProCard'>&#8377;  {price - discount * price / 100}</p>
                        <p style={discount == 0 ? {display: "none"} : { textDecoration: 'line-through' }} >{price}</p>
                    </div>

                    <button
                        className='add-to-card-ProCard'
                        onClick={handleAddToCart}
                    >
                        <AddShoppingCartIcon style={{ fontSize: '1.25rem' }} />
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WishlistProduct
