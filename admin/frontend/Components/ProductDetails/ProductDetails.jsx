import { useEffect, useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { deleteProduct } from '../../API/api'
import deleteProductIcon from '../../src/assets/Product/DeleteProduct.png'
import editProduct from '../../src/assets/Product/editProduct.png'
import viewDetails from '../../src/assets/Product/Eye.png'
import updateStock from '../../src/assets/Product/updateStock.png'
import viewReviews from '../../src/assets/Product/viewReview.png'
import './ProductDetails.css'

function ProductDetails({ pImage, pName, pPrice, pQuantity, pSold, pId, pRating, pStatus = "Active", pCategory, numberOfRating, onProductDeleted }) {
    const [showActions, setShowActions] = useState(false);
    const actionRef = useRef(null);

    const toggleActions = () => {
        setShowActions(prev => !prev);
    };

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this product?");
        if (!confirmed) return;

        const res = await deleteProduct(pId);
        if (res?.message) {
            toast.success("Product deleted successfully!");
            setTimeout(() => {
                if (onProductDeleted) {
                    onProductDeleted(pId);
                }
            }, 300);
        } else {
            toast.error("Failed to delete product.");
        }
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
            <div className='product-image-name' style={{minWidth: '153.86px'}}>
                <ToastContainer />
                <img src={pImage} alt='image' />
                <div className='product-name'>
                    <p>{pName}</p>
                    <p>{pSold}</p>
                </div>
            </div >
            <p style={{minWidth: '78.91px'}}>{pId ? pId.slice(0, 8) : 'N/A'}</p>
            <p style={{minWidth: '85.8px'}}>{pCategory}</p>
            <p style={{minWidth: '71.54px'}}>&#8377; {pPrice}</p>
            <p style={{minWidth: '44.89px'}}>{pQuantity}</p>
            <p className='show-product-status' style={{minWidth: '70px'}}>{pStatus}</p>
            <p  style={{minWidth: '45.58px'}}>{pRating ? pRating : 0} <sub> ({numberOfRating ? numberOfRating : 0})</sub></p>
            <div className='product-action-container' ref={actionRef} style={{minWidth: '48.5px'}}>
                <p onClick={toggleActions} className='action-button'>...</p>
                {showActions && (
                    <ul className='action-menu'>
                        <li>
                            <img src={viewDetails} alt="" />
                            <img src={editProduct} alt="" />
                            <img src={updateStock} alt="" />
                            <img src={viewReviews} alt="" />
                            <img src={deleteProductIcon} alt="" onClick={handleDelete} />
                        </li>
                        <li>
                            <p>View Details</p>
                            <p>Edit Product</p>
                            <p>Update Stock</p>
                            <p>View Reviews</p>
                            <p onClick={handleDelete}>Delete Product</p>
                        </li>

                    </ul>
                )}
            </div>
        </>
    )
}

export default ProductDetails
