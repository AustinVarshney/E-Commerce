import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import './Navbar.scss';

const Navbar = () => {
    const [isSidemenuOpen, setIsSidemenuOpen] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isSidemenuOpen) {
            document.body.classList.add('navBarBlurred');
        } else {
            document.body.classList.remove('navBarBlurred');
        }
    });

    const { isLoggedIn, logoutContext, username } = useAuth();

    const handleLogout = () => {
        logoutContext();
        navigate("/auth");
    };

    const toggleMenu = () => {
        setIsSidemenuOpen(!isSidemenuOpen);
        setHasInteracted(true);
    };

    const links = [
        { to: "/", icon: <HomeIcon style={{ color: '#d4af37' }} />, label: "Home" },
        { to: "/products", icon: <ShoppingCartIcon style={{ color: '#d4af37' }} />, label: "Shop" },
        { to: "/contact", icon: <PeopleAltIcon style={{ color: '#d4af37' }} />, label: "Contact" },
        { to: "", icon: <FavoriteIcon style={{ color: '#d4af37' }} />, label: "WishList" },
    ];

    return (
        <div id="outer-container">
            <div className={`innerNavDiv4 ${hasInteracted ? (isSidemenuOpen ? 'openSideBar' : 'closeSideBar') : ''}`} onClick={toggleMenu}>
                <div className='innerNavDiv5'>
                    <CloseIcon className='close-icon-Nav' />
                </div>

                <div className='innerNavDiv6'>
                    {links.map((link, index) => (
                        <NavLink key={index} to={link.to}>{link.icon}{link.label}</NavLink>
                    ))}
                </div>
            </div>

            <div className='outerNavDiv1'>

                <div className='innerNavDiv1'>
                    <p>Logo</p>
                </div>
                <div className='sideBar-profile-container' >
                    <p className='profile-details-smaller'>
                        {!isLoggedIn ? (
                            <NavLink to="/auth"><span className='login-small'><LoginIcon style={{ color: '#d4af37' }} />Login</span></NavLink>
                        ) : (
                            <div className='user-details'>
                                <div id='user-Logo'>{username?.charAt(0)?.toUpperCase()}</div>
                                <ArrowDropDownIcon style={{ color: "#fff" }} />
                                <div className='user-options'>
                                    <span style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}>
                                        <Avatar src="/broken-image.jpg" />
                                        <p>Profile</p>
                                    </span>
                                    <span id='logout-button-details'>
                                        <LockOpenIcon style={{ color: "#ff4d4d" }} />
                                        <p onClick={handleLogout} className="logout-btn">Logout</p>
                                    </span>
                                </div>
                            </div>
                        )}
                    </p>
                    <div className='innerNavDiv2'>
                        {links.map((link, index) => (
                            <NavLink key={index} to={link.to}>{link.icon}{link.label}</NavLink>
                        ))}
                        {!isLoggedIn ? (
                            <NavLink to="/auth"><LoginIcon style={{ color: '#d4af37' }} />Login</NavLink>
                        ) : (
                            <div className='user-details'>
                                <div id='user-Logo'>{username?.charAt(0)?.toUpperCase()}</div>
                                <ArrowDropDownIcon style={{ color: "#fff" }} />
                                <div className='user-options'>
                                    <span style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}>
                                        <Avatar src="/broken-image.jpg" />
                                        <p>Profile</p>
                                    </span>
                                    <span id='logout-button-details'>
                                        <LockOpenIcon style={{ color: "#ff4d4d" }} />
                                        <p onClick={handleLogout} className="logout-btn">Logout</p>
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={`innerNavDiv3 ${hasInteracted ? (isSidemenuOpen ? 'openBarIcon' : 'closeBarIcon') : ''}`} onClick={toggleMenu}>
                        <MenuIcon />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;