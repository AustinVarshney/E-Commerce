import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import CartComponent from '../../components/CartComponent/CartComponent';
import { useCart } from '../../Context/CartContext';
import './CartPage.scss';

const CartPage = () => {
    const { cartItems } = useCart();
    if (cartItems.length === 0) return <p>Your cart is empty.</p>;
    return (
        <div className='cart-page'>
            <div className='cart-title'>
                <ShoppingBasketIcon />
                <p>Shopping Bag</p>
            </div>
            <CartComponent />
        </div>
    )
}

export default CartPage
