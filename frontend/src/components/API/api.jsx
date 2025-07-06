import axios from 'axios';

const isProd = import.meta.env.MODE === "production";
export const BASE_URL = isProd
    ? "https://ecommerce-backend-eta-gilt.vercel.app"
    : "http://localhost:5001";


const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

const handleApiError = (error, fallback = "Something went wrong") => {
    console.error(error.response?.data || error.message);
    throw error.response?.data || { message: fallback };
};


export const register = async (userData) => {
    try {
        console.log("Register API called with:", userData);
        const response = await api.post("/register", userData);
        console.log("Registration Successful");
        return response.data;
    } catch (error) {
        console.error("Error during signup:", error.response?.data || error.message);
        handleApiError(error, "Fetch failed");
        throw error.response?.data || { message: "Registration failed" };
    }
};
const userId = localStorage.getItem("userId");

export const login = async (loginData) => {
    try {
        const response = await api.post("/login", loginData);
        const user = response.data;
        localStorage.setItem("token", user.token);
        console.log(userId)
        console.log("Login successful");
        return user;
    } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        handleApiError(error, "Fetch failed");
        throw error.response?.data || { message: "Login failed" };
    }
};

export const forgotPassword = async (userData) => {
    try {
        const response = await api.patch("/auth/forgotPassword", userData);
        console.log("Forgot Password Successful:", response.data);
        return response.data;
    } catch (error) {
        console.error("Forgot Password Error:", error.response?.data?.message || error.message);
        handleApiError(error, "Fetch failed");
        throw error.response?.data || { message: "Something went wrong" };
    }
};

export const sendOtp = async (email) => {
    const response = await axios.post(`${BASE_URL}/auth/send-otp`, { email });
    return response.data;
};

export const verifyOtp = async ({ email, otp }) => {
    const response = await axios.post(`${BASE_URL}/auth/verify-otp`, { email, otp });
    return response.data;
};

export const contact = async (formData) => {
    try {
        const response = await api.post('/contact', formData);
        return response.data
    } catch (error) {
        console.error('Error submitting form:', error);
        handleApiError(error, "Fetch failed");
        alert('Something went wrong!');
    }
}

// Save or update user's cart
export const saveUserCart = async (email, items) => {
    try {
        const response = await api.post(`${BASE_URL}/cart`, { email, items });
        return response.data;
    } catch (error) {
        console.error("Error saving cart:", error.response?.data || error.message);
        handleApiError(error, "Fetch failed");

        throw error.response?.data || { message: "Failed to save cart" };
    }
};

// Get user's cart
export const getUserCart = async (email) => {
    try {
        const response = await api.get(`${BASE_URL}/cart/${email}`);
        console.log("Fetch Succccesss")
        return response.data;
    } catch (error) {
        handleApiError(error, "Fetch failed");
        console.error("Error fetching cart:", error.response?.data || error.message);
        throw error.response?.data || { message: "Failed to fetch cart" };
    }
};

export const deleteCartItem = async (email, productId) => {
    try {
        const response = await api.delete(`/cart/${email}/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error removing item from cart:', error.response?.data || error.message);
        handleApiError(error, "Fetch failed");
        throw error.response?.data || { message: "Failed to delete item" };
    }
};

export const getWishlist = async (email) => {
    try {
        const response = await api.get(`${BASE_URL}/wishlist/${email}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching wishlist:", error.response?.data || error.message);
        handleApiError(error, "Fetch failed");
        throw error.response?.data || { message: "Failed to fetch wishlist" };
    }
};

export const addToWishlistAPI = async (email, product) => {
    try {
        const response = await api.post('/wishlist/add', { email, product });
        return response.data;
    } catch (error) {
        console.error("Error adding to wishlist:", error.response?.data || error.message);
        handleApiError(error, "Fetch failed");
        throw error.response?.data || { message: "Failed to add to wishlist" };
    }
};

export const removeFromWishlistAPI = async (email, productId) => {
    try {
        const response = await api.delete(`/wishlist/${email}/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error removing from wishlist:", error.response?.data || error.message);
        handleApiError(error, "Fetch failed");
        throw error.response?.data || { message: "Failed to remove from wishlist" };
    }
};

export const fetchUserCartIfReady = async ({ authLoading, user, setCartItems }) => {
    if (!authLoading && user && user.email) {
        try {
            console.log("Fetching cart for user:", user.email);
            const response = await getUserCart(user.email);
            console.log("Fetched cart data:", response);
            setCartItems(response);
        } catch (error) {
            handleApiError(error, "Fetch failed");
            console.error("Error fetching cart:", error.message || error);
        }
    }
};

export const createRazorpayOrder = async (amountInPaise) => {
    try {
        const response = await fetch(`${BASE_URL}/cart/order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ amount: amountInPaise })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to create order");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("API Error - createRazorpayOrder:", error);
        throw error;
    }
};

export const saveOrder = async (orderData) => {
    try {
        const response = await fetch(`${BASE_URL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        });

        if (!response.ok) throw new Error("Order save failed");
        return await response.json();
    } catch (error) {
        console.error("Error in saveOrder:", error);
        throw error;
    }
};

export const getOrdersByUser = async (userId) => {
    try {
        const res = await api.get(`/orders/user/${userId}`);
        console.log("userId : ", userId)
        return res.data;
    } catch (err) {
        throw err.response?.data || { message: "Failed to fetch orders" };
    }
};

export const contactForm = async (formData) => {
    try {
        const res = await api.post(`${BASE_URL}/contact`, formData);
        return res.data;
    } catch (error) {
        console.error("Error submitting contact form", error);
        throw error;
    }
};
