import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import './MainLayout.css';

function MainLayout() {
    return (
        <div className="mainLayout-container">
            <div style={{ position: "fixed" }}>
                <Navbar />

            </div>
            <Outlet />
        </div>
    )
}

export default MainLayout;