import React from 'react';
import PokemonLogo from '../assets/Pokemon.png'; // Adjust the path if necessary

const Navbar = () => {
  return (
    <nav className="bg-neutral-800 py-1 fixed w-full z-10">
      <div className="container mx-auto flex justify-center items-center">
        {/* Pokemon logo image */}
        <img src={PokemonLogo} alt="Pokemon Logo" className="h-14 w-14 mr-2" />
        {/* Title */}
        <h1 className="text-2xl font-bold text-neutral-100">PokéMart</h1>
      </div>
    </nav>
  );
};

export default Navbar;
