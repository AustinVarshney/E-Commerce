import { useEffect, useRef, useState } from 'react';
import AddToProduct from '../../../Components/AddToProduct/AddToProduct';
import DetailsInfoCard from '../../../Components/DetailsInfoCard/DetailsInfoCard';
import ProductDetails from '../../../Components/ProductDetails/ProductDetails';

import notificationIcon from '../../assets/Product/Notification.png';
import plusIcon from '../../assets/Product/Plus.png';
import ProductIcon from '../../assets/Product/Product.svg';
import settingIcon from '../../assets/Product/Settings.png';
import sideBar from '../../assets/Product/Sidebar.png';

import { fetchProducts } from '../../../API/api';
import './Product.css';

function Product() {
    const [products, setProducts] = useState([]);

    const [addToProduct, setAddtoProduct] = useState(false);
    const popupRef = useRef(null);

    const removeProductFromState = (deletedProductId) => {
        setProducts(prev => prev.filter(product => product._id !== deletedProductId));
    };

    const getAllProducts = async () => {
        const data = await fetchProducts();
        console.log("Updated product list:", data);
        setProducts(data);
    };


    const addProductToState = (newProduct) => {
        setProducts(prev => [...prev, newProduct]);
        setAddtoProduct(false);
    };

    const showAddtoProductPopUp = () => {
        setAddtoProduct(prev => !prev);
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setAddtoProduct(false);
            }
        };
        if (addToProduct) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [addToProduct]);

    return (
        <div className="product-outer-container">
            <div className={`overlay-background ${addToProduct ? 'active' : ''}`} />

            <div className={`product-main-content ${addToProduct ? 'blurred' : ''}`}>
                <div className="product-intro">
                    <div>
                        <img src={sideBar} alt="" />
                        <p>Dashboard Overview</p>
                    </div>

                    <div>
                        <input type="text" placeholder='search' />
                        <div>
                            <img src={notificationIcon} alt="" />
                            <img src={settingIcon} alt="" />
                        </div>
                    </div>
                </div>

                <div className="product-info-cards">
                    <DetailsInfoCard Heading="Total Products" number={21} image={ProductIcon} />
                    <DetailsInfoCard Heading="Active" number={11} image={ProductIcon} />
                    <DetailsInfoCard Heading="Out of Stock" number={1} image={ProductIcon} />
                    <DetailsInfoCard Heading="Low Stock" number={1} image={ProductIcon} />
                    <DetailsInfoCard Heading="Total Value" number={`₹ ${11250}`} image={ProductIcon} />
                </div>

                <div className="product-management-container">
                    <div className='product-management-head'>
                        <div>
                            <p>Product Management</p>
                            <p>Manage your product catalog and inventory</p>
                        </div>

                        <div className='product-buttons'>
                            <button>Export</button>
                            <button onClick={showAddtoProductPopUp}>
                                <img src={plusIcon} alt="" />
                                <p>Add Products</p>
                            </button>
                        </div>
                    </div>

                    <div className='product-status'>
                        <input type="text" placeholder='search' />

                        <select>
                            <option value="">All Categories</option>
                            <option value="option1">Electronics</option>
                            <option value="option2">Clothes</option>
                            <option value="option2">Medicine</option>
                            <option value="option3">Footwear</option>
                        </select>

                        <select>
                            <option value="">All Status</option>
                            <option value="option1">In Stock</option>
                            <option value="option2">Out of Stock</option>
                        </select>
                    </div>

                    <div className="product-details-container">
                        <div className="product-details-head">
                            <p>Product</p>
                            <p>Product_Id</p>
                            <p>Category</p>
                            <p>Price</p>
                            <p>Stock</p>
                            <p>Status</p>
                            <p>Rating</p>
                            <p>Actions</p>
                        </div>

                        <div className='product-details'>
                            {products
                                .filter(product => product && product.productName)
                                .map((product) => (
                                    <ProductDetails
                                        key={product._id}
                                        pName={product.productName}
                                        pCategory={product.productCategory}
                                        pId={product._id}
                                        pPrice={product.productPrice}
                                        pQuantity={product.productInitialStock}
                                        pRating={product.productRating}
                                        pSold={product.productSold}
                                        pStatus={product.productStatus}
                                        numberOfRating={product.numberOfRating}
                                        pImage={product.productImage}
                                        onProductDeleted={removeProductFromState}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </div>

            {addToProduct && (
                <div className="popup-wrapper" >
                    <div className="overlay-background active" />
                    <div className="add-product-popup" ref={popupRef}>
                        <AddToProduct onProductAdded={addProductToState}
                            onCancel={() => setAddtoProduct(false)} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Product;
