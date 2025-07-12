import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Avatar, Badge } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../Context/AuthContext';
import { useCart } from '../../Context/CartContext';
import './Navbar.scss';

const Navbar = () => {
    const [isSidemenuOpen, setIsSidemenuOpen] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const navigate = useNavigate();

    const { cartItems } = useCart();
    const { isLoggedIn, logoutContext, username } = useAuth();

    const handleLogout = () => {
        logoutContext();
        cartItems.length = 0
        navigate("/auth");
    };

    const toggleMenu = () => {
        setIsSidemenuOpen(!isSidemenuOpen);
        setHasInteracted(true);
    };

    const handleProtectedRoute = (to, requiresAuth) => {
        if (requiresAuth && !isLoggedIn) {
            navigate("/auth");
            setTimeout(() => {
                toast.warning("Please login to access this page");
            }, 1000);
        } else {
            navigate(to);
        }
        toggleMenu();
    };

    const links = [
        { to: "/", icon: <HomeIcon style={{ color: '#d4af37' }} />, label: "Home", requiresAuth: false },
        { to: "/products", icon: <StorefrontIcon style={{ color: '#d4af37' }} />, label: "Shop", requiresAuth: false },
        { to: "/contact", icon: <PeopleAltIcon style={{ color: '#d4af37' }} />, label: "Contact", requiresAuth: false },
        { to: "/wishlist", icon: <FavoriteIcon style={{ color: '#d4af37' }} />, label: "Wishlist", requiresAuth: true },
        {
            to: "/cart",
            icon: (
                <Badge badgeContent={cartItems.reduce((acc, item) => acc + item.quantity, 0)} color="primary" showZero={true}>
                    <ShoppingCartIcon style={{ color: '#d4af37' }} />
                </Badge>
            ),
            label: "Cart",
            requiresAuth: true
        },
    ];

    return (
        <div id="outer-container">
            {isSidemenuOpen && <div className="navbar-overlay" onClick={toggleMenu}></div>}

            <div className={`innerNavDiv4 ${hasInteracted ? (isSidemenuOpen ? 'openSideBar' : 'closeSideBar') : ''}`}>
                <div className='innerNavDiv5'>
                    <CloseIcon className='close-icon-Nav' onClick={toggleMenu} />
                </div>
                <div className='innerNavDiv6'>
                    {links.map((link, index) => (
                        <div
                            key={index}
                            onClick={() => handleProtectedRoute(link.to, link.requiresAuth)}
                        >
                            {link.icon}{link.label}
                        </div>
                    ))}
                </div>
            </div>

            <div className='outerNavDiv1'>
                <div className='innerNavDiv1'>
                    <p>Logo</p>
                </div>

                <div className='sideBar-profile-container'>
                    <div className='profile-details-smaller'>
                        {!isLoggedIn ? (
                            <div>
                                <span><FavoriteIcon style={{ color: '#d4af37' }} /></span>
                                <span><Badge badgeContent={cartItems.length} color="primary" showZero={true}>
                                    <ShoppingCartIcon style={{ color: '#d4af37' }} />
                                </Badge>
                                </span>
                                <span className='login-small' onClick={() => navigate("/auth")}>
                                    <LoginIcon style={{ color: '#d4af37' }} />Login
                                </span>
                            </div>
                        ) : (
                            <div className='user-details'>
                                <div id='user-Logo'>{username?.charAt(0)?.toUpperCase()}</div>
                                <ArrowDropDownIcon style={{ color: "#fff" }} />
                                <div className='user-options'>
                                    <span style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}>
                                        <Avatar src="/broken-image.jpg" />
                                        <Link to={'/profile'} style={{ color: "#fff" }}>Profile</Link>
                                    </span>
                                    <span style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}>
                                        <Avatar src="/broken-image.jpg" />
                                        <p>My Orders</p>
                                    </span>
                                    <span id='logout-button-details'>
                                        <LockOpenIcon style={{ color: "#ff4d4d" }} />
                                        <p onClick={handleLogout} className="logout-btn">Logout</p>
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='innerNavDiv2'>
                        {links.map((link, index) => (
                            <div
                                key={index}
                                onClick={() => handleProtectedRoute(link.to, link.requiresAuth)}
                            >
                                {link.icon}{link.label}
                            </div>
                        ))}
                        {!isLoggedIn ? (
                            <span onClick={() => navigate("/auth")}><LoginIcon style={{ color: '#d4af37' }} />Login</span>
                        ) : (
                            <div className='user-details'>
                                <div id='user-Logo'>{username?.charAt(0)?.toUpperCase()}</div>
                                <ArrowDropDownIcon style={{ color: "#fff" }} />
                                <div className='user-options'>
                                    <span style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}>
                                        <Avatar src="/broken-image.jpg" />
                                        <Link to={'/profile'} style={{ color: "#fff" }}>Profile</Link>
                                    </span>
                                    <Link to={'/orders'} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}>
                                        <Avatar src="/broken-image.jpg" />
                                        <p>My Orders</p>
                                    </Link>
                                    <span id='logout-button-details'>
                                        <LockOpenIcon style={{ color: "#ff4d4d" }} />
                                        <p onClick={handleLogout} className="logout-btn">Logout</p>
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div
                        className={`innerNavDiv3 ${hasInteracted ? (isSidemenuOpen ? 'openBarIcon' : 'closeBarIcon') : ''}`}
                        onClick={toggleMenu}
                    >
                        <MenuIcon />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
