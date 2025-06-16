import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5001",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

export const register = async (userData) => {
    try {
        console.log("Register API called with:", userData);
        const response = await api.post("/register", userData);
        console.log("Registration Successful");
        return response.data;
    } catch (error) {
        console.error("Error during signup:", error.response?.data || error.message);
        throw error.response?.data || { message: "Registration failed" };
    }
};

export const login = async (loginData) => {
    try {
        const response = await api.post("/login", loginData);
        console.log("Login successful");
        return response.data;
    } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
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
        throw error.response?.data || { message: "Something went wrong" };
    }
};

const BASE_URL = 'http://localhost:5001'; // use the backend port

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
        alert('Something went wrong!');
    }
}