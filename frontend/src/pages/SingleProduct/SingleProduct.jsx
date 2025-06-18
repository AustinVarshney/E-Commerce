import { useParams } from 'react-router-dom';
import { products } from '../../components/AllProducts/AllProducts';
import MoreProducts from '../../components/MoreProducts/MoreProducts';
import ProductComponent from '../../components/ProductComponent/ProductComponent';

const SingleProduct = () => {
  const { id } = useParams();
  const product = products[+id];

  if (!product) return <div>Product not found</div>;

  return (
    <div className="single-product-page">
      <div className="productview-details">
        <ProductComponent pName={product.heading} pPrice={product.price} pRating={product.rating} pDiscount={product.discount} pReview={product.reviews} pImage={product.PicImg} />
        <MoreProducts />
      </div>
    </div>
  );
};

export default SingleProduct;
