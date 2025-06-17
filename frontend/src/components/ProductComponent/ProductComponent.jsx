import './ProductComponent.scss'
import { NavLink } from 'react-router';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ProductDetails from '../ProductDetails/ProductDetails';
import ProductMoreInfo from '../ProductMoreInfo/ProductMoreInfo';

const ProductComponent = () => {
  return (
    <div className='outer-product'>
        <NavLink to={"http://localhost:5173/products"} className='back-to-products'>
            <ArrowBackIosNewIcon/> Back to Products
        </NavLink>
        <ProductDetails/>
        <ProductMoreInfo/>
    </div>
  )
}

export default ProductComponent
