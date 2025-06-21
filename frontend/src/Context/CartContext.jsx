import axios from "axios";
import { createContext, useContext, useEffect, useState } from 'react';
import { saveUserCart } from '../components/API/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user, isLoggedIn, authLoading } = useAuth();
    const userEmail = user?.email
    // console.log("User from AuthContext:", user);
    // console.log("User email:", user.email);

    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item._id === product._id);
            if (existing) {
                return prev.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item._id !== productId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    // Load cart from localStorage for guest, or from DB for logged-in user
    useEffect(() => {
        // Fetch cart only after auth finishes loading and user is available
        if (!authLoading && user && user.email) {
            console.log("Fetching cart for user:", user.email);

            axios.get(`http://localhost:5001/cart/${user.email}`, { withCredentials: true })
                .then((res) => {
                    console.log("Fetched cart data:", res.data);
                    setCartItems(res.data);
                })
                .catch((err) => {
                    console.error("Error fetching cart:", err);
                });
        }
    }, [authLoading, user]);


    // Save cart: DB for logged-in user, localStorage for guest
    useEffect(() => {
        if (isLoggedIn) {
            saveUserCart(user.email, cartItems)
                .catch(err => console.error("Cart save failed:", err.message));
        } else {
            localStorage.setItem('cartItems_guest', JSON.stringify(cartItems));
        }
    }, [cartItems, isLoggedIn, user?.email]);

    // Remove guest cart on login
    useEffect(() => {
        if (isLoggedIn) {
            localStorage.removeItem('cartItems_guest');
        }
    }, [isLoggedIn]);


    useEffect(() => {
        if (!userEmail) return;

    }, [userEmail]);
    useEffect(() => {
        if (!isLoggedIn) {
            setCartItems([]);
        }
    }, [isLoggedIn]);

    return (
        <CartContext.Provider value={{ setCartItems, cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

