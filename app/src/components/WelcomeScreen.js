
import React from 'react';
import { useNavigate } from "react-router-dom";
import PokeApiLogo from "../components/PokeApiLogo.js"
/**
 * Welcome screen component.
 * Displays instructions and allows users to start the game.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isDarkMode - Whether dark mode is enabled.
 * @param {Function} props.toggleDarkMode - Function to toggle dark mode.
 * @returns {JSX.Element} The JSX element for the welcome screen.
 */
const WelcomeScreen = ({ isDarkMode, toggleDarkMode }) => {
    const navigate = useNavigate();
    return (
        <div className={`welcome-screen ${isDarkMode ? 'dark' : 'light'}`}>
            <PokeApiLogo />
            <div className='card-container'>
                <div className="card">
                    <div className="toggle-container">
                        <label className="switch">
                            <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
                            <span className="slider round"></span>
                        </label>
                        <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
                    </div>
                    <h1>How to Play PokeSwipe</h1>
                    <p>Pokemon Appear One At a Time</p>
                    <p>Choose "Like" or "Dislike"</p>
                    <p>Build Your Favorite Team</p>
                    <button onClick={() => navigate("/slider")}>Let's Go</button>
                </div>
                <div className="card overlapping-card1"></div>
            </div>
        </div>
    );
};

export default WelcomeScreen;
