import { FaHeartbeat, FaBolt, FaShieldAlt } from 'react-icons/fa';

const PokemonCard = ({ pokemon, onAdd }) => {
  const TYPE_COLORS = {
    fire: "bg-red-300", // Slightly darker red for fire
    water: "bg-blue-300", // Slightly darker blue for water
    grass: "bg-green-300", // Slightly darker green for grass
    electric: "bg-yellow-300", // Slightly darker yellow for electric
    ice: "bg-teal-300", // Slightly darker teal for ice
    fighting: "bg-orange-300", // Slightly darker orange for fighting
    poison: "bg-purple-300", // Slightly darker purple for poison
    ground: "bg-yellow-400", // Slightly darker yellow for ground
    flying: "bg-blue-200", // Slightly darker blue for flying
    psychic: "bg-pink-300", // Slightly darker pink for psychic
    bug: "bg-green-300", // Slightly darker green for bug
    rock: "bg-gray-300", // Slightly darker gray for rock
    ghost: "bg-purple-400", // Slightly darker purple for ghost
    dragon: "bg-red-400", // Slightly darker red for dragon
    dark: "bg-gray-400", // Slightly darker gray for dark
    steel: "bg-gray-300", // Slightly darker gray for steel
    fairy: "bg-pink-200", // Slightly darker pink for fairy
    normal: "bg-gray-200", // Slightly darker gray for normal
    stellar: "bg-gray-200", // Slightly darker gray for normal
    unknown: "bg-gray-200", // Slightly darker gray for normal
  
  };

  return (
    <div className="bg-neutral-800 text-neutral-100 rounded-xl shadow-md p-2 flex flex-col items-center">
      <img src={pokemon.image} alt={pokemon.name} className="w-[6.2rem] h-[6.2rem] mb-2" />
      
      <h2 className="text-sm font-semibold mb-1">{pokemon.name}</h2>
      
      <div className="flex gap-2 mb-2">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className={`text-xs text-neutral-950 px-2 py-1 rounded-full ${TYPE_COLORS[type.toLowerCase()] || 'bg-gray-500'}`}
          >
            {type}
          </span>
        ))}
      </div>

      <div className="flex gap-2 text-xs text-neutral-300 mb-2">
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

      <div className="flex justify-between items-center w-full mt-2 text-sm text-neutral-300">
        <span className='ml-2'>
          <strong>Price:</strong> ${pokemon.price}
        </span>
        <button
          onClick={() => onAdd(pokemon)}
          className="bg-neutral-800 border-[1px] border-neutral-400 text-neutral-200 px-3 py-2 mx-2 mb-1 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
