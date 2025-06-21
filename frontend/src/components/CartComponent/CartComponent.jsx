// CartComponent.jsx
import { useCart } from '../../Context/CartContext';
import CartProduct from '../CartProduct/CartProduct';
import CartSummary from '../CartSummary/CartSummary';
import SmallCartComponent from '../smallCartComponent/smallCartComponent';
import './CartComponent.scss';

const CartComponent = () => {
    const { cartItems } = useCart();

    return (
        <div className='cart-component'>
            <div className='cart-details'>
                <div className='cart-titles'>
                    <p className='cart-title1'></p>
                    <p className='cart-title2'></p>
                    <p className='cart-title3'>Product</p>
                    <p className='cart-title4'>Price</p>
                    <p className='cart-title5'>Quantity</p>
                    <p className='cart-title6'>Final Price</p>
                    <p className='cart-title7'></p>
                </div>

                {/* Dynamically render products */}
                {cartItems.map((item, index) => (
                    <CartProduct key={item._id || index} product={item} id={index + 1} />
                ))}
            </div>

            <div className='small-cart-details'>
                {/* Optional for mobile - keep or customize as needed */}
                {cartItems.map((item, index) => (
                    <SmallCartComponent key={index} item={item} />
                ))}
            </div>

            <div className='cart-summary'>
                <CartSummary />
            </div>
        </div>
    );
};

export default CartComponent;
