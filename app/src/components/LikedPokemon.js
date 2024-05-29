
import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Card, CardMedia, CardContent, Typography } from '@mui/material';
import PokeApiLogo from './PokeApiLogo';
import { useNavigate } from 'react-router-dom';

/**
 * Component to display liked Pokémon in a grid layout.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.likedPokemon - Array of liked Pokémon objects.
 * @param {boolean} props.isDarkMode - Whether dark mode is enabled.
 * @param {Function} props.toggleDarkMode - Function to toggle dark mode.
 * @returns {JSX.Element} The JSX element for the liked Pokémon grid.
 */

const LikedPokemonGrid = ({ likedPokemon, isDarkMode, toggleDarkMode }) => {
    const navigate = useNavigate();
    return (
        <div className={`liked-pokemon-grid ${isDarkMode ? 'dark' : 'light'}`}>
            <PokeApiLogo />
            <div className="toggle-container">
                <label className="switch">
                    <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
                    <span className="slider round"></span>
                </label>
                <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
            </div>
            {
                likedPokemon.length > 0 ? (<Box sx={{ flexGrow: 1, padding: 2, width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
                    <Grid container spacing={2} justifyContent="center">
                        {likedPokemon.map((pokemon) => (
                            <Grid item xs={12} sm={6} md={4} key={pokemon.id}>
                                <Card sx={{ backgroundColor: isDarkMode ? '#444' : '#fff' }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={pokemon.sprites.front_default}
                                        alt={pokemon.name}
                                        sx={{ objectFit: 'contain' }} //
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {pokemon.name}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>) : (<Typography variant="h5">Oops! No liked Pokémon :(</Typography>)

            }
            <button className='linkText' onClick={() => navigate("/slider")}>
                Back to Pokemon Slider
            </button>
            <button className='linkText' onClick={() => navigate("/")}>
                Home
            </button>


        </div>
    );
};

export default LikedPokemonGrid;

