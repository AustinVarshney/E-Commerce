import axios from 'axios';
export const BASE_URL = "http://localhost:5002";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});

export const addProduct = async (product) => {
    try {
        const response = await api.post("/addProduct", product);
        return response.data.newProduct;
    } catch (err) {
        console.error("Error submitting product:", err);
        alert("Failed to add product.");
    }
};

export const fetchProducts = async () => {
    try {
        const res = await api.get("/products");
        return res.data;
    } catch (err) {
        console.error("Error fetching products:", err);
        return [];
    }
};

export const uploadProductImage = async (file) => {
    const formData = new FormData();
    formData.append('productImage', file);

    try {
        const res = await axios.post(`${BASE_URL}/upload-image`, formData, {
            headers: {
                'Accept': 'application/json'
            },
            withCredentials: true
        });

        return res.data.pImageUrl;
    } catch (err) {
        console.error("Image upload error:", err);
        throw err;
    }
};

export const deleteProduct = async (id) => {
    try {
        const res = await api.delete(`/deleteProduct/${id}`)
        return res.data;
    } catch (err) {
        console.log("Error in deleteing Product", err);
    }
}

export const updateStock = async (id, stock) => {
    try {
        const res = await api.patch(`/products/updateStock/${id}`, { stock });
        return res.data.updatedProduct;
    } catch (err) {
        console.error("Error updating stock:", err);
        throw err;
    }
};
