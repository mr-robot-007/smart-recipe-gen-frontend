import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { UserContext } from "../Context/UserContext";

const tags = ["egg", "chicken", "spaghetti", "salt"];
const steps = ["egg", "chicken", "spaghetti", "salt"];

export default function Recipe() {
  const { id } = useParams();
  console.log(id);
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    async function fetchRecipes() {
      try {
        setLoading(true);
        const result = await axios.post(
          `${backendUrl}/recipes/recipe/${id}`,
          { user_id: user.id },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        console.log(result.data);
        if (result.data) {
          setRecipe(result.data);
        } else {
          toast.error("Recipe not found");
          navigate(-1);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        if (error.status == 401) {
          navigate("/login");
        }
      }
      setLoading(false);
    }
    fetchRecipes();
  }, [id, navigate, user, backendUrl]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div
            className=" h-[20rem] md:h-[24rem] flex rounded-xl"
            style={{
              backgroundImage: `url(${recipe?.image})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="flex flex-col justify-end p-4 ">
              <span className=" text-white font-bold text-3xl">
                {recipe?.name}
              </span>
            </div>
          </div>
          <div>
            <span className="font-medium text-xl">Ingredients</span>
            <div className="flex gap-3 items-center text-sm flex-wrap mt-2">
              {recipe?.ingredients?.map((tag, idx) => (
                <span key={idx} className="bg-gray-300 rounded-lg px-2 py-1">
                  {tag.ingredient.name}{" "}
                  {tag.optional == true ? "(optional)" : null}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="font-medium text-xl">Cooking Instructions</span>
            <p>{recipe?.steps}</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-medium text-xl">Nutifion Info</span>
            <p>
              <span className="font-medium">1. Calories:</span>{" "}
              {recipe?.nutri_info}{" "}
            </p>
            <p>
              <span className="font-medium">2. Gluten Free:</span>{" "}
              {recipe?.gluten_free == true ? "✅" : "❌"}{" "}
            </p>
            <p>
              <span className="font-medium">3. Vegetarian:</span>{" "}
              {recipe?.veg == true ? "✅" : "❌"}{" "}
            </p>
            <p>
              <span className="font-medium">4. Cooking Time:</span>{" "}
              {recipe?.nutri_info} mins{" "}
            </p>
            <p>
              <span className="font-medium">5. Difficulty:</span>{" "}
              {recipe?.difficulty}{" "}
            </p>
            <hr />
          </div>
        </div>
      )}
    </>
  );
}
