import { Outlet } from "react-router";
import Footer from "../../components/Footer/Footer";
import CursorEffect from "../../components/GSAP/cursroEffect";
import Navbar from "../../components/Navbar/Navbar";

function MainLayout() {
    return (
        <>
            <Navbar />
            <div id="main-content">
                <CursorEffect />
                <Outlet />
                <Footer />
            </div>
        </>
    )
}

export default MainLayout;