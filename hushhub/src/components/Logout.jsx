import React from "react";
import authActions from "../redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Logout() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userId")
    dispatch(authActions.logout());
    navigate("/");
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl text-black font-bold mb-10">
        Are You sure you want to log out.
      </h2>
      <button
        className="bg-red-500 text-white py-4 px-5 rounded-lg hover:bg-red-600 transition"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
