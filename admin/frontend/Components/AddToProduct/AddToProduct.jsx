import { useState } from 'react';
import imageIcon from '../../assets/productImage.png';
import Button from '../Button/button';
import OutlineButton from '../OutlineButton/OutlineButton';
import './AddToProduct.css';

function AddToProduct() {
    const [product, setProduct] = useState({
        productName: '',
        productImage: 'https://example.com/image.jpg',
        productPrice: '',
        productDiscount: '',
        productInitialStock: '',
        productCategory: '',
        productDescription: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5002/addProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });

            const data = await res.json();

            if (res.ok) {
                alert("✅ Product added successfully!");
                setProduct({
                    productName: '',
                    productImage: '',
                    productPrice: '',
                    productDiscount: '',
                    productInitialStock: '',
                    productCategory: '',
                    productDescription: ''
                });
            } else {
                alert(`❌ Error: ${data.error}`);
            }

        } catch (err) {
            console.error("Error submitting product:", err);
            alert("❌ Failed to add product.");
        }
    };

    return (
        <form className="addtoProduct-container" onSubmit={handleSubmit}>
            <div>
                <p>Add New Product</p>
                <p>Create a new product in your catalog</p>
            </div>

            <div className='product-image-name-container'>
                <div className='product-image-container'>
                    <div>Product Image</div>
                    <div>
                        <img src={imageIcon} alt="preview" />
                        <img src={imageIcon} alt="preview" />
                        <img src={imageIcon} alt="preview" />
                        <img src={imageIcon} alt="preview" />
                    </div>
                </div>

                <div className='product-name-container'>
                    <div>Product Name</div>
                    <input type="text" placeholder='enter product name' name="productName" value={product.productName} onChange={handleChange} />
                </div>
            </div>

            <div className='product-price-discount-container'>
                <div className='product-price-container'>
                    <div>Price</div>
                    <input type="number" placeholder='0.00' name="productPrice" value={product.productPrice} onChange={handleChange} />
                </div>

                <div className='product-Discount-container'>
                    <div>Discount</div>
                    <input type="number" placeholder='0.0' name="productDiscount" value={product.productDiscount} onChange={handleChange} />
                </div>
            </div>

            <div className='product-stock-category-container'>
                <div className='product-stock-container'>
                    <div>Initial Stock</div>
                    <input type="number" placeholder='0.0' name="productInitialStock" value={product.productInitialStock} onChange={handleChange} />
                </div>

                <div className='product-Category-container'>
                    <div>Category</div>
                    <select name="productCategory" value={product.productCategory} onChange={handleChange} className='dropdown-options'>
                        <option value="">Select Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Medicine">Medicine</option>
                        <option value="Clothes">Clothes</option>
                        <option value="Footwear">Footwear</option>
                    </select>
                </div>
            </div>

            <div className='product-description-container'>
                <div>Description</div>
                <textarea
                    placeholder='enter product description...'
                    name="productDescription"
                    rows={10}
                    cols={95}
                    value={product.productDescription}
                    onChange={handleChange}
                />
            </div>

            <div className='buttons'>
                <OutlineButton ObName={"Cancel"} />
                <Button bName={"Add to product"} type="submit" />
            </div>
        </form>
    );
}

export default AddToProduct;
