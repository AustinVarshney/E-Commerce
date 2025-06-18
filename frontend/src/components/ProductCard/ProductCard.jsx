import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentsIcon from '@mui/icons-material/Payments';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../Context/CartContext';
import './ProductCard.scss';

const ProductCard = ({ PicImg, discount, heading, linkToProduct, rating, reviews, price }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const product = {
        image: PicImg,
        name: heading,
        price: price,
        link: linkToProduct,
        discount,
        rating,
        reviews,
    };

    const handleAddToCart = (e) => {
        e.stopPropagation(); // ✅ Prevent navigation
        e.preventDefault();  // ✅ Prevent link from firing
        addToCart(product);
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
                        <p>Up to {discount}% off</p>
                    </div>
                    <div className='Favourite-ProCard'>
                        <VisibilityIcon className='favourite-1-ProCard' />
                        <FavoriteBorderIcon className='favourite-2-ProCard' />
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
                    <p className='price-ProCard'>$ {price}</p>
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
