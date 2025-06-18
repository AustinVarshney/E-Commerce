import React from 'react'
import './CartComponent.scss';
import CartProduct from '../CartProduct/CartProduct';
import CartSummary from '../CartSummary/CartSummary';

const CartComponent = () => {
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
                <CartProduct/>
                <CartProduct/>
                <CartProduct/>
                <CartProduct/>
                <CartProduct/>
                <CartProduct/>
            </div>

            <div className='cart-summary'>
                <CartSummary/>
            </div>
        </div>
    )
}

export default CartComponent
