import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../image/logo.png";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const isInUsersForm = location.pathname === "/create-user" || location.pathname.includes("/edit-user");
    
    const handleButtonClick = () => {
        if (isInUsersForm) {
            navigate("/");
        } else {
            navigate("/create-user");
        }
        closeMenu();
    };

    const buttonText = isInUsersForm ? "Client List" : "+ Add Client";

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="logo-container">
                    <img 
                        src={logo} 
                        alt="Logo" 
                        className="nav-logo"
                    />
                    <button className="logo" onClick={(e) => {
                        e.preventDefault();
                        navigate("/");
                        closeMenu();
                    }}>Client Management</button>
                </div>

                <button
                    className="menu-button"
                    id="menuButton"
                    onClick={toggleMenu}
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? 'X' : '☰'}
                </button>
                
                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="navLinks">
                    <li>
                        <button 
                            className={`action-btn ${isInUsersForm ? 'secondary-btn' : 'primary-btn'}`} 
                            onClick={handleButtonClick}
                        >
                            {buttonText}
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}; 

export default Navbar;