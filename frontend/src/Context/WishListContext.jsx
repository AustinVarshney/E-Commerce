import { createContext, useContext, useEffect, useState } from 'react';
import { addToWishlistAPI, getWishlist, removeFromWishlistAPI } from '../components/API/api'; // Adjust path as needed

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);
    const userEmail = JSON.parse(localStorage.getItem("user"))?.email;

    useEffect(() => {
        if (userEmail) {
            getWishlist(userEmail)
                .then(setWishlist)
                .catch(console.error);
        }
    }, [userEmail]);

    const addToWishlist = async (product) => {
        if (!userEmail) return;
        console.log("Adding to wishlist:", product);
        await addToWishlistAPI(userEmail, product);
        setWishlist(prev => [...prev, product]);
    };

    const removeFromWishlist = async (productId) => {
        if (!userEmail) return;
        await removeFromWishlistAPI(userEmail, productId);
        setWishlist(prev => prev.filter(item => item._id !== productId));
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
