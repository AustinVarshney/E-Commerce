// import '../AllProducts/AllProducts.scss';
// import ProductCard from '../ProductCard/ProductCard';
// import './PopProducts.scss';

// const productss = [
//   // { PicImg: Pic1, discount: 36, heading: 'Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max', rating: 4.7, reviews: 336, price: 5600 },
//   // { PicImg: Pic2, discount: 54, heading: 'Gaming Laptop 15.6", Intel i9, RTX 4080, 32GB RAM, 1TB SSD', rating: 4.0, reviews: 456, price: 4000 },
//   // { PicImg: Pic3, discount: 90, heading: 'Smartwatch with AMOLED Display, Heart Rate & Sleep Tracking', rating: 4.5, reviews: 30, price: 100 },
//   // { PicImg: Pic4, discount: 19, heading: '4K Ultra HD Smart TV, 55-inch, Dolby Vision & HDR10+', rating: 3.8, reviews: 2, price: 500 },
//   // { PicImg: Pic5, discount: 18, heading: 'Mechanical Keyboard, RGB Backlit, Hot-Swappable Switches', rating: 3.6, reviews: 542, price: 6600 },
//   // { PicImg: Pic6, discount: 10, heading: 'Drone with 4K Camera, GPS, 40-Minute Flight Time', rating: 5.0, reviews: 1024, price: 9000 },
//   // { PicImg: Pic7, discount: 2, heading: 'Portable Power Bank, 20000mAh, Fast Charging USB-C PD', rating: 2.2, reviews: 556, price: 10000 }
// ];

// // const truncateText = (text, wordLimit) => {
// //   const words = text.split(" ");
// //   if (words.length > wordLimit) {
// //     return words.slice(0, wordLimit).join(" ") + "...";
// //   }
// //   return text;
// // };

// const PopProducts = () => {
//   return (
//     <div className='outerProDiv1'>
//       <div className='innerProDiv1'>
//         <p>Popular Products</p>
//         <hr />
//       </div>
//       {/* <div className='innerProDiv2'>
//         {products.map((product, index) => (
//           <div className='innerMostProDiv1'>
//             <div className='PopProductcontainer'>
//               <img src={product.image} alt={product.name} className="product-image" />
//             </div>


//             <div className="product-info">
//               <p className="product-name">{product.name}</p>
//               <p className="product-description">{truncateText(product.description, 5)}</p>
//               <div className="product-rating">
//                 {product.rating}
//               </div>
//               <div className='innerMostProDiv2'>
//                 <p className="product-price">₹{product.price}</p>
//                 <NavLink to={product.link}>
//                   <button className="buy-now">Buy Now <AddShoppingCartIcon /></button>
//                 </NavLink>
//               </div>

//             </div>
//           </div>
//         ))}
//       </div> */}

//       <div className={`outer-AllPro-container`}>
//         <div className='cards-AllPro'>
//           {productss.map((product, index) => (
//             <ProductCard
//               key={index}
//               PicImg={product.PicImg}
//               discount={product.discount}
//               heading={product.heading}
//               linkToProduct={`/products/product-details/${index}`}
//               rating={product.rating}
//               reviews={product.reviews}
//               price={product.price}
//             />
//           ))}
//         </div>
//       </div>

//     </div>
//   )
// }

// export default PopProducts


import axios from 'axios';
import { useEffect, useState } from 'react';
import '../AllProducts/AllProducts.scss';
import ProductCard from '../ProductCard/ProductCard';
import './PopProducts.scss';

const PopProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5002/products', { withCredentials: true })
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch products:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className='outerProDiv1'>
      <div className='innerProDiv1'>
        <p>Popular Products</p>
        <hr />
      </div>

      <div className='outer-AllPro-container'>
        <div className='cards-AllPro'>
          {products.map((product, index) => (
            <ProductCard
              key={product._id} // use MongoDB _id
              PicImg={product.pImageUrl}  // fetched image URL
              discount={product.productDiscount}
              heading={product.productName}
              linkToProduct={`/products/product-details/${product._id}`}
              rating={product.productRating || 4.0}  // fallback if no rating
              reviews={product.productNumberOfRatings || 0}
              price={product.productPrice}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PopProducts;
