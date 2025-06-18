import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { NavLink } from 'react-router';
import ProductDetails from '../ProductDetails/ProductDetails';
import ProductMoreInfo from '../ProductMoreInfo/ProductMoreInfo';
import './ProductComponent.scss';

const ProductComponent = ({ pName, pPrice, pRating, pDiscount, pReview, pImage }) => {
  return (
    <div className='outer-product'>
      <NavLink to={"http://localhost:5173/products"} className='back-to-products'>
        <ArrowBackIosNewIcon /> Back to Products
      </NavLink>
      <ProductDetails pName={pName} pPrice={pPrice} pRating={pRating} pDiscount={pDiscount} pReview={pReview} pImage={pImage} />
      <ProductMoreInfo />
    </div>
  )
}

export default ProductComponent
