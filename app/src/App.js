// Import necessary modules and components
import React, { useState } from 'react';
import './App.css';
import WelcomeScreen from './components/WelcomeScreen.js';
import PokeApiLogo from './components/PokeApiLogo.js';
import PokemonSlider from './components/PokemonSlider.js';
import LikedPokemon from './components/LikedPokemon.js';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

/**
 * Main component of the application.
 * Manages the routing and state for dark mode and liked Pokémon.
 *
 * @returns {JSX.Element} The JSX element for the main component.
 */

function App() {

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [likedPokemon, setLikedPokemon] = useState([]);
  /**
    * @function toggleDarkMode() : a function to handle the dark and light mode toggle.
    */
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  /**
   * 
   * @param {*} pokemon : a pokemon object 
   * @function addLikedPokemon(): function receiving pokemon object as the argument 
   * and setting the state for the likes pokemons.
   */
  const addLikedPokemon = (pokemon) => {
    if (!likedPokemon.some((p) => p.id === pokemon.id)) {
      setLikedPokemon([...likedPokemon, pokemon]);
    }
  };

  return (
    <>
      <BrowserRouter>
        <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
          <Routes>
            <Route
              exact
              path="/"
              element={<WelcomeScreen isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
            />
            <Route
              exact
              path="/slider"
              element={<PokemonSlider isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} addLikedPokemon={addLikedPokemon} />}
            />
            <Route
              exact
              path="/likedPokemon"
              element={<LikedPokemon likedPokemon={likedPokemon} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
