import './Product.scss'
import { NavLink } from 'react-router';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ProductDetails from '../../components/ProductDetails/ProductDetails';

const Product = () => {
  return (
    <div className='outer-product'>
        <NavLink to={"http://localhost:5173/products"} className='back-to-products'>
            <ArrowBackIosNewIcon/> Back to Products
        </NavLink>
        <ProductDetails/>
    </div>
  )
}

export default Product
