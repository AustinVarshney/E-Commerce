import { useEffect, useRef, useState } from 'react';
import AddToProduct from '../AddToProduct/AddToProduct';
import DetailsInfoCard from '../DetailsInfoCard/DetailsInfoCard';
import ProductDetails from '../ProductDetails/ProductDetails';
import notificationIcon from '../../src/assets/Product/Notification.png';
import plusIcon from '../../src/assets/Product/Plus.png';
import ProductIcon from '../../src/assets/Product/Product.svg';
import settingIcon from '../../src/assets/Product/Settings.png';
import sideBar from '../../src/assets/Product/Sidebar.png';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { fetchProducts } from '../../API/api';
import './Product.css';

function Product({ handleNavbar, isNavOpen }) {
    const [products, setProducts] = useState([]);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [whichCategory, setWhichCategory] = useState('All Categories');
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [whichStatus, setWhichStatus] = useState('All Status');
    const [addToProduct, setAddtoProduct] = useState(false);
    const [val, setVal] = useState("");

    const categoryRef = useRef(null);
    const statusRef = useRef(null);
    const popupRef = useRef(null);

    const removeProductFromState = (deletedProductId) => {
        setProducts(prev => prev.filter(product => product._id !== deletedProductId));
    };

    const getAllProducts = async () => {
        const data = await fetchProducts();
        if (val == "") {
            console.log("Updated product list:", data);
            setProducts(data);
        } else {
            const filteredData = data.filter((product) =>
                product.productName?.toLowerCase().includes(val.toLowerCase())
            )
            console.log("Updated product list:", filteredData);
            setProducts(filteredData);
        }
    };


    const addProductToState = (newProduct) => {
        setProducts(prev => [...prev, newProduct]);
        console.log("Product added", products);
        setAddtoProduct(false);
    };

    const showAddtoProductPopUp = () => {
        setAddtoProduct(prev => !prev);
    };

    useEffect(() => {
        getAllProducts();
    }, [val]);

    const extraFunc = () => { };

    const handleCategory = () => { setIsCategoryOpen(prev => !prev) };
    const handleStatus = () => { setIsStatusOpen(prev => !prev) };

    const handleSearch = (event) => {
        setVal(event.target.value);
    }

    // //Prevent Scrolling when addToProduct div gets opened
    useEffect(() => {
        if (isNavOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isNavOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (categoryRef.current && !categoryRef.current.contains(event.target)) {
                setIsCategoryOpen(false);
            }
            if (statusRef.current && !statusRef.current.contains(event.target)) {
                setIsStatusOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <div className='Product' onClick={isNavOpen ? handleNavbar : extraFunc}>
            <div className={`product-outer-container ${isNavOpen ? 'dimmed' : ''}`}>
                <div className={`overlay-background ${addToProduct ? 'active' : ''}`} />

                <div className={`product-main-content ${addToProduct ? 'blurred' : ''}`}>
                    <div className="product-intro">
                        <div>
                            <img src={sideBar} alt="" onClick={handleNavbar} />
                            <p>Dashboard Overview</p>
                        </div>

                        <div>
                            {/* <input type="text" placeholder='search' /> */}
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
                                <button className='export-btn'>Export</button>
                                <button onClick={showAddtoProductPopUp} className='add-product-btn'>
                                    <img src={plusIcon} alt="" />
                                    <p>Add Products</p>
                                </button>
                            </div>
                        </div>

                        <div className='product-status'>
                            <input type="text" placeholder='Search' value={val} onChange={handleSearch} />

                            <div className='products-category' onClick={handleCategory} ref={categoryRef}>
                                <p>{whichCategory}</p>
                                <p>{isCategoryOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</p>
                                <div className='products-category-options' style={isCategoryOpen ? {} : { display: 'none' }}>
                                    <p onClick={() => { setWhichCategory('Electronics') }}>Electronics</p>
                                    <p onClick={() => { setWhichCategory('Clothes') }}>Clothes</p>
                                    <p onClick={() => { setWhichCategory('Medicine') }}>Medicine</p>
                                    <p onClick={() => { setWhichCategory('Footwear') }}>Footwear</p>
                                </div>
                            </div>

                            <div className='products-category' onClick={handleStatus} ref={statusRef}>
                                <p>{whichStatus}</p>
                                <p>{isStatusOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</p>
                                <div className='products-category-options' style={isStatusOpen ? {} : { display: 'none' }}>
                                    <p onClick={() => { setWhichStatus('All Status') }}>All Status</p>
                                    <p onClick={() => { setWhichStatus('In Stock') }}>In Stock</p>
                                    <p onClick={() => { setWhichStatus('Out of Stock') }}>Out of Stock</p>
                                </div>
                            </div>

                            {/* <select>
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
                            </select> */}
                        </div>

                        {/* <div className="product-details-container scroll-container">
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
                        </div> */}

                        <div className="product-details-container">
                            <div className="scroll-container">
                                <div className="product-details-head">
                                    <p style={{ minWidth: '153.86px' }}>Product</p>
                                    <p style={{ minWidth: '78.91px' }}>Product_Id</p>
                                    <p style={{ minWidth: '71.8px' }}>Category</p>
                                    <p style={{ minWidth: '50.54px' }}>Price</p>
                                    <p style={{ minWidth: '44.89px' }}>Stock</p>
                                    <p style={{ minWidth: '55px' }}>Status</p>
                                    <p style={{ minWidth: '45.58px' }}>Rating</p>
                                    <p style={{ minWidth: '36.56px' }}>Actions</p>
                                </div>

                                <div className="product-details">
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
                </div>

            </div>
            {/* <div className={`extra-div1 ${isNavOpen ? 'dimmed' : ''}`}></div> */}
            {addToProduct && (
                <div className="popup-wrapper" >
                    {/* <div className="overlay-background active" /> */}
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
