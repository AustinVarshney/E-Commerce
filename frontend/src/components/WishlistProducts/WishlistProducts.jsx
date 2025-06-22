import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { NavLink } from 'react-router-dom';
import { useWishlist } from '../../Context/WishListContext';
import WishlistProduct from '../WishlistProduct/WishlistProduct';
import './WishlistProducts.css';

const WishlistProducts = () => {
    const { wishlist } = useWishlist();
    const wishlistArray = Array.isArray(wishlist) ? wishlist : [];
    console.log(wishlistArray.length)

    return wishlistArray.length ? (
        <div className="cards-AllPro">
            {wishlistArray.map((product, index) => (
                <NavLink key={index} to={`/products/product-details/${index}`} className="product-link">
                    <WishlistProduct heading={product.name} PicImg={product.image} discount={product.discount} linkToProduct={product.link} rating={product.rating} reviews={product.reviews} price={product.price} />
                </NavLink>
            ))
            }
        </div >
    ) : (
        <div className='no-wishlist-item'>
            You haven't any Wishlisted Product <SentimentVeryDissatisfiedIcon />
        </div>
    );
};

export default WishlistProducts