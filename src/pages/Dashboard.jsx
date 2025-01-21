import React, { useContext, useEffect, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { RiAccountCircleFill } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Creatable, { useCreatable } from "react-select/creatable";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Recipes from "../components/Recipes";
import { UserContext } from "../Context/UserContext";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const recentlyViewed = [
  { image: "./pasta.png", title: "Spaghetti with tomato Sauce" },
  { image: "./salad.png", title: "Caesar Salad" },
  { image: "./choco.png", title: "Chocolate cake" },
  { image: "./pasta.png", title: "Spaghetti with tomato Sauce" },
];

const tags = ["Chicken", "Pasta", "Salad", "Vegetarian", "Vegan", "Dessert"];

export default function Dashboard() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [recents, setRecents] = useState([]);
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const {user} = useContext(UserContext);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   console.log(import.meta.env.VITE_BACKEND_URL);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        setLoading(true);
        const result = await axios.get(`${backendUrl}/recipes/all`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        console.log(result.data);
        setAllRecipes(result.data);
      } catch (error) {
        toast.error(error.response.data.message);
        if(error.status ==401) 
        {
            navigate('/login');
        }
      }
      setLoading(false);
    }
    fetchRecipes();
  }, [navigate,backendUrl]);
  useEffect(() => {
    async function fetchRecents() {
      try {
        setLoading(true);
        const result = await axios.get(`${backendUrl}/recipes/recent/${user.id}`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        console.log(result.data);
        setRecents(result.data);
      } catch (error) {
        toast.error(error.response?.data.message);
        if(error.status ==401) 
        {
            navigate('/login');
        }
      }
      setLoading(false);
    }
    fetchRecents();
  }, [navigate,user,backendUrl]);

  function handleClick(id) {
    navigate('/recipe/'+id);
  }

  return (
    <div>
      <div
        className=" h-[20rem] md:h-[30rem] flex justify-center rounded-xl"
        style={{
          backgroundImage: `url(./banner.png)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <span className=" text-white font-bold text-3xl text-center">
            Find recipes from your ingredients
          </span>
          <div className="flex items-center flex-wrap gap-2 mt-8">
            {/* <Creatable
              options={options}
              isMulti
              makeAnimated
              className="w-52"
            /> */}
            <button className="bg-orange-500 text-white p-2 font-semibold rounded-lg" onClick={() => navigate('/searchrecipe')}>
              Click Here
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="font-bold text-xl">Browse by popular tags</span>
        <div className="flex gap-3 items-center text-sm flex-wrap">
          {tags.map((tag, idx) => (
            <span key={idx} className="bg-gray-300 rounded-lg px-2 py-1">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-3">
        <span className="font-bold text-xl">Recently Viewed</span>
        <div className="flex flex-wrap gap-2 w-full">
        <Recipes loading={loading} allRecipes={recents}/>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-3">
        <span className="font-bold text-xl">All Recipes</span>
        <div className="flex flex-wrap gap-2 w-full">
            <Recipes loading={loading} allRecipes={allRecipes}/>
        </div>
      </div>
    </div>
  );
}
