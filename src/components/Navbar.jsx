import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Components/Navbar.css';
import { Home, MessageCircle,User, Gamepad2} from 'lucide-react'; 
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    if (
        location.pathname === '/Resume' || 
        location.pathname === '/CopyRight') {
        return null;
    } else {
            return (
                <nav className={`navbar `}>
                    <ul className="navbar-links">
                        <li className={location.pathname === '/Feed' ? 'active' : ''}>
                            <Link to="/Feed">
                                <Home />
                            </Link>
                        </li>
                        <li className={location.pathname === '/Message' ? 'active' : ''}>
                            <Link to="/Message">
                                <MessageCircle />
                            </Link>
                        </li>
                        <li className={location.pathname === '/StopForAGame' ? 'active' : ''}>
                            <Link to="/StopForAGame">
                                <Gamepad2 />
                            </Link>
                        </li>
                        <li className={location.pathname === '/' ? 'active' : ''}>
                            <Link to="/">
                                <User />
                            </Link>
                        </li>
                    </ul>
                </nav>
            );
        };
    }
    

export default Navbar;
