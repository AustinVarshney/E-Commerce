import React from 'react'
import './CartPage.scss';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import CartComponent from '../../components/CartComponent/CartComponent';

const CartPage = () => {
    return (
        <div className='cart-page'>
            <div className='cart-title'>
                <ShoppingBasketIcon/>
                <p>Shopping Bag</p>
            </div>

            <CartComponent/>
        </div>
    )
}

export default CartPage
