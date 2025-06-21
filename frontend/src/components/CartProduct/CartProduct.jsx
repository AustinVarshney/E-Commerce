import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../Context/AuthContext';
import { useCart } from '../../Context/CartContext';
import { deleteCartItem } from '../API/api';
import './CartProduct.scss';

const CartProduct = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const { _id, id, image, name, brand, size, color, price, stock } = product;
    const { removeFromCart } = useCart();
    const { user } = useAuth()

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


    const handleDelete = async (productId) => {
        try {
            if (!user || !user.email) {
                alert("User not logged in");
                return;
            }
            await deleteCartItem(user.email, productId);
            removeFromCart(productId);
            toast.success("Product deleted Successfully")
        } catch (err) {
            console.error("Delete error:", err);
            alert(err.message || "Failed to remove item");
        }
    };

    return (
        <div className='cart-product'>
            <div className='cart-id'>
                <p>{id}</p>
            </div>

            <div className='cart-product-img'>
                <img src={image} alt="Product Image" />
            </div>

            <div className='cart-product-title-description'>
                <div className='cart-product-title'>
                    <p>{name}</p>
                </div>
                <div className='cart-product-description'>
                    <p><span>Brand:</span>  {brand}</p>
                    <p><span>Size:</span>  {size}</p>
                    <p><span>Color:</span>  {color}</p>
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

            <div className='cart-delete' onClick={() => handleDelete(_id)}>
                <DeleteIcon />
            </div>
        </div>
    )
}

export default CartProduct
