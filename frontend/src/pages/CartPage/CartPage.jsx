import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import CartComponent from '../../components/CartComponent/CartComponent';
import { useCart } from '../../Context/CartContext';
import './CartPage.scss';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const CartPage = ({ isCartEmpty = true }) => {
    // const { cartItems } = useCart();
    // if (cartItems.length === 0) return <p>Your cart is empty.</p>;
    return (
        <>
            {isCartEmpty ?
                <div className='no-wishlist-item' style={{marginTop: "2rem"}}>
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
