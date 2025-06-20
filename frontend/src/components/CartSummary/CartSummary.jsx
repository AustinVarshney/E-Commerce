import CallMadeIcon from '@mui/icons-material/CallMade';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../../Context/AuthContext';
import { useCart } from '../../Context/CartContext';
import './CartSummary.scss';

const CartSummary = () => {
    const { cartItems } = useCart();
    const { user } = useAuth();

    if (!cartItems) return <p>Loading...</p>;

    const items = cartItems;
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 10.00;
    const estimatedTax = 0.00;
    const total = subtotal + shipping + estimatedTax;

    return (
        <div className='cart-summary-component'>
            <p className='cart-user-title'>Customer Details</p>
            <hr className='cart-line' />

            <div className="cart-user-info">
                <div className='cart-username'>
                    <p className='cart-summary-titles'>Name:</p>
                    <p className='cart-summary-desc'>{user?.username}</p> {/* Update if name available */}
                </div>
                <div className='cart-address'>
                    <p className='cart-summary-titles'>Address:</p>
                    <p className='cart-summary-desc cart-summary-addr'>Dholakpur, Uttar Pradesh, India</p>
                </div>
                <div className='cart-mobile'>
                    <p className='cart-summary-titles'>Mobile No.:</p>
                    <p className='cart-summary-desc'>+91 1234567890</p> {/* Optional dynamic */}
                </div>
                <div className='cart-email'>
                    <p className='cart-summary-titles'>Email:</p>
                    <p className='cart-summary-desc'>{user?.email}</p>
                </div>
            </div>

            <div className='cart-edit-info'>
                EDIT INFO<EditIcon />
            </div>

            <hr className='cart-line' />

            <div className='cart-summary-totals'>
                <p className='cart-user-title'>Order Summary</p>
                <hr className='cart-line' />

                <div className='cart-calculations'>
                    <p className='cart-calc-title'>Subtotal:</p>
                    <div className='cart-calc'>
                        <ul>
                            {items.map((item, index) => (
                                <li key={index}>
                                    ({index + 1}) ${item.price} x {item.quantity}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <hr className='cart-line' />
                <p className='cart-total'>${subtotal.toFixed(2)}</p>
                <hr className='cart-line' />

                <div className='cart-more-totals'>
                    <p className='more-totals-title'>Shipping :</p>
                    <p className='more-totals-desc'>$ {shipping.toFixed(2)}</p>
                </div>
                <div className='cart-more-totals'>
                    <p className='more-totals-title'>Estimated Tax :</p>
                    <p className='more-totals-desc'>$ {estimatedTax.toFixed(2)}</p>
                </div>

                <hr className='cart-line' />

                <div className='cart-more-totals'>
                    <p className='more-totals-title' style={{ fontWeight: "700" }}>Total :</p>
                    <p className='more-totals-desc' style={{ fontWeight: "600" }}>${total.toFixed(2)}</p>
                </div>
            </div>

            <button className='cart-proceed'>Proceed<CallMadeIcon /></button>
        </div>
    );
};

export default CartSummary;
