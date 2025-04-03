import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5001/",
    headers: {
        "Content-Type": "application/json",
    },
})

export const register = async (userData) => {
    try {
        console.log("Register API called with:", userData);
        const response = await api.post("/register", userData, { withCredentials: true });
        console.log("Registration Successfully : ");
        return response.data;
    }
    catch (error) {
        console.error(
            "Error during signup:",
            error.response?.data || error.message
        );
        throw error;
    }
}

export const login = async (loginData) => {
    try {
        const response = await api.post("/login", loginData);
        console.log("Login successfull : ");
        return response.data;
    } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        throw error;
    }
}

export const forgotPassword = async (userData) => {
    try {
        const response = await api.post("/auth/forgotPassword", userData);
        console.log("Forgot Password");
        return response.data;
    } catch (err) {
        console.log("Error", err);
    }
}