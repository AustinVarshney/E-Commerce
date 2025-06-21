import CallMadeIcon from '@mui/icons-material/CallMade';
import EditIcon from '@mui/icons-material/Edit';
import './CartSummary.scss';

const CartSummary = () => {
    return (
        <div className='cart-summary-component'>
            <p className='cart-user-title'>Customer Details</p>
            <hr className='cart-line' />
            <div className="cart-user-info">
                <div className='cart-username'>
                    <p className='cart-summary-titles'>Name:</p>
                    <p className='cart-summary-desc'>Mohan Pyare</p>
                </div>
                <div className='cart-address'>
                    <p className='cart-summary-titles'>Address:</p>
                    <p className='cart-summary-desc cart-summary-addr'>Dholakpur, Uttar Pradesh, India Lorem ipsum dolor sit amet consectetur adipisicing</p>
                </div>
                <div className='cart-mobile'>
                    <p className='cart-summary-titles'>Mobile No.:</p>
                    <p className='cart-summary-desc'>+91 1234567890</p>
                </div>
                <div className='cart-email'>
                    <p className='cart-summary-titles'>Email:</p>
                    <p className='cart-summary-desc'>mohanPyare@gmail.com</p>
                </div>
            </div>

            <div className='cart-edit-info'>
                EDIT INFO<EditIcon />
            </div>

            <hr className='cart-line' style={{ marginTop: "2rem", marginBottom: "2rem" }} />

            <div className='cart-summary-totals'>
                <p className='cart-user-title'>Order Summary</p>
                <hr className='cart-line' style={{ width: '90%' }} />

                <div className='cart-calculations'>
                    <p className='cart-calc-title'>Subtotal:</p>
                    <div className='cart-calc'>
                        <ul>
                            <li>(1) $249.9 x 2</li>
                            <li>(2) $249.9 x 2</li>
                            <li>(3) $249.9 x 2</li>
                            <li>(4) $249.9 x 2</li>
                        </ul>
                    </div>
                </div>

                <hr className='cart-line' />
                <p className='cart-total'>$755</p>
                <hr className='cart-line' />

                <div className='cart-more-totals'>
                    <p className='more-totals-title'>Shipping :</p>
                    <p className='more-totals-desc'>$ 10.00</p>
                </div>
                <div className='cart-more-totals'>
                    <p className='more-totals-title'>Estimated Tax :</p>
                    <p className='more-totals-desc'>$ 0.00</p>
                </div>

                <hr className='cart-line' />

                <div className='cart-more-totals'>
                    <p className='more-totals-title' style={{ fontWeight: "700" }}>Total :</p>
                    <p className='more-totals-desc' style={{ fontWeight: "600" }}>$259.99</p>
                </div>
            </div>

            <button className='cart-proceed'>Proceed<CallMadeIcon /></button>
        </div>
    )
}

export default CartSummary
