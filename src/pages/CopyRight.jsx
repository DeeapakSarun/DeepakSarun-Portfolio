import React, { useEffect, useState } from 'react';
import '../styles/Pages/CopyRight.css';

const CopyRight = () => {
    const [name, setName] = useState("Deepak Sarun");

    // Array of fonts and languages to cycle through
    const fontsAndLanguages = [
        { text: "Deepak Sarun", font: "'Courier New', monospace", language: "English" }, // Monospace font 1
        { text: "दीपक सरुन", font: "'Dancing Script', cursive", language: "Hindi" },
        { text: "Deepak Sarun", font: "'Poppins', sans-serif", language: "English" }, // Monospace font 2
        { text: "దీపక్ సరున్", font: "'Dancing Script', cursive", language: "Telugu" }, // Telugu
        { text: "Deepak Sarun", font: "'Indie Flower', cursive", language: "English" }, // Monospace font 3
        { text: "தீபக் சருன்", font: "'Indie Flower', cursive", language: "Tamil" }, // Tamil
        { text: "Deepak Sarun", font: "'Shadows Into Light', cursive", language: "English" }, // Monospace font 4
        { text: "迪帕克·萨伦", font: "'Dancing Script', cursive", language: "Chinese" }, // Chinese
        { text: "Deepak Sarun", font: "'Patrick Hand', cursive", language: "English" }, // Serif font as fallback
        { text: "ディーパック・サルン", font: "'Patrick Hand', cursive", language: "Japanese" }, // Japanese
        { text: "Deepak Sarun", font: "'Satisfy', cursive", language: "English" }, // Monospace font 5
        { text: "Дипак Сарун", font: "'Dancing Script', cursive", language: "Russian" }, // Correct Russian
        { text: "Deepak Sarun", font: "'Reenie Beanie', cursive", language: "English" }, // Monospace font 6
        { text: "디팍 사룬", font: "'Reenie Beanie', cursive", language: "Korean" } // Korean
    ];
    
    
    
var currentIndex = 0;
    useEffect(() => {
        const interval = setInterval(() => {
            /*iterate throught the list in order*/
            const index = currentIndex;
            setName(fontsAndLanguages[index]);
            currentIndex++;
            if (currentIndex  == fontsAndLanguages.length ) {
                currentIndex = 0;
            }
        }, 500); // Change every 500ms

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="copyright-page">
            <div className="content">
                <div className="profile">
                    <img src="/assets/profile.jpg" alt="Profile" className="profile-pic" />
                    <h1 
                        className="name"
                        style={{
                            fontFamily: name.font, 
                        }}
                    >
                        {name.text||"Deepak Sarun"}
                    </h1>
                    <div className="socials">
                    <a href="https://github.com/Deeapaksarun" target="_blank" rel="noopener noreferrer" className="social-link">
                        <i className="fab fa-github"></i> GitHub
                    </a>
                    </div>
                </div>
                <p className="tagline">Portfolio inspried by instagram</p>
                <p className="footer">&copy; {new Date().getFullYear()} Deepak Sarun. All rights reserved.</p>
            </div>
        </div>
    );
};

export default CopyRight;
