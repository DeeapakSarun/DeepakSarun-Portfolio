import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Pages/Landing.css';

const Landing = () => {
    const [showLanding, setShowLanding] = useState(true);
    const navigate = useNavigate();
    const location = useLocation(); // This gives you the current location path
    const currentRoute = sessionStorage.getItem('currentRoute'); // Get the stored route from sessionStorage

    const instagram = "Instagram".split('');
    const portfolio = "Portfolio".split('');

    useEffect(() => {
        // Store the current route in sessionStorage
        sessionStorage.setItem('currentRoute', location.pathname);

        // 
        if (currentRoute === location.pathname || location.pathname === '/') {
            
            const timer = setTimeout(() => {
                setShowLanding(false);
                navigate('/');
                document.body.style.overflow = 'visible'; // Prevent scrolling during animation
                  // Redirect to the home page after the animation
            }, 4200); // Full animation time

            return () => clearTimeout(timer);
        } else {
            setShowLanding(false); // Skip animation if route doesn't match
        }
    });

    return (
        showLanding && (
            <div className="landing-container">
                <div className="word instagram">
                    {instagram.map((letter, index) => (
                        <span
                            key={`insta-${index}`}
                            className={index >= 5 ? 'fade-out' : ''}
                        >
                            {letter}
                        </span>
                    ))}
                </div>

                <div className="word portfolio">
                    {portfolio.map((letter, index) => (
                        <span
                            key={`port-${index}`}
                            className={index < 4 ? 'fade-out' : ''}
                        >
                            {letter}
                        </span>
                    ))}
                </div>

                <div className="author"><span className='by'>By</span> <span className='name'>Deepak Sarun</span></div>
            </div>
        )
    );
};

export default Landing;
