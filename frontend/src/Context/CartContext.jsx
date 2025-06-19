import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Load from localStorage on first render
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    // Save to localStorage whenever cartItems change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(
                item => item.name === product.name
            );

            if (existingItemIndex !== -1) {
                // If already in cart, update quantity
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += product.quantity;
                return updatedItems;
            }

            return [...prevItems, product];
        });
    };

    const removeFromCart = (productName) => {
        setCartItems(prevItems => prevItems.filter(item => item.name !== productName));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
