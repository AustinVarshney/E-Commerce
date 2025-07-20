import { NavLink } from 'react-router-dom';
import Administrator_Male from '../../src/assets/Navbar_assets/Administrator_Male.png';
import Box from '../../src/assets/Navbar_assets/Box.png';
import Customer from '../../src/assets/Navbar_assets/customer.png';
import dropDown from '../../src/assets/Navbar_assets/dropDown.png';
import Home from '../../src/assets/Navbar_assets/Home.png';
import inTransit from '../../src/assets/Navbar_assets/in_Transit.png';
import navbar_logo from '../../src/assets/Navbar_assets/navbar-logo.svg';
import PurchaseOrder from '../../src/assets/Navbar_assets/Purchase_Order.png';
import Settings from '../../src/assets/Navbar_assets/Settings.png';
import Star from '../../src/assets/Navbar_assets/Star.png';
import './Navbar.css';

function Navbar({isNavOpen}) {
    return (
        <div className={`navbar-container ${isNavOpen ? '' : 'noNavOpen'}`}>
            <div className="navbar-head-container">
                <div className="head-logo">
                    <img src={navbar_logo} alt="" />
                </div>
                <div className="head-container">
                    <div className="e-com-heading">E-Commerce Admin</div>
                    <div className="e-com-dashboard-heading">Dashboard</div>
                </div>
            </div>

            <div className="nav-links">
                <ul>
                    <li>
                        <NavLink to='/'>
                            <img src={Home} alt="" />
                            <p>Dashboard</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink>
                            <img src={PurchaseOrder} alt="" />
                            <p> Orders</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/products'>
                            <img src={Box} alt="" />
                            <p>Products</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink>
                            <img src={Customer} alt="" />
                            <p>Customers</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink>
                            <img src={Star} alt="" />
                            <p>Reviews</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink>
                            <img src={inTransit} alt="" />
                            <p> Shipping</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink>
                            <img src={Settings} alt="" />
                            <p>Settings</p>
                        </NavLink>
                    </li>
                </ul>


            </div>

            <div className="navbar-user-info">
                <img src={Administrator_Male} className='Administrator_Male' alt="" />
                <div>
                    <div>Admin User</div>
                    <div>admin@gmail.com</div>
                </div>
                <img src={dropDown} alt="" />
            </div>
        </div>
    );
}

export default Navbar;