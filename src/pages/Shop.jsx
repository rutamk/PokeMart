import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../components/PokemonCard";
import SkeletonCard from "../components/SkeletonCard";
import Cart from "../components/Cart";
import Navbar from "../components/Navbar";

// Number of Pokémon per page
const ITEMS_PER_PAGE = 12; // Adjusted to fit 4x4 grid

// Define base prices and price multipliers
const BASE_PRICE = 100;
const EVOLUTION_MULTIPLIER = 1.5;

// Define colors for Pokémon types
const TYPE_COLORS = {
   fire: "bg-red-400", // Darker red for fire
  water: "bg-blue-400", // Darker blue for water
  grass: "bg-green-400", // Darker green for grass
  electric: "bg-yellow-400", // Darker yellow for electric
  ice: "bg-teal-400", // Darker teal for ice
  fighting: "bg-orange-400", // Darker orange for fighting
  poison: "bg-purple-400", // Darker purple for poison
  ground: "bg-yellow-500", // Darker yellow for ground
  flying: "bg-blue-300", // Darker blue for flying
  psychic: "bg-pink-400", // Darker pink for psychic
  bug: "bg-green-400", // Darker green for bug
  rock: "bg-gray-400", // Darker gray for rock
  ghost: "bg-purple-500", // Darker purple for ghost
  dragon: "bg-red-500", // Darker red for dragon
  dark: "bg-gray-500", // Darker gray for dark
  steel: "bg-gray-400", // Darker gray for steel
  fairy: "bg-pink-300", // Darker pink for fairy
  normal: "bg-gray-300", // Darker gray for normal
  stellar: "bg-gray-300", // Darker gray for stellar
  unknown: "bg-gray-300", // Darker gray for unknown
};

// Capitalize first letter of a string
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Calculate price based on evolution stage
const calculatePrice = (evolutionStage) => {
  return Math.round(
    BASE_PRICE * Math.pow(EVOLUTION_MULTIPLIER, evolutionStage)
  );
};

const Shop = () => {
  const [pokemons, setPokemons] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedType, setSelectedType] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/type");
        const typeList = response.data.results.map((type) =>
          capitalizeFirstLetter(type.name)
        );
        setTypes(typeList);
      } catch (error) {
        console.error("Error fetching types:", error);
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
        if (selectedType && selectedType !== "all") {          // Fetch Pokémon details for the specific type
          const { pokemon: pokemonList } = response.data;
          pokemonsData = await Promise.all(
            pokemonList.map(async (poke) => {
              const { data } = await axios.get(poke.pokemon.url);
              const evolutionStage = data.species.url.includes("evolution")
                ? 1
                : 0; // Example logic for evolution stage
              return {
                name: capitalizeFirstLetter(data.name),
                image: data.sprites.other["official-artwork"].front_default,
                types: data.types.map((typeInfo) =>
                  capitalizeFirstLetter(typeInfo.type.name)
                ),
                hp: data.stats.find((stat) => stat.stat.name === "hp")
                  .base_stat,
                attack: data.stats.find((stat) => stat.stat.name === "attack")
                  .base_stat,
                defense: data.stats.find((stat) => stat.stat.name === "defense")
                  .base_stat,
                price: calculatePrice(evolutionStage),
              };
            })
          );
        } else {
          // If no type is selected, fetch all Pokémon and filter later
          pokemonsData = await Promise.all(
            response.data.results.map(async (pokemon) => {
              const { data } = await axios.get(pokemon.url);
              const evolutionStage = data.species.url.includes("evolution")
                ? 1
                : 0; // Example logic for evolution stage
              return {
                name: capitalizeFirstLetter(data.name),
                image: data.sprites.other["official-artwork"].front_default,
                types: data.types.map((typeInfo) =>
                  capitalizeFirstLetter(typeInfo.type.name)
                ),
                hp: data.stats.find((stat) => stat.stat.name === "hp")
                  .base_stat,
                attack: data.stats.find((stat) => stat.stat.name === "attack")
                  .base_stat,
                defense: data.stats.find((stat) => stat.stat.name === "defense")
                  .base_stat,
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
        console.error("Error fetching Pokémon data:", error);
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
    setSelectedType(type === "all" ? "" : type); // Reset to show all Pokémon
  };

  const handlePageChange = (direction) => {
    setPage((prevPage) => {
      const newPage = direction === "next" ? prevPage + 1 : prevPage - 1;
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
    <div className="h-screen flex flex-col">
      {/* Fixed Navbar */}
      <div className="fixed w-full top-0 z-10">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex bg-neutral-900 h-full pt-16"> {/* pt-16 to avoid navbar overlap */}
        
        {/* Types Sidebar */}
        <div className="w-[12%] px-5 py-5">
          <h2 className="text-xl font-semibold text-neutral-100 mb-4">Types</h2>

          {/* Scrollable Buttons */}
          <div className="space-y-4 overflow-y-auto max-h-[80%] scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-900">
            <div className="flex flex-col gap-2 mr-3 ">
              {/* "All" Button */}
              <button
                className="w-full text-lg py-2 px-4 bg-gray-700 text-neutral-100 rounded-md hover:bg-gray-600"
                onClick={() => handleTypeChange("all")}
              >
                All
              </button>

              {types.map((type) => (
                <button
                  key={type}
                  className={`w-full text-lg py-2 px-4 rounded-md text-neutral-800 ${
                    TYPE_COLORS[type.toLowerCase()]
                  }`}
                  onClick={() => handleTypeChange(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          {/* Pokémon Grid */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            {loading
              ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))
              : pokemons.map((pokemon) => (
                  <PokemonCard
                    key={pokemon.name}
                    pokemon={pokemon}
                    onAdd={handleAddToCart}
                  />
                ))}
          </div>

          {/* Pagination (Moved to Bottom) */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => handlePageChange("prev")}
              className="bg-gray-800 text-neutral-100 px-4 py-2 rounded disabled:opacity-50"
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="text-neutral-100">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange("next")}
              className="bg-gray-800 text-neutral-100 px-4 py-2 rounded disabled:opacity-50"
              disabled={page === totalPages}
            >
              Next
            </button>
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
    </div>
  );
};

export default Shop;
