import { Outlet } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function MainLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default MainLayout;