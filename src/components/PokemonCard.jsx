import React from 'react';
import { FaHeartbeat, FaBolt, FaShieldAlt } from 'react-icons/fa';

const PokemonCard = ({ pokemon, onAdd }) => {
  return (
    <div className="bg-neutral-800 text-neutral-100 rounded-md shadow-md p-4 flex flex-col items-center">
      <img src={pokemon.image} alt={pokemon.name} className="w-20 h-20 mb-2" />
      <h2 className="text-sm font-semibold mb-1">{pokemon.name}</h2>
      <p className="text-xs text-neutral-300">{pokemon.types.join(', ')}</p>
      <div className="flex gap-2 mt-2 text-xs text-neutral-300">
        <div className="flex items-center gap-1">
          <FaHeartbeat className="text-red-500" /> {pokemon.hp}
        </div>
        <div className="flex items-center gap-1">
          <FaBolt className="text-yellow-500" /> {pokemon.attack}
        </div>
        <div className="flex items-center gap-1">
          <FaShieldAlt className="text-blue-500" /> {pokemon.defense}
        </div>
      </div>
      <div className="mt-2 text-xs text-neutral-300">
        <strong>Price:</strong> ${pokemon.price}
      </div>
      <button
        onClick={() => onAdd(pokemon)}
        className="mt-3 bg-neutral-800 border-[1px] border-white text-neutral-100 px-3 py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default PokemonCard;
