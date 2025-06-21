import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import CartComponent from '../../components/CartComponent/CartComponent';
import { useCart } from '../../Context/CartContext';
import './CartPage.scss';

const CartPage = () => {
    const { cartItems } = useCart();
    return (
        <>
            {cartItems.length === 0 ?
                <div className='no-wishlist-item' style={{ marginTop: "2rem" }}>
                    Your cart is Empty <RemoveShoppingCartIcon />
                </div>
                :
                <div className='cart-page'>
                    <div className='cart-title'>
                        <ShoppingBasketIcon />
                        <p>Shopping Bag</p>
                    </div>
                    <CartComponent />
                </div>
            }
        </>
    )
}

export default CartPage
