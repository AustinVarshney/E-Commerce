import React from 'react'
import Product from '../../../Components/Product/Product'
import { useOutletContext } from 'react-router-dom';

const ProductsPage = () => {
  const { handleNavbar, isNavOpen } = useOutletContext();

  return (
    <div>    
      <Product handleNavbar={handleNavbar} isNavOpen={isNavOpen}/>
    </div>
  )
}

export default ProductsPage
