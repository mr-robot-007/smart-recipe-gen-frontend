import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Recipes({loading,allRecipes}) {
    const navigate = useNavigate();
    function handleClick(id) {
        navigate('/recipe/'+id);
      }
  return (
    <>
       {loading ? 'Loading...' : (
            allRecipes.length ? (allRecipes?.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleClick(item.id)}
                  className="flex flex-col flex-wrap gap-3 max-w-40 md:max-w-48 hover:bg-gray-200 p-3 rounded-md transition-shadow shadow-md"
                >
                  <img
                    src={item.image}
                    className="rounded-xl h-40 w-40 md:h-48 md:w-48 object-cover"
                    alt={item.name}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium text-sm text-wrap text-gray-800">
                      {item.name.substring(0, 30)}
                    </span>
                    <span className="text-xs text-gray-600">
                      {item.veg ? "Veg" : "Non-Veg"} | Time: {item.cooking_time} mins
                    </span>
                    <span className="text-xs text-gray-600">
                      Difficulty: {item.difficulty}
                    </span>
                  </div>
                </div>
              ))) : 'No recipes found'
          ) }
    </>
  )
}
