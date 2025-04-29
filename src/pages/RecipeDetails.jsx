import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const apiUrl = "https://recepie-book-be-2.onrender.com";
  useEffect(() => {
    axios
      .get(`${apiUrl}/api/recipes/${id}`)
      .then((response) => {
        setRecipe(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recipe:", error);
      });
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this recipe?");
    if (!confirm) return;

    try {
      await axios.delete(`${apiUrl}/api/recipes/${id}`);
      alert("Recipe deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Failed to delete recipe:", error);
      alert("Failed to delete the recipe.");
    }
  };

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-6">
      <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
      
      <img
        src={`${recipe.image}`}  // assuming local static folder
        alt={recipe.title}
        className="w-full h-64 object-cover rounded mb-4"
        onError={(e) => e.target.src = "https://via.placeholder.com/400x300?text=No+Image"}
      />

      <p className="mb-2"><strong>Category:</strong> {recipe.category}</p>
      <p className="mb-2"><strong>Prep Time:</strong> {recipe.prepTime} mins</p>
      <p className="mb-2"><strong>Cook Time:</strong> {recipe.cookTime} mins</p>
      <p className="mb-2"><strong>Servings:</strong> {recipe.servings}</p>

      <h2 className="text-xl font-semibold mt-4 mb-2">Ingredients:</h2>
      <ul className="mb-4 list-disc list-inside">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-2">Instructions:</h2>
      <p className="mb-4">{recipe.instructions}</p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={() => navigate(`/edit/${id}`)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default RecipeDetails;
