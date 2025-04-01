import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Avatar } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import './Navbar.scss';

const Navbar = () => {
    const [isSidemenuOpen, setIsSidemenuOpen] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const { isLoggedIn, username, logoutContext } = useAuth();
    // const navigate = useNavigate();

    const isOpen = () => {
        setIsSidemenuOpen(!isSidemenuOpen);
        setHasInteracted(true);
    };

    useEffect(() => {
        if (isSidemenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Cleanup when component unmounts or state changes
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isSidemenuOpen]);

    const navRef = useRef(null);

    // useEffect(() => {
    //         const timeline = gsap.timeline();

    //         timeline.from(".innerNavDiv1", {
    //             y: -30,
    //             opacity: 0,
    //             duration: 0.8
    //         });

    //         timeline.from(".innerNavDiv2 a", {
    //             y: -20,
    //             opacity: 0,
    //             stagger: 0.15,
    //             duration: 0.6
    //         });
    // }, []);

    // const handleLogout = () => {
    //     logout();
    //     navigate("/");
    // }

    return (
        <div id="outer-container">
            <div className='outerNavDiv1'>
                <div className='innerNavDiv1'>
                    <p>Logo</p>
                </div>
                <div className="menu-options">
                    {isSidemenuOpen ? (
                        <CloseIcon className="close-icon closeBarIcon closeSideBar " onClick={isOpen} style={{ color: "#fff", position: "relative", zIndex: "1000" }} />
                    ) : (
                        <MenuIcon className="hemburger openBarIcon openSideBar" onClick={isOpen} />
                    )}
                </div>

                <div className={`innerNavDiv2 ${isSidemenuOpen ? "menu-open" : ""}`} ref={navRef}>
                    <NavLink to="/"><HomeIcon style={{ color: '#d4af37' }} />Home</NavLink>
                    <NavLink to="/products"><ShoppingCartIcon style={{ color: '#d4af37' }} />Shop</NavLink>
                    <NavLink to="/contact"><PeopleIcon style={{ color: '#d4af37' }} />Contact</NavLink>
                    <NavLink to="/wishlist"><FavoriteIcon style={{ color: '#d4af37' }} />WishList</NavLink>
                    {!isLoggedIn ? (
                        <NavLink to="/auth"><LoginIcon style={{ color: '#d4af37' }} />Login</NavLink>
                    ) : (
                        <>
                            <div className='user-details'>
                                <div id='user-Logo'>{username[0]} </div>
                                <ArrowDropDownIcon style={{ color: "#fff" }} />
                                {/* <p style={{ color: "white" }}>{username}</p> */}
                                <div className='user-options'>
                                    <span style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}>
                                        <Avatar src="/broken-image.jpg" />
                                        <p>Profile</p>
                                    </span>
                                    <span id='logout-button-details'>
                                        <LockOpenIcon style={{ color: "#ff4d4d" }} />
                                        <p onClick={logoutContext} className="logout-btn">Logout</p>
                                    </span>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/*

                <div className={`innerNavDiv3 ${hasInteracted ? (isSidemenuOpen ? 'openBarIcon' : 'closeBarIcon') : ''}`} onClick={isOpen}>
                    {!isLoggedIn ? (
                        <NavLink to="/auth"><LoginIcon style={{ color: '#d4af37' }} />Login</NavLink>
                    ) : (
                        <>
                            <div className='user-details' >
                                <div id='user-Logo'>{username[0]}</div>
                                {/* <p style={{ color: "#222" }}>{username}</p> */}
                { /*</div><div className='user-options' style={{ width: "8.75rem", right: "-2rem", backgroundColor: "#fff", border: "none" }}>
                                    <span style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}>
                                        <Avatar src="/broken-image.jpg" />
                                        <p style={{ color: "#222" }}>Profile</p>
                                    </span>
                                    <span id='logout-button-details'>
                                        <LockOpenIcon style={{ color: "#ff4d4d" }} />
                                        <p onClick={logoutContext} className="logout-btn">Logout</p>
                                    </span>
                                </div>
                            </div>
                        </>
                    )}
                    <MenuIcon className="hemburger" />
                </div>
                            */}

                {/* <div className={`innerNavDiv4 ${hasInteracted ? (isSidemenuOpen ? 'openSideBar' : 'closeSideBar') : ''}`} onClick={isOpen} style={hasInteracted ? {} : {}}>
                    <div className='innerNavDiv5'>
                        <CloseIcon />
                    </div>

                    <div className='innerNavDiv6'>
                        <NavLink to="/"><HomeIcon style={{ color: '#ff5722' }} />Home</NavLink>
                        <NavLink to="/products"><ShoppingCartIcon style={{ color: '#727272' }} />Shop</NavLink>
                        <NavLink to=""><ContactsIcon style={{ color: 'blue' }} />Contact</NavLink>
                        <NavLink to=""><FavoriteIcon style={{ color: '#fd00ff6b' }} />WishList</NavLink>
                    </div>
                </div> */}

            </div>
        </div >
    )
}

export default Navbar
