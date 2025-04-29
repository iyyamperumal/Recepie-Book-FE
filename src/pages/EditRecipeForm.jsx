import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditRecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiUrl = "https://recepie-book-be-2.onrender.com";

  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    image: "",
    ingredients: [],
  });

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/recipes/${id}`)
      .then((res) => {
        setRecipe(res.data);
      })
      .catch((err) => console.error("Error fetching recipe:", err));
  }, [id]);

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleIngredientsChange = (e) => {
    setRecipe({ ...recipe, ingredients: e.target.value.split(",") });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${apiUrl}/api/recipes/${id}`, recipe)
      .then(() => {
        alert("Recipe updated!");
        navigate(`/recipe/${id}`);
      })
      .catch((err) => {
        console.error("Update failed:", err);
        alert("Failed to update the recipe.");
      });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-6">
      <h2 className="text-2xl font-bold mb-4">Edit Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={recipe.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={recipe.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="image"
          value={recipe.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 border rounded"
        />
        <input
          name="ingredients"
          value={recipe.ingredients.join(",")}
          onChange={handleIngredientsChange}
          placeholder="Ingredients (comma separated)"
          className="w-full p-2 border rounded"
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate(`/recipe/${id}`)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipeForm;
