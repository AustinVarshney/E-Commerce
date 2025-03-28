import React from 'react'
import './PopProducts.scss'
import { NavLink } from 'react-router';
import Pic4 from '../../assets/Pic4.jpg'
import Pic5 from '../../assets/Pic5.jpg'
import Pic6 from '../../assets/Pic6.jpg'
import Pic7 from '../../assets/Pic7.jpg'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const products = [
  {
    name: "ChromaFit Running Shoes",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia nam maxime deleniti",
    rating: 1,
    price: 200,
    image: `${Pic4}`,
    link: "https://www.google.com",
  },
  {
    name: "ChromaFit Running Shoes",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia nam maxime deleniti",
    rating: 5,
    price: 100,
    image: `${Pic5}`,
    link: "https://www.google.com",
  },
  {
    name: "ChromaFit Running Shoes",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia nam maxime deleniti",
    rating: 3,
    price: 200,
    image: `${Pic6}`,
    link: "https://www.google.com",
  },
  {
    name: "ChromaFit Running Shoes",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia nam maxime deleniti",
    rating: 3.5,
    price: 500000,
    image: `${Pic7}`,
    link: "https://www.google.com",
  },
  {
    name: "ChromaFit Running Shoes",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia nam maxime deleniti",
    rating: 2,
    price: 20,
    image: `${Pic4}`,
    link: "https://www.google.com",
  },
  {
    name: "ChromaFit Running Shoes",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia nam maxime deleniti",
    rating: 2.5,
    price: 500,
    image: `${Pic5}`,
    link: "https://www.google.com",
  },
  {
    name: "ChromaFit Running Shoes",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia nam maxime deleniti",
    rating: 2.3,
    price: 2600,
    image: `${Pic6}`,
    link: "https://www.google.com",
  },
  {
    name: "ChromaFit Running Shoes",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia nam maxime deleniti",
    rating: 5,
    price: 3000,
    image: `${Pic7}`,
    link: "https://www.google.com",
  },
];

const truncateText = (text, wordLimit) => {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};

const PopProducts = () => {
  return (
    <div className='outerProDiv1'>
      <div className='innerProDiv1'>
        <p>Popular Products</p>
        <hr />
      </div>
      <div className='innerProDiv2'>
        {products.map((product, index) => (
          <div className='innerMostProDiv1'>
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <p className="product-name">{product.name}</p>
              <p className="product-description">{truncateText(product.description, 5)}</p>
              <div className="product-rating">
                {product.rating}
              </div>
              <div className='innerMostProDiv2'>
                <p className="product-price">₹{product.price}</p>
                <NavLink to={product.link}>
                  <button className="buy-now">Buy Now <AddShoppingCartIcon/></button>
                </NavLink>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default PopProducts
