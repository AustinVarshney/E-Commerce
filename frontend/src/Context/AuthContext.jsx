import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUserName] = useState("");
    const [user, setUser] = useState(null)
    const [token, setToken] = useState("");

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        const storedUser = localStorage.getItem("username");

        if (storedToken) {
            setToken(storedToken);
            setIsLoggedIn(true);
            setUserName(storedUser);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const loginContext = (newToken, user) => {
        localStorage.setItem("authToken", newToken);
        localStorage.setItem("username", user.username);

        setToken(newToken);
        setIsLoggedIn(true);
        setUserName(user.username);
        setUser(user)
        console.log("User logged in: ", { token: newToken });
    }

    const logoutContext = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        setToken("");
        setIsLoggedIn(false);
        setUserName("");
        setUser(null)
    };


    return (
        <AuthContext.Provider value={{ user, isLoggedIn, loginContext, logoutContext, token, username }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
