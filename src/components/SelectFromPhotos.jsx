import axios from "axios";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SelectFromPhotos({
  setSearchResults,
  setIngredients,
  setRecipes,
  setLoading,
  loading,
  setIng,
}) {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 1024 * 1024) {
      // Check if file size is less than or equal to 1 MB
      console.log(file);
      try {
        setLoading(true);
        setIng([]);
        const formData = new FormData();
        formData.append("image", file);

        const result = await axios.post(
          `${backendUrl}/recipes/findrecipe`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        if (result.data.recipes.length) {
          console.log(result.data.recipes.length);
          setSearchResults(true);
          setIngredients(result.data.ingredientList);
          setRecipes(result.data.recipes);
        } else {
          toast.error("No recipes found.");
        }
      } catch (error) {
        toast.error(error.response.data.message);
        if (error.status == 401) {
          navigate("/login");
        }
      }
      setLoading(false);
    } else {
      alert("Please select a file smaller than 1 MB.");
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  return (
    <>
      <input
        ref={fileInputRef}
        className="hidden"
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={handleFileChange}
      />
      <button
        className="bg-gray-100 w-full sm:w-auto p-2 font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleButtonClick}
        disabled={loading}
      >
        Select from photos
      </button>
    </>
  );
}
