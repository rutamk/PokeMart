import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';
import SkeletonCard from '../components/SkeletonCard';
import Cart from '../components/Cart';

// Number of Pokémon per page
const ITEMS_PER_PAGE = 12; // Adjusted to fit 4x4 grid

// Define base prices and price multipliers
const BASE_PRICE = 100;
const EVOLUTION_MULTIPLIER = 1.5;

// Define colors for Pokémon types
const TYPE_COLORS = {
  fire: 'bg-red-300',      // Slightly darker red for fire
  water: 'bg-blue-300',    // Slightly darker blue for water
  grass: 'bg-green-300',   // Slightly darker green for grass
  electric: 'bg-yellow-300', // Slightly darker yellow for electric
  ice: 'bg-teal-300',      // Slightly darker teal for ice
  fighting: 'bg-orange-300', // Slightly darker orange for fighting
  poison: 'bg-purple-300', // Slightly darker purple for poison
  ground: 'bg-yellow-400', // Slightly darker yellow for ground
  flying: 'bg-blue-200',   // Slightly darker blue for flying
  psychic: 'bg-pink-300',  // Slightly darker pink for psychic
  bug: 'bg-green-300',     // Slightly darker green for bug
  rock: 'bg-gray-300',     // Slightly darker gray for rock
  ghost: 'bg-purple-400',  // Slightly darker purple for ghost
  dragon: 'bg-red-400',    // Slightly darker red for dragon
  dark: 'bg-gray-400',     // Slightly darker gray for dark
  steel: 'bg-gray-300',    // Slightly darker gray for steel
  fairy: 'bg-pink-200',    // Slightly darker pink for fairy
  normal: 'bg-gray-200',   // Slightly darker gray for normal
};

// Capitalize first letter of a string
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Calculate price based on evolution stage
const calculatePrice = (evolutionStage) => {
  return Math.round(BASE_PRICE * Math.pow(EVOLUTION_MULTIPLIER, evolutionStage));
};

const Shop = () => {
  const [pokemons, setPokemons] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/type');
        const typeList = response.data.results.map(type => capitalizeFirstLetter(type.name));
        setTypes(typeList);
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };

    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        let url = `https://pokeapi.co/api/v2/pokemon?limit=10000`; // Fetch a large number to filter locally
        if (selectedType) {
          url = `https://pokeapi.co/api/v2/type/${selectedType.toLowerCase()}`;
        }
        const response = await axios.get(url);
        
        let pokemonsData = [];
        if (selectedType) {
          // Fetch Pokémon details for the specific type
          const { pokemon: pokemonList } = response.data;
          pokemonsData = await Promise.all(
            pokemonList.map(async (poke) => {
              const { data } = await axios.get(poke.pokemon.url);
              const evolutionStage = data.species.url.includes('evolution') ? 1 : 0; // Example logic for evolution stage
              return {
                name: capitalizeFirstLetter(data.name),
                image: data.sprites.other['official-artwork'].front_default,
                types: data.types.map(typeInfo => capitalizeFirstLetter(typeInfo.type.name)),
                hp: data.stats.find(stat => stat.stat.name === 'hp').base_stat,
                attack: data.stats.find(stat => stat.stat.name === 'attack').base_stat,
                defense: data.stats.find(stat => stat.stat.name === 'defense').base_stat,
                price: calculatePrice(evolutionStage),
              };
            })
          );
        } else {
          // If no type is selected, fetch all Pokémon and filter later
          pokemonsData = await Promise.all(
            response.data.results.map(async (pokemon) => {
              const { data } = await axios.get(pokemon.url);
              const evolutionStage = data.species.url.includes('evolution') ? 1 : 0; // Example logic for evolution stage
              return {
                name: capitalizeFirstLetter(data.name),
                image: data.sprites.other['official-artwork'].front_default,
                types: data.types.map(typeInfo => capitalizeFirstLetter(typeInfo.type.name)),
                hp: data.stats.find(stat => stat.stat.name === 'hp').base_stat,
                attack: data.stats.find(stat => stat.stat.name === 'attack').base_stat,
                defense: data.stats.find(stat => stat.stat.name === 'defense').base_stat,
                price: calculatePrice(evolutionStage),
              };
            })
          );
        }

        // Update state with filtered Pokémon
        setAllPokemons(pokemonsData);
        setTotalPages(Math.ceil(pokemonsData.length / ITEMS_PER_PAGE));
        setPage(1); // Reset to the first page on filter change
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [selectedType]);

  useEffect(() => {
    const displayPokemons = () => {
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      setPokemons(allPokemons.slice(startIndex, endIndex));
    };

    displayPokemons();
  }, [page, allPokemons]);

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handlePageChange = (direction) => {
    setPage((prevPage) => {
      const newPage = direction === 'next' ? prevPage + 1 : prevPage - 1;
      return Math.max(1, Math.min(newPage, totalPages));
    });
  };

  const handleAddToCart = (pokemon) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === pokemon.name);
      if (existingItem) {
        return prevCart.map((item) =>
          item.name === pokemon.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...pokemon, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (pokemon) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === pokemon.name);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          return prevCart.map((item) =>
            item.name === pokemon.name
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          return prevCart.filter((item) => item.name !== pokemon.name);
        }
      }
      return prevCart;
    });
  };

  const handleCheckout = () => {
    alert(`Checkout successful! Total Price: $${total}`);
    setCart([]);
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="flex bg-neutral-900 min-h-screen">
      {/* Types Sidebar */}
      <div className="w-1/6 bg-neutral-900 p-4 rounded-lg shadow-md h-screen overflow-y-auto">
        <h2 className="text-xl font-semibold text-neutral-100 mb-4">Types</h2>
        <div className="flex flex-col gap-2">
          {types.map((type) => (
            <button
              key={type}
              className={`w-full text-lg  py-2 px-4 rounded-md text-neutral-800 ${TYPE_COLORS[type.toLowerCase()]}`}
              onClick={() => handleTypeChange(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Pagination */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => handlePageChange('prev')}
            className="bg-gray-800 text-neutral-100 px-4 py-2 rounded disabled:opacity-50"
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="text-neutral-100">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange('next')}
            className="bg-gray-800 text-neutral-100 px-4 py-2 rounded disabled:opacity-50"
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>

        {/* Pokémon Grid */}
        <div className="grid grid-cols-4 gap-4">
          {loading ? (
            Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : (
            pokemons.map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} onAdd={handleAddToCart} />
            ))
          )}
        </div>
      </div>

      {/* Cart */}
      <div className="w-80 bg-neutral-900 p-4 rounded-lg shadow-md">
        <Cart
          cartItems={cart}
          onAdd={handleAddToCart}
          onRemove={handleRemoveFromCart}
          total={total}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
};

export default Shop;
