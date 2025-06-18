import React from 'react'
import './CartProduct.scss';
import Pic1 from '../../assets/Pic8.jpg';
import DeleteIcon from '@mui/icons-material/Delete';

const CartProduct = ({stock = 10}) => {
    // let stock = 10; // Example stock value, can be dynamic
    return (
        <div className='cart-product'>
            <div className='cart-id'>
                <p>1.</p>
            </div>

            <div className='cart-product-img'>
                <img src={Pic1} alt="Product Image" />
            </div>

            <div className='cart-product-title-description'>
                <div className='cart-product-title'>
                    <p>Premium Comfort Ergonomic Office Char</p>
                </div>
                <div className='cart-product-description'>
                    <p><span>Brand:</span>  brand_name</p>
                    <p><span>Size:</span>  20m X 15m</p>
                    <p><span>Color:</span>  Black</p>
                </div>
            </div>

            <div className='cart-product-price'>
                <p>$249.9</p>
            </div>

            <div className='cart-product-quantity'>
                <input type="number" min="1" max={stock} defaultValue="1" />
            </div>

            <div className='cart-product-price'>
                <p>$249.9</p>
            </div>

            <div className='cart-delete'>
                <DeleteIcon/>
            </div>
        </div>
    )
}

export default CartProduct
