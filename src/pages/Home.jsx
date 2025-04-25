import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/recipes", { timeout: 5000 })
      .then((response) => {
        setRecipes(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Unable to fetch recipes from server.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Recipe Book</h1>
        <Link
          to="/add-recipe"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Add New Recipe
        </Link>
      </div>

      {loading && <p className="text-gray-600">Loading recipes...</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {!loading && !error && recipes.length === 0 && (
        <p className="text-gray-500">No recipes found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="bg-white p-4 rounded shadow">
            <img
              src={`${recipe.image}`}
              alt={recipe.title}
              className="w-full h-40 object-cover rounded mb-4"
              onError={(e) => {
                e.target.src = "/images/fallback.jpg";
              }}
            />
            <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
            <Link
              to={`/recipe/${recipe._id}`}
              className="text-blue-600 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
