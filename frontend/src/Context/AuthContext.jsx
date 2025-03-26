import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // const [username, setUsername] = useState("");
    const [token, setToken] = useState("");

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        // const storedUser = localStorage.getItem("username");

        if (storedToken) {
            // setUsername(storedUser);
            setToken(storedToken);
            console.log("AuthContext Loaded : ", { storedToken });
        }
    }, []);

    const loginContext = (newToken) => {
        localStorage.setItem("authToken", newToken);
        // localStorage.setItem("username", user.username);
        // setUsername(user.username);
        setToken(newToken);
        console.log("User logged in: ", { token: newToken });
    }

    return (
        <AuthContext.Provider value={{ loginContext, token }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
