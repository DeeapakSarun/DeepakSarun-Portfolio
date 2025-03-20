import React, { useEffect, useState } from 'react';
import '../styles/Pages/Landing.css';

const Landing = () => {
    const [showLanding, setShowLanding] = useState(true);

    const instagram = "Instagram".split('');
    const portfolio = "Portfolio".split('');

    useEffect(() => {
        const timer = setTimeout(() => setShowLanding(false), 6000); // Full animation time
        return () => clearTimeout(timer);
    }, []);

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