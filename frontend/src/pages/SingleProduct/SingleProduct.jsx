import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MoreProducts from '../../components/MoreProducts/MoreProducts';
import ProductComponent from '../../components/ProductComponent/ProductComponent';

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5002/products/product-details/${id}`)
      .then((res) => {
        console.log("Product fetched successfully", res.data);
        setProduct(res.data);
      })
      .catch((err) => {
        console.error("Error fetching product", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="single-product-page">
      <div className="productview-details">
        <ProductComponent
          pName={product.productName}
          pPrice={product.productPrice}
          pRating={product.productRating}
          pDiscount={product.productDiscount}
          pReview={product.productNumberOfRating}
          pImage={product.pImageUrl}
        />
        <MoreProducts />
      </div>
    </div>
  );
};

export default SingleProduct;
