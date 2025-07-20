import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentsIcon from '@mui/icons-material/Payments';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Pic1 from "../../assets/Pic1.jpg";
import { useAuth } from '../../Context/AuthContext';
import { useCart } from '../../Context/CartContext';
import { useWishlist } from '../../Context/WishListContext';
import './ProductCard.scss';

const ProductCard = ({ PicImg = Pic1, discount = 10, heading = "lorem ipsum lorem ipsumlorem ipsum", linkToProduct = "/", rating = 2, reviews = 25, price = 230 }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
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
    const isInWishlist = wishlist.some(item => item._id === product._id);

    const handleLike = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (!isLoggedIn) {
            toast.error("Please log in to use wishlist.");
            navigate("/auth");
            return;
        }

        if (isInWishlist) {
            removeFromWishlist(product._id);
            toast.info("Removed from wishlist");
        } else {
            addToWishlist(product);
            toast.success("Added to wishlist");
        }
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
                    <div className='Favourite-ProCard'>
                        <VisibilityIcon className='favourite-1-ProCard' />
                        {isInWishlist ? (
                            <FavoriteIcon className='favourite-2-ProCard' onClick={handleLike} style={{ color: '#f1284c' }} />
                        ) : (
                            <FavoriteBorderIcon className='favourite-2-ProCard' onClick={handleLike} />
                        )}

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
                        <p className='price-ProCard'>&#8377; {Math.round(price - discount * price / 100)}</p>
                        <p style={discount == 0 ? { display: "none" } : { textDecoration: 'line-through' }} >{Math.round(price)}</p>
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
    );
};

export default ProductCard;
