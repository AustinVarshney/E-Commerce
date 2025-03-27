import { Outlet } from "react-router";
import Navbar from "../../components/Navbar/Navbar";

function mainLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default mainLayout;