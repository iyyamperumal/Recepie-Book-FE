import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const apiUrl = "https://recepie-book-be-2.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const recipeData = {
      title,
      description,
      ingredients,
      image,
    };
  
    try {
      const response = await fetch(`${apiUrl}/api/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit recipe");
      }
  
      alert("Recipe added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert("Something went wrong while adding the recipe.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-4">
      <h2 className="text-2xl font-bold mb-4">Add New Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Add Form Fields */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="w-full border border-gray-300 px-3 py-2 rounded"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Ingredients (comma-separated)</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            placeholder="Ingredient,etc..."
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            placeholder="Image URL"
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Submit Recipe
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back
        </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;
