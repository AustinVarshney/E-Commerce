import React, {useState} from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import Pic1 from '../../assets/Pic8.jpg';
import './CartProduct.scss';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const CartProduct = ({ stock = 10, price = 249 }) => {
    const [quantity, setQuantity] = useState(1);

    const handleUp = () => {
        setQuantity((prevQuantity) => {
            if (prevQuantity == stock) {
                return prevQuantity;
            }
            return prevQuantity + 1;
        })
    }

    const handleDown = () => {
        setQuantity((prevQuantity) => {
            if (prevQuantity == 1) {
                return prevQuantity;
            }
            return prevQuantity - 1;
        })
    }

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
                <p>{price}</p>
            </div>

            {/* <div className='cart-product-quantity'>
                <input type="number" min="1" max={stock} defaultValue={1} value={quantity} className='no-spinner' />
            </div> */}

            <div className='cart-product-quantity'>
                <p className='cart-item-quantity-text'>{quantity}</p>
                <p className='quantity-up-arrow' onClick={handleUp}><ArrowDropUpIcon /></p>
                <p className='quantity-down-arrow' onClick={handleDown}><ArrowDropDownIcon /></p>
            </div>

            <div className='cart-product-price'>
                <p>{price * quantity}</p>
            </div>

            <div className='cart-delete'>
                <DeleteIcon />
            </div>
        </div>
    )
}

export default CartProduct
