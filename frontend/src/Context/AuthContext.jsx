import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUserName] = useState("");
    const [user, setUser] = useState(null)
    const [token, setToken] = useState("");
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
            setToken(storedToken);
            const parsedUser = JSON.parse(storedUser);
            setIsLoggedIn(true);
            setUserName(parsedUser.username);
            setUser(parsedUser); // ✅ this sets both username and email
        }

        setAuthLoading(false);
    }, []);


    const loginContext = (newToken, user) => {
        localStorage.setItem("authToken", newToken);
        // localStorage.setItem("username", user.username);
        localStorage.setItem("user", JSON.stringify(user));

        setToken(newToken);
        setIsLoggedIn(true);
        setUserName(user.username);
        setUser(user)
        console.log("User logged in: ", { token: newToken });
    }

    const logoutContext = () => {
        localStorage.removeItem("authToken");
        // localStorage.removeItem("username");
        setToken("");
        setIsLoggedIn(false);
        setUserName("");
        setUser(null)
        localStorage.removeItem("user");
    };


    return (
        <AuthContext.Provider value={{ user, isLoggedIn, loginContext, logoutContext, token, username, authLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
