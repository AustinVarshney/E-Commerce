import { useEffect } from "react";
import { useNavigate } from "react-router";

function OAuthSuccess() {
    const navigate = useNavigate();
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authToken = urlParams.get("token");
        const username = urlParams.get("username");


        if (authToken && username) {
            localStorage.setItem("Google Auth Toke : ", authToken);
            localStorage.setItem("Google Username : ", username);

            console.log("OAuth Login Successful:", authToken, username);
        }

        navigate("/", { replace: true });
    }, [navigate]);
    return (
        <h3>Redirecting....</h3>
    )
}

export default OAuthSuccess;