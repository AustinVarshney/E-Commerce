import React from 'react'
import './SingleProduct.scss'
import ProductComponent from '../../components/ProductComponent/ProductComponent'
import MoreProducts from '../../components/MoreProducts/MoreProducts'

const SingleProduct = () => {
  return (
    <div>
      <ProductComponent/>
      <MoreProducts/>
    </div>
  )
}

export default SingleProduct
