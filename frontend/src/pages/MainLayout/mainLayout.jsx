import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Shimmer from "../../components/Shimmer/Shimmer";

function MainLayout() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500); // simulate fetch
        return () => clearTimeout(timer);
    }, []);

    if (loading) return <Shimmer />;
    return (
        <>
            <Navbar />
            <div id="main-content">
                {/* <CursorEffect /> */}
                <Outlet />
                <Footer />
            </div>
        </>
    )
}

export default MainLayout;