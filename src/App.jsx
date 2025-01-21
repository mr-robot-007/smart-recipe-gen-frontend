import { createContext, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Applayout from "./ui/Applayout";
import Dashboard from "./pages/Dashboard";
import SearchRecipe from "./pages/SearchRecipe";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Recipe from "./pages/Recipe";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import { RecipeContext } from "./Context/RecipeContext";
import { UserContext } from "./Context/UserContext";

function App() {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const [searchResults, setSearchResults] = useState(false);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <>
      <Toaster />
      <UserContext.Provider value={{ user, setUser }}>
        <RecipeContext.Provider
          value={{
            recipes,
            setRecipes,
            ingredients,
            setIngredients,
            searchResults,
            setSearchResults,
          }}
        >
          <BrowserRouter>
            <Routes>
              <Route element={<Applayout />}>
                <Route index element={<Navigate replace to="/dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />

                <Route path="searchrecipe" element={<SearchRecipe />} />
                <Route path="recipe/:id" element={<Recipe />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </RecipeContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
