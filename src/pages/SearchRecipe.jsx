import React, { useState, useRef, useEffect, useContext } from "react";
import makeAnimated from "react-select/animated";
import Creatable, { useCreatable } from "react-select/creatable";
import TakePhoto from "../components/TakePhoto";
import SelectFromPhotos from "../components/SelectFromPhotos";
import SearchResults from "../components/SearchResults";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import SmallLoader from "../components/SmallLoader";
import { RecipeContext } from "../Context/RecipeContext";
// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];

export default function SearchRecipe() {
  const [ing, setIng] = useState([]);
  const { recipes, setRecipes, ingredients, setIngredients,searchResults, setSearchResults } =
    useContext(RecipeContext);
  const [options, setOptions] = useState([]);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    async function fetchRecipes() {
      try {
        setLoading(true);
        const result = await axios.get(
          `${backendUrl}/recipes/ingredients`,
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        // console.log(result.data);
        const flattendedData = result.data.map((ing) => ({
          value: ing,
          label: ing,
        }));
        setOptions(flattendedData);
        console.log(flattendedData);
      } catch (error) {
        toast.error(error.response.data.message);
        if (error.status == 401) {
          navigate("/login");
        }
      }
      setLoading(false);
    }
    fetchRecipes();
  }, [navigate,backendUrl]);

  const handleChange = (options) => {
    const optionValues = options.map((option) => option.value);
    setIng(optionValues);
  };

  async function handleSubmit() {
    try {
      setLoading(true);
      const result = await axios.post(
        `${backendUrl}/recipes/findrecipe`,
        { ingredients: ing },
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      );
      if (result.data.recipes.length) {
        console.log(result.data);
        setSearchResults(true);
        setIngredients(result.data.ingredientList);
        setRecipes(result.data.recipes);
      } else {
        toast.error("No recipes found.");
      }
    } catch (error) {
      toast.error(error.response);
      if (error.status == 401) {
        navigate("/login");
      }
    }
    setLoading(false);
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col items-center gap-4">
          <span className=" text-xl font-medium">Whats in your kitchen?</span>
          <Creatable
            onChange={handleChange}
            options={options}
            isMulti
            makeAnimated
            className="w-full"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-orange-500 w-full sm:w-auto  p-2 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Find recipes
          </button>
        </div>
        <div className="flex flex-col items-center gap-4 mt-4">
          <span className="font-medium text-2xl">or</span>
          <span className=" text-xl font-medium">
            Upload a photo of your ingredients
          </span>
          {/* <img
            src="./searchimage.png"
            alt="ingredients_img"
            className=" rounded-3xl  object-contain"
          /> */}
          <p className=" text-xl ">
            Make sure the image is clear and shows all the ingredients
          </p>
          {/* <TakePhoto/> */}
          <SelectFromPhotos
            setSearchResults={setSearchResults}
            setIngredients={setIngredients}
            setRecipes={setRecipes}
            setLoading={setLoading}
            loading={loading}
            setIng = {setIng}
          />
        </div>
      </div>
      {loading ? (
        <SmallLoader />
      ) : searchResults ? (
        <SearchResults recipes={recipes} ingredients={ingredients} />
      ) : null}
    </>
  );
}
