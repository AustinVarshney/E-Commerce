import Navbar from "../../Components/Navbar/Navbar";
import Product from '../Pages/Product/Product';
import './MainLayout.css';
function MainLayout() {
    return (
        <div className="mainLayout-container">
            <Navbar />
            <Product />
        </div>
    )
}

export default MainLayout;