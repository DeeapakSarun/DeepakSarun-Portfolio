import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Components/Header.css';
import LikeButton from './LikeButton';

import { Heart, MessageCircleQuestion, ArrowLeft, Copyright, FileUser } from 'lucide-react';

const Header = () => {
    const location = useLocation();

    const titleMap = {
        '/Message': 'Message',
        '/Resume': 'Resume',
        '/StopForAGame': 'Game Time!',
        '/CopyRight': 'Copyright Info',
        '/Likes': 'Likes'
    };

    // Dynamic back link logic
    const backLink = 
        location.pathname === '/Resume' || location.pathname === '/CopyRight' 
            ? '/' 
            : '/Feed';

    if (location.pathname === '/Feed') {
        return (
            <header className="feedHeader">
                <div className="logo"><span className='instafolio'>Instafolio</span></div>
                    <ul className="icons">
                        <li>
                            <LikeButton />
                        </li>
                        <li>
                            <Link to="/FAQ">
                                <MessageCircleQuestion />
                            </Link>
                        </li>
                    </ul>
            </header>
        );
    }

    if (['/Message', '/Resume', '/StopForAGame', '/CopyRight', '/Likes', '/FAQ'].includes(location.pathname)) {
        return (
            <div className="header">
                {/* Show <Link> or <div> based on pathname */}
                {location.pathname === '/StopForAGame' ? (
                    <div className='icons'></div>  
                ) : (
                    <ul className='icons'>
                        <li>
                            <Link to={backLink}>
                                <ArrowLeft />
                            </Link>
                        </li>
                    </ul>

                )}

                <div className="username">
                    <h2>{titleMap[location.pathname] || ''}</h2>
                </div>

                <div className='icons'></div>
            </div>
        );
    }

    if (location.pathname === '/') {
        return (
            <div className='header'>
                <ul className='icons'>
                    <li>
                        <Link alt="View Resume" to="/Resume">
                            <img src="/assets/resumeicon.gif" alt="resume icon" />
                        </Link>
                    </li>
                </ul>
                <div className="username">
                    <h2>Deepak Sarun</h2>
                </div>
                <ul className='icons'>
                    <li>
                        <Link to="/CopyRight">
                            <Copyright />
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }

    return null;
};

export default Header;
