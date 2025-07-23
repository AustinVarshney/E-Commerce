import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { addProduct, updateProduct, uploadProductImage } from '../../API/api.jsx';
import imageIcon from '../../assets/productImage.png';
import Button from '../Button/button';
import OutlineButton from '../OutlineButton/OutlineButton';
import './AddToProduct.css';

function AddToProduct({ onProductAdded,
    onCancel,
    editMode,
    productToEdit }) {
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [whichCategory, setWhichCategory] = useState('All Categories');

    const categoryRef = useRef(null);

    const [product, setProduct] = useState({
        productName: '',
        pImageUrl: '',
        productPrice: '',
        productDiscount: '',
        productInitialStock: '',
        productCategory: '',
        productDescription: ''
    });

    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCategory = () => { setIsCategoryOpen(prev => !prev) };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { productPrice, productDiscount, productInitialStock } = product;
        if (parseFloat(productPrice) < 0) {
            toast.warn("Price cannot be negative.");
            return;
        }

        if (parseFloat(productDiscount) < 0) {
            toast.warn("Discount cannot be negative.");
            return;
        }

        if (parseFloat(productInitialStock) < 0) {
            toast.warn("Stock cannot be negative.");
            return;
        }

        try {
            if (!product.productName || !product.productPrice || !product.productCategory) {
                toast.warn("Please fill in all required fields.");
                return;
            }

            const savedProduct = await addProduct(product);
            console.log("Saved product from server:", savedProduct);
            toast.success("Product Added Successfully");

            if (onProductAdded) {
                onProductAdded(savedProduct);
            }

            // Clear form
            setProduct({
                productName: '',
                pImageUrl: '',
                productPrice: '',
                productDiscount: '',
                productInitialStock: '',
                productCategory: '',
                productDescription: ''
            });
            setSelectedImage(null);
            setImageUrl('');
        } catch (err) {
            toast.error("Failed to add product. Please try again.");
            console.error(err);
        }
    };

    const handleEditMode = async () => {
        if (editMode) {
            try {
                const updatedPayload = {
                    ...productToEdit,   // old product
                    ...product          // new edited fields
                };
                const updated = await updateProduct(productToEdit._id, updatedPayload);
                toast.success("Product Updated Successfully");

                // Replace in state
                if (onProductAdded) onProductAdded({ ...updated, _id: productToEdit._id });
            } catch (err) {
                toast.error("Failed to update product.");
                console.error(err);
            }
        } else {
            const savedProduct = await addProduct(product);
            toast.success("Product Added Successfully");
            if (onProductAdded) onProductAdded(savedProduct);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        setSelectedImage(URL.createObjectURL(file)); // Preview

        try {
            const pImageUrl = await uploadProductImage(file);
            setProduct(prev => ({ ...prev, pImageUrl }));
            setImageUrl(pImageUrl);
        } catch (err) {
            console.error("Image upload failed", err);
        }
    };

    useEffect(() => {
        if (editMode && productToEdit) {
            setProduct({
                productName: productToEdit.productName || '',
                pImageUrl: productToEdit.pImageUrl || '',
                productPrice: productToEdit.productPrice || '',
                productDiscount: productToEdit.productDiscount || '',
                productInitialStock: productToEdit.productInitialStock || '',
                productCategory: productToEdit.productCategory || '',
                productDescription: productToEdit.productDescription || ''
            });
            setWhichCategory(productToEdit.productCategory || 'All Categories');
            if (productToEdit.pImageUrl) {
                setSelectedImage(productToEdit.pImageUrl);
                setImageUrl(productToEdit.pImageUrl);
            }
        } else {
            setProduct({
                productName: '',
                pImageUrl: '',
                productPrice: '',
                productDiscount: '',
                productInitialStock: '',
                productCategory: '',
                productDescription: ''
            });
            setWhichCategory('All Categories');
            setSelectedImage(null);
            setImageUrl('');
        }
    }, [editMode, productToEdit]);


    return (
        <div>
            <ToastContainer />
            <form className="addtoProduct-container" onSubmit={(e) => {
                e.preventDefault();
                if (editMode) {
                    handleEditMode(e);
                } else {
                    handleSubmit(e);
                }
            }} noValidate>
                <div>
                    <p>{editMode ? "Edit Product" : "Add New Product"}</p>
                    <p>{editMode ? "Update product details in your catalog" : "Create a new product in your catalog"}</p>
                </div>


                <div className='product-image-name-container'>
                    <div className='product-image-container'>
                        <div>Product Image</div>

                        <div className="preview-and-upload">
                            {selectedImage ? (
                                <img src={selectedImage} alt="Preview" className='preview-img' />
                            ) : (
                                <img src={imageIcon} alt="placeholder" className='preview-img' />
                            )}
                            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ fontFamily: 'inherit' }} />
                        </div>
                    </div>

                    <div className='product-name-container'>
                        <div>Product Name</div>
                        <input
                            type="text"
                            placeholder='Enter product name'
                            name="productName"
                            value={product.productName}
                            onChange={handleChange}
                        />
                    </div>
                </div>


                <div className='product-price-discount-container'>
                    <div className='product-price-container'>
                        <div>Price</div>
                        <input type="number" min={1} placeholder='0.00' name="productPrice" value={product.productPrice} onChange={handleChange} />
                    </div>

                    <div className='product-Discount-container'>
                        <div>Discount</div>
                        <input type="number" placeholder='0.0' min={0} name="productDiscount" value={product.productDiscount} onChange={handleChange} />
                    </div>
                </div>

                <div className='product-stock-category-container'>
                    <div className='product-stock-container'>
                        <div>Initial Stock</div>
                        <input type="number" min={1} placeholder='0.0' name="productInitialStock" value={product.productInitialStock} onChange={handleChange} />
                    </div>

                    <div className='product-Category-container'>
                        <div>Category</div>
                        <div className='products-category-add-product' onClick={handleCategory} ref={categoryRef}>
                            <p>{whichCategory}</p>
                            <p>{isCategoryOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</p>
                            <div className='products-category-add-product-options' style={isCategoryOpen ? {} : { display: 'none' }}>
                                <p onClick={() => {
                                    setWhichCategory('Electronics');
                                    setProduct(prev => ({ ...prev, productCategory: 'Electronics' }));
                                }}>Electronics</p>

                                <p onClick={() => {
                                    setWhichCategory('Clothes');
                                    setProduct(prev => ({ ...prev, productCategory: 'Clothes' }));
                                }}>Clothes</p>

                                <p onClick={() => {
                                    setWhichCategory('Medicine');
                                    setProduct(prev => ({ ...prev, productCategory: 'Medicine' }));
                                }}>Medicine</p>

                                <p onClick={() => {
                                    setWhichCategory('Footwear');
                                    setProduct(prev => ({ ...prev, productCategory: 'Footwear' }));
                                }}>Footwear</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='product-description-container'>
                    <div>Description</div>
                    <textarea
                        placeholder='Enter product description...'
                        name="productDescription"
                        rows={10}
                        cols={95}
                        value={product.productDescription}
                        onChange={handleChange}
                        // style={{width: '100%'}}
                        className='product-description-addProduct'
                    />
                </div>

                <div className='buttons'>
                    <OutlineButton
                        ObName={"Cancel"}
                        type="button"
                        onClick={() => {
                            setSelectedImage(null);
                            setImageUrl('');
                            setProduct({
                                productName: '',
                                productImage: '',
                                productPrice: '',
                                productDiscount: '',
                                productInitialStock: '',
                                productCategory: '',
                                productDescription: ''
                            });

                            // Close the popup
                            if (onCancel) onCancel();
                        }}
                    />

                    <Button bName={editMode ? "Update Product" : "Add to Product"} type="submit" />
                </div>
            </form>
        </div>
    );
}

export default AddToProduct;