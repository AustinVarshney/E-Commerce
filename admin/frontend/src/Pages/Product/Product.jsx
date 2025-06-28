import { useEffect, useRef, useState } from 'react';
import AddToProduct from '../../../Components/AddToProduct/AddToProduct';
import DetailsInfoCard from '../../../Components/DetailsInfoCard/DetailsInfoCard';
import ProductDetails from '../../../Components/ProductDetails/ProductDetails';
import notificationIcon from '../../assets/Product/Notification.png';
import plusIcon from '../../assets/Product/Plus.png';
import ProductIcon from '../../assets/Product/Product.svg';
import settingIcon from '../../assets/Product/Settings.png';
import sideBar from '../../assets/Product/Sidebar.png';
import './Product.css';
function Product() {
    const products = [{ pName: "Wireless Bluetooth Headphones", pSold: "1250 sold", pId: "Product-1", pCategory: "Electronics", pPrice: 21.21, pQuantity: 21, pStatus: "Active", pRating: "4.5", numberOfRating: 21 },
    { pName: "Wireless Bluetooth Headphones", pSold: "1250 sold", pId: "Product-1", pCategory: "Electronics", pPrice: 21.21, pQuantity: 21, pStatus: "Active", pRating: "4.5", numberOfRating: 21 },
    ]

    const [addToProduct, setAddtoProduct] = useState(false);
    const showAddtoProductPopUp = () => {
        setAddtoProduct(prev => !prev);
    }
    const actionRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (actionRef.current && !actionRef.current.contains(event.target)) {
                setAddtoProduct(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <>
            <div className="product-outer-container" >
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

                        <div className='product-buttons' ref={actionRef}>
                            <button>Export</button>
                            <button onClick={showAddtoProductPopUp}>
                                <img src={plusIcon} alt="" />
                                <p >Add Products</p>

                            </button>
                            {addToProduct && <AddToProduct />}
                        </div>
                    </div>

                    <div className='product-status'>
                        <input type="text" placeholder='search' />

                        <select name="">
                            <option value=""> All Categories</option>
                            <option value="option1">Electronics</option>
                            <option value="option2">Clothes</option>
                            <option value="option2">Medicine</option>
                            <option value="option3">Footwear</option>
                        </select>

                        <select name="">
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
                            {products.map((product, index) => (
                                <ProductDetails pName={product.pName} pCategory={product.pCategory} pId={product.pId} pPrice={product.pPrice} pQuantity={product.pQuantity} pRating={product.pRating} pSold={product.pSold} pStatus={product.pStatus} key={index + 1} numberOfRating={product.numberOfRating} />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Product