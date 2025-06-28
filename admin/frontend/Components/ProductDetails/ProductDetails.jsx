import { useEffect, useRef, useState } from 'react'
import deleteProduct from '../../src/assets/Product/DeleteProduct.png'
import editProduct from '../../src/assets/Product/editProduct.png'
import viewDetails from '../../src/assets/Product/Eye.png'
import productImage from '../../src/assets/Product/productImage.png'
import updateStock from '../../src/assets/Product/updateStock.png'
import viewReviews from '../../src/assets/Product/viewReview.png'
import './ProductDetails.css'

function ProductDetails({ pName, pPrice, pQuantity, pSold, pId, pRating, pStatus, pCategory, numberOfRating }) {
    const [showActions, setShowActions] = useState(false);
    const actionRef = useRef(null);

    const toggleActions = () => {
        setShowActions(prev => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (actionRef.current && !actionRef.current.contains(event.target)) {
                setShowActions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div>
                <img src={productImage} alt="" />
                <div className='product-name'>
                    <p>{pName}</p>
                    <p>{pSold}</p>
                </div>
            </div >
            <p>{pId}</p>
            <p>{pCategory}</p>
            <p>&#8377; {pPrice}</p>
            <p>{pQuantity}</p>
            <p className='show-product-status'>{pStatus}</p>
            <p>{pRating} <sub> ({numberOfRating})</sub></p>
            <div className='product-action-container' ref={actionRef}>
                <p onClick={toggleActions} className='action-button'>...</p>
                {showActions && (
                    <ul className='action-menu'>
                        <li>
                            <img src={viewDetails} alt="" />
                            <img src={editProduct} alt="" />
                            <img src={updateStock} alt="" />
                            <img src={viewReviews} alt="" />
                            <img src={deleteProduct} alt="" />
                        </li>
                        <li>
                            <p>View Details</p>
                            <p>Edit Product</p>
                            <p>Update Stock</p>
                            <p>View Reviews</p>
                            <p>Delete Product</p>
                        </li>

                    </ul>
                )}
            </div>
        </>
    )
}

export default ProductDetails
