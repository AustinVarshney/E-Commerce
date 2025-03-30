import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUserName] = useState("");
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        const storedUser = localStorage.getItem("username");

        if (storedToken) {
            // setUsername(storedUser);
            setToken(storedToken);
            setIsLoggedIn(true);
            setUserName(storedUser);
            console.log("AuthContext Loaded : ", { storedToken });
            if (window.location.pathname === "/login") {
                navigate("/");
            }
        }
    }, []);

    const loginContext = (newToken, user) => {
        localStorage.setItem("authToken", newToken);
        localStorage.setItem("username", user.username);

        setToken(newToken);
        setIsLoggedIn(true);
        setUserName(user.username);
        console.log("User logged in: ", { token: newToken });
    }

    const logoutContext = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        setToken("");
        setIsLoggedIn(false);
        setUserName("");
    };


    return (
        <AuthContext.Provider value={{ isLoggedIn, loginContext, logoutContext, token, username }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
