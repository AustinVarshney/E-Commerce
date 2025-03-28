import CloseIcon from '@mui/icons-material/Close';
import ContactsIcon from '@mui/icons-material/Contacts';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React, { useState } from 'react';
import { NavLink } from 'react-router';
import './Navbar.scss';

const Navbar = () => {
    const [isSidemenuOpen, setIsSidemenuOpen] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    let isOpen = () => {
        setIsSidemenuOpen(!isSidemenuOpen);
        setHasInteracted(true);
    }

    return (
        <div id="outer-container">
            <div className='outerNavDiv1'>
                <div className='innerNavDiv1'>
                    <p>Logo</p>
                </div>
                <div className='innerNavDiv2'>
                    <NavLink to="/"><HomeIcon style={{ color: '#d4af37' }} />Home</NavLink>
                    <NavLink to=""><ShoppingCartIcon style={{ color: '#d4af37' }} />Shop</NavLink>
                    <NavLink to=""><ContactsIcon style={{ color: '#d4af37' }} />Contact</NavLink>
                    <NavLink to=""><FavoriteIcon style={{ color: '#d4af37' }} />WishList</NavLink>
                    <NavLink to="/auth"><LoginIcon style={{ color: '#d4af37' }} />Login</NavLink>
                </div>

                <div className={`innerNavDiv3 ${hasInteracted ? (isSidemenuOpen ? 'openBarIcon' : 'closeBarIcon') : ''}`} onClick={isOpen}>
                    <MenuIcon />
                </div>

                <div className={`innerNavDiv4 ${hasInteracted ? (isSidemenuOpen ? 'openSideBar' : 'closeSideBar') : ''}`} onClick={isOpen} style={hasInteracted ? {} : {}}>
                    <div className='innerNavDiv5'>
                        <CloseIcon />
                    </div>
                    <div className='innerNavDiv6'>
                        <NavLink to=""><HomeIcon style={{ color: '#ff5722' }} />Home</NavLink>
                        <NavLink to=""><ShoppingCartIcon style={{ color: '#727272' }} />Shop</NavLink>
                        <NavLink to=""><ContactsIcon style={{ color: 'blue' }} />Contact</NavLink>
                        <NavLink to=""><FavoriteIcon style={{ color: '#fd00ff6b' }} />WishList</NavLink>
                        <NavLink to="/auth"><LoginIcon style={{ color: '#036207' }} />Login</NavLink>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Navbar
