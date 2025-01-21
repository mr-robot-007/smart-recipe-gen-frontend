import React, { useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { IoFastFood } from "react-icons/io5";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";


export default function Header() {
    const navigate = useNavigate();
    const {user,setUser} = useContext(UserContext);
    if(user==null)
    {
        navigate('/login');
    }
    function handleLogout() {
        localStorage.removeItem('access_token');
        setUser(null);
        toast.success('Logged Out!.')
        navigate('/login');
    }
  return (
    <header className=" border-b-2 p-5">
      <div className="flex justify-between">
        <div className="flex  gap-2 items-center" onClick={()=>navigate('/')}>
          <IoFastFood />
          <h1 className=" font-semibold">Recipe Finder</h1>
        </div>
        <div className="flex gap-2 text-[1.5rem] items-center">
          {/* <CiSearch /> */}
          <div className="flex gap-1 rounded-md bg-gray-200 p-1">
            <RiAccountCircleFill />
            <span className="text-sm">{user?.username}</span>
          </div>
          <IoIosLogOut onClick={handleLogout} />

        </div>
      </div>
    </header>
  );
}
