// src/WelcomeScreen.js
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import PokeApiLogo from './PokeApiLogo';

/**
 * Pokemon slider component.
 * Allows users to swipe through Pokémon and like or dislike them.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isDarkMode - Whether dark mode is enabled.
 * @param {Function} props.toggleDarkMode - Function to toggle dark mode.
 * @param {Function} props.addLikedPokemon - Function to add a liked Pokémon.
 * @returns {JSX.Element} The JSX element for the pokemon slider.
 */
const PokemonSlider = ({ isDarkMode, toggleDarkMode, addLikedPokemon }) => {

    const [pokemonList, setPokemonList] = useState([]);
    const [currentPokemonIndex, setCurrentPokemonIndex] = useState(1);
    const [currentPokemon, setCurrentPokemon] = useState(null);
    const navigate = useNavigate();

    // Fetch list of Pokémon from PokeAPI
    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');
                setPokemonList(response.data.results);
            } catch (error) {
                console.error('Error fetching Pokémon list', error);
            }
        };

        fetchPokemonList();
    }, []);
    /**
     * @function handleLike() : handler for liking the pokemon.
     */
    const handleLike = () => {
        if (currentPokemon) {
            addLikedPokemon(currentPokemon);
        }
        setCurrentPokemonIndex((prevIndex) => (prevIndex + 1) % pokemonList.length);
    };
    /**
        * @function handleDislike() : handler for DIsliking the pokemon.
        */
    const handleDislike = () => {
        setCurrentPokemonIndex((prevIndex) => (prevIndex + 1) % pokemonList.length);
    };
    const abilitiesFirstHalf = currentPokemon ? currentPokemon.abilities.slice(0, Math.ceil(currentPokemon.abilities.length / 2)) : [];
    const abilitiesSecondHalf = currentPokemon ? currentPokemon.abilities.slice(Math.ceil(currentPokemon.abilities.length / 2)) : [];

    // Fetch details of the current Pokémon
    useEffect(() => {
        const fetchPokemonDetails = async () => {
            if (pokemonList.length > 0) {
                try {
                    const response = await axios.get(pokemonList[currentPokemonIndex].url);
                    setCurrentPokemon(response.data);
                } catch (error) {
                    console.error('Error fetching Pokémon details', error);
                }
            }
        };

        fetchPokemonDetails();
    }, [pokemonList, currentPokemonIndex]);

    return (
        <>

            <div className={`pokemon-slider ${isDarkMode ? 'dark' : 'light'}`}>
                <PokeApiLogo />
                {currentPokemon ? (
                    <div className='card-container'>
                        <div className="pokemon-card">
                            <div className="toggle-container">
                                <label className="switch">
                                    <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
                                    <span className="slider round"></span>
                                </label>
                                <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
                            </div>
                            <img src={currentPokemon.sprites.front_default} alt={currentPokemon.name} />
                            <h2>{currentPokemon.name.toUpperCase()}</h2>
                            <div className="abilities">
                                <div className="abilities-half yellow">
                                    <ul>
                                        {abilitiesFirstHalf.map((ability) => (
                                            <li key={ability.ability.name}>{ability.ability.name}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="abilities-half red">
                                    <ul>
                                        {abilitiesSecondHalf.map((ability) => (
                                            <li key={ability.ability.name}>{ability.ability.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="buttons">
                                <button className="likeButton" onClick={handleLike}>Like</button>
                                <button className="dislikeButton" onClick={handleDislike}>Dislike</button>
                            </div>
                            <button onClick={() => navigate("/likedPokemon")}>View Liked Pokémon</button>
                        </div>
                        <div className="card overlapping-card1"></div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    );
};

export default PokemonSlider;
