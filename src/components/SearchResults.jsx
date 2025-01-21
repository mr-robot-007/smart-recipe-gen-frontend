import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Recipes from "./Recipes";

// const recentlyViewed = [
//   { image: "./pasta.png", title: "Spaghetti with tomato Sauce" },
//   { image: "./salad.png", title: "Caesar Salad" },
//   { image: "./choco.png", title: "Chocolate cake" },
//   { image: "./pasta.png", title: "Spaghetti with tomato Sauce" },
// ];

const buttons = [
    {
      id: 1,
      label: "Green Circle",
      icon: "🟢",
      color: "border-green-500 text-green-500",
      name: "veg",
    },
    {
      id: 2,
      label: "Red Triangle",
      icon: "🔺",
      color: "border-red-500 text-red-500",
      name: "non-veg",
    },
    { id: 3, label: "Gluten Free", textOnly: true, name: "gluten-free" },
  ];
export default function SearchResults({ recipes, ingredients }) {
  const [selectedButton, setSelectedButton] = useState(null);
  //   const {params} = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    setSearchParams((params) => {
      params.set("sort-by", "difficulty");
      return params;
    });
  }, [setSearchParams]);

  const difficultyOrder = {
    Easy: 1,
    Medium: 2,
    Hard: 3,
  };

  const sortedRecipes = [...recipes]
    .filter((item) => {
      const isVeg = searchParams.get("veg") === "true";
      const isNonVeg = searchParams.get("non-veg") === "true";
      const isGlutenFree = searchParams.get("gluten-free") === "true";
      if (isGlutenFree && item.gluten_free === false) return false; // Filter out 
      if(isVeg && isNonVeg) return true;
      if (isVeg && item.veg !== true) return false; // Filter out non-veg dishes
      if (isNonVeg && item.veg === true) return false; // Filter out veg dishes
      return true; // Include the dish if no filters apply
    })
    .sort((a, b) => {
      const sortBy = searchParams.get("sort-by");
      if (sortBy === "cooking_time") {
        return a.cooking_time - b.cooking_time; // Sort by cooking time
      } else if (sortBy === "difficulty") {
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]; // Sort by difficulty
      }
      return 0; // No sorting if sort-by is not set
    });


  function handleClick(param) {
    // console.log(searchParams.get(param));
    setSearchParams((params) => {
      if (params.has(param)) {
        params.delete(param); // Remove the parameter if it exists
      } else {
        params.set(param, "true"); // Add the parameter with a value
      }
      return params;
    });
  }
  function handleChange(value) {
    // console.log(value);
    setSearchParams((params) => {
      params.set("sort-by", value);
      return params;
    });
  }
  function handleRedirect(id) {
    navigate("/recipe/" + id);
  }

  return (
    <div className="flex flex-col gap-4">
      <span className="font-bold text-xl">Based on your ingredients</span>
      <div>
        <div className="flex gap-3 items-center text-sm flex-wrap mt-2">
          {ingredients?.map((tag, idx) => (
            <span key={idx} className="bg-gray-300 rounded-lg px-2 py-1">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className=" flex gap-2">
        <label htmlFor="sort-by">Sort By</label>
        <select
          id="sort-by"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          onChange={(e) => handleChange(e.target.value)}
        >
          {/* <option value="" defaultValue>Sort By</option> */}
          <option value="difficulty" defaultValue>
            Difficulty
          </option>
          <option value="cooking_time">Cooking Time</option>
        </select>

        {buttons.map((button) => (
          <button
            key={button.id}
            onClick={() => handleClick(button.name)}
            className={`flex items-center justify-center gap-2 px-4 py-1 border rounded-full ${
              searchParams.get(button.name)
                ? `${button.color} bg-gray-300`
                : "border-gray-300 text-gray-700"
            } transition-colors`}
          >
            {button.icon && (
              <span
                className={`text-lg ${
                  searchParams.get(button.name) ? button.color : "text-gray-400"
                }`}
              >
                {button.icon}
              </span>
            )}
            {button.textOnly && (
              <span
                className={`font-medium ${
                  searchParams.get(button.name)
                    ? "text-gray-800"
                    : "text-gray-500"
                }`}
              >
                {button.label}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 md:gap-5 w-full">
      <Recipes loading={false} allRecipes={sortedRecipes}/>
      </div>
    </div>
  );
}
