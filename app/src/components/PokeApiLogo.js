import React from 'react';
import PokeApiLogoImage from "../assets/PokeApiLogoImage.png";

const PokeApiLogo = () => {
    return (
        <div className='logo'>
            <img
                src={PokeApiLogoImage}
                alt="pokeApiLogo"
            />
        </div>
    )
}

export default PokeApiLogo