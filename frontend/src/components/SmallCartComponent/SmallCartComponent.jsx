import React, { useState } from 'react'
import './SmallCartComponent.scss'
import Pic1 from "../../assets/Pic1.jpg"
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const SmallCartComponent = ({stock = 10, id}) => {
    const [quantity, setQuantity] = useState(1);

    const handleUp = () => {
        setQuantity((prevQuantity) => {
            if(prevQuantity == stock){
                return prevQuantity;
            }
            return prevQuantity + 1;
        })
    }

    const handleDown = () => {
        setQuantity((prevQuantity) => {
            if(prevQuantity == 1){
                return prevQuantity;
            }
            return prevQuantity - 1;
        })
    }

    return (
        <div className='small-cart-product-container'>
            <img src={Pic1} alt="" />

            <div className='small-cart-title-price'>
                <p className='small-cart-title'>{id}. Premium Comfort Ergonomic Office Char</p>
                <p className='small-cart-price'>$249.9</p>
            </div>

            <div className='small-cart-info-quantity'>
                <div className='small-cart-info'>
                    <p><span>Brand:</span> brand_name</p>
                    <p><span>Size:</span> 20m x 15m</p>
                    <p><span>Color:</span> Black</p>
                </div>
                <div className='small-cart-quantity'>
                    <p className='cart-item-quantity-text'>{quantity}</p>
                    <p className='quantity-up-arrow' onClick={handleUp}><ArrowDropUpIcon /></p>
                    <p className='quantity-down-arrow' onClick={handleDown}><ArrowDropDownIcon /></p>
                </div>
                {/* <input type="number" min="1" max="10" defaultValue={1} className='small-cart-quantity no-spinner' /> */}
            </div>

            <button className='small-cart-delete-button'>Delete<DeleteIcon /></button>
        </div>
    )
}

export default SmallCartComponent
