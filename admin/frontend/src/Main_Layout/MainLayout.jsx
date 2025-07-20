// import { Outlet } from "react-router-dom";
// import Navbar from "../../Components/Navbar/Navbar";
// import './MainLayout.css';
// import { useState } from "react";

// function MainLayout() {
//     const [isNavOpen, setIsNavOpen] = useState(false);

//     const handleNavbar = () => {
//         setIsNavOpen(!isNavOpen);
//         console.log("isNavOpen value is :", isNavOpen);
//     }
//     return (
//         <div className="mainLayout-container">
//             {/* <div style={{ position: "fixed" }}>
//             </div> */}
//             <Navbar isNavOpen={isNavOpen}/>
//             <div style={{ width: '100vw' }}>
//                 <Outlet context={{ handleNavbar, isNavOpen }}/>
//             </div>
//         </div>
//     )
// }

// export default MainLayout;


import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import './MainLayout.css';
import { useState } from "react";

function MainLayout() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleNavbar = () => {
        setIsNavOpen(prev => !prev);
        console.log("isNavOpen value is:", !isNavOpen);
    };

    return (
        <div className="mainLayout-container">
            <div>
                <Navbar isNavOpen={isNavOpen} />
            </div>
            <div style={{ width: '100vw' }}>
                <Outlet context={{ handleNavbar, isNavOpen }} />
            </div>
        </div>
    );
}

export default MainLayout;
