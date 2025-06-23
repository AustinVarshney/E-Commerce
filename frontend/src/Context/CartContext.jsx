import { createContext, useContext, useEffect, useState } from 'react';
import { fetchUserCartIfReady, saveUserCart } from '../components/API/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user, isLoggedIn, authLoading } = useAuth();
    const userEmail = user?.email

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

    useEffect(() => {
        fetchUserCartIfReady({ authLoading, user, setCartItems });
    }, [authLoading, user]);

    useEffect(() => {
        if (isLoggedIn) {
            saveUserCart(user.email, cartItems)
                .catch(err => console.error("Cart save failed:", err.message));
        } else {
            localStorage.setItem('cartItems_guest', JSON.stringify(cartItems));
        }
    }, [cartItems, isLoggedIn, user?.email]);

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

