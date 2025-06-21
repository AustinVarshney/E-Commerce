import { useEffect } from "react";
import { useNavigate } from "react-router";

function OAuthSuccess() {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authToken = urlParams.get("token");
        const username = urlParams.get("username");

        // Extract email if it exists
        const email = urlParams.get("email");

        if (authToken && username && email) {
            const user = { username, email };

            localStorage.setItem("authToken", authToken);
            localStorage.setItem("username", username);
            localStorage.setItem("user", JSON.stringify(user)); // ✅ FIX

            console.log("OAuth Login Successful:", { authToken, username, email });
        }

        navigate("/", { replace: true });
    }, [navigate]);

    return <h3 style={{ color: "#fff" }}>Redirecting...</h3>;
}

export default OAuthSuccess;
