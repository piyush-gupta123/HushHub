import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Add() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const getData = async () => {
    const res = axios
      .post("https://hush-hub-api.vercel.app/secret/create", {
        value: input,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => {
        if (err.response?.status === 400) {
          alert("A user can only share one secret!");
        } 
        else if(err.response?.status === 422){
          alert("Please enter a secret to post!")
        }
        else{
          console.log(err)
        }
      });

    
    // if (res.status !== 200 || res.status !== 201) {
    //   alert("Something Went Wrong. Please Try Again!!");
    // }

    const response = await res.data;

    return response;
  };
  const handleSubmit = () => {
    getData()
      .then(navigate("/"))
      .catch((err) => console.log(err));
  };
  return (
    <div className="max-w-lg mx-auto h-400 p-6 bg-white rounded-md shadow-md">
      <form className="w-[100%] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">
          Enter Your Secret
        </h1>
        <textarea
          type="text"
          rows={5}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full mb-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter your secret.."
        />
        <button
          className="w-[50%] rounded-lg border-2 p-2 bg-blue-400 text-black text-xl font-serif font-semibold hover:focus:105 hover:scale-110"
          onClick={handleSubmit}
        >
          POST
        </button>
      </form>
    </div>
  );
}

export default Add;
