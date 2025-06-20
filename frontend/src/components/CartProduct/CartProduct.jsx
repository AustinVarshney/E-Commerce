import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../../Context/CartContext';
import './CartProduct.scss';

const CartProduct = ({ product }) => {
    const { removeFromCart } = useCart();
    const { id, image, name, brand, size, color, price, quantity, stock } = product;
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

            <div className='cart-product-quantity'>
                <input type="number" min="1" max={stock} defaultValue={1} value={quantity} className='no-spinner' />
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
