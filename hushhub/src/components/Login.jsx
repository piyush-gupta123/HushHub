import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import { useDispatch } from "react-redux"
import authActions from "../redux";

function Login() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  function nagigateToOtp() {
    if (email) {
      const data = axios
        .post("https://hush-hub-api.vercel.app/forgotPassword", {
          email: email,
        })
        .then(() => <ForgotPassword />)
        .catch((err) => console.log(err));
      return;
    }
    return alert("Please enter your email");
  }

  const onResReceived = (data)=>{
    // if(isSignUp){
    //   localStorage.setItem("userId",data.user.token)
    // }
    // else{
    //   localStorage.setItem("userId",data.)
    // }

    dispatch(authActions.login())
    navigate('/')
  }

  const handleChange = (e) => {
    // e.preventDefault()
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(inputs)
      const response = await axios
        .post(`https://hush-hub-api.vercel.app/user/signin/`, {
          email: inputs.email,
          password: inputs.password,
        })
        .then(onResReceived)
        .catch((err) => {
          console.log(err);
        });

      // if (response.status !== 200 && response.status !== 201) {
      //   return console.log("Unable To Authenticate");
      // }

      // const resData = await response.data;
      // // console.log(resData)
      // return resData;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Sample image"
              />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form>
                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center text-2xl font-bold mx-4 mb-0">
                    SIGN IN
                  </p>
                </div>

                <div className="mb-6">
                  <input
                    type="email"
                    name="email"
                    value={inputs.email}
                    onChange={handleChange}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="UserEmail"
                    placeholder="Email address"
                    required
                  />
                </div>

                <div className="mb-6">
                  <input
                    type="password"
                    name="password"
                    value={inputs.password}
                    onChange={handleChange}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="UserPassword"
                    placeholder="Password"
                  />
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      id="exampleCheck2"
                    />
                    <label
                      className="form-check-label inline-block text-gray-800"
                      htmlFor="exampleCheck2"
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href="/forgotPassword"
                    onClick={() => nagigateToOtp()}
                    className="text-gray-800"
                  >
                    Forgot password?
                  </a>
                </div>

                <div className="text-center lg:text-left">
                  <button
                    type="button"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Don't have an account?
                    <a
                      href="/signup"
                      className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                    >
                      Register
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
