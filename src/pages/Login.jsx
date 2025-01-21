import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoFastFood } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export default function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {user,setUser} = useContext(UserContext);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);
      const email = data.email;
      const password = data.password;
      const result = await axios.post(`${backendUrl}/user/login`, {
        email,
        password,
      });
      console.log(result);
      localStorage.setItem('access_token',result.data.token);
      setUser({"id":result.data.id, "username":result.data.username})

      toast.success('Login successfull.');

      navigate('/');
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        toast.error(error.response.data.message);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-dvh flex">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <IoFastFood /> <h1> Recipe Finder</h1>
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login to your account
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  id="email"
                  className={`bg-gray-50 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="name@company.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  type="password"
                  id="password"
                  className={`bg-gray-50 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Dont have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
