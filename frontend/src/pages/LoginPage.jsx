import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStoreContext } from "../StoreContext/StoreContext";
import {useNavigate} from "react-router-dom";


const LoginPage = () => {
  const [currState, setCurrState] = useState("Login");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });

  const { url, setToken } = useStoreContext(); // Use the custom hook to get the URL
  const navigate = useNavigate(); //Initialize useHistory for redirection

  useEffect(() => {
    //Check if a token is already available
    const token = localStorage.getItem('token');
    if(token) {
      //Redirect to dashboard if token exists
      navigate('/dashboard');
    }
  },[navigate]); //Dependency on navigate to avoid unnecessary re-renders

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let newURL = url;
    if (currState === "Login") {
      newURL += "/api/user/login";
    } else {
      newURL += "/api/user/register";
    }

    try {
      const response = await axios.post(newURL, formData);

      // Save token to browser
      if (response.data.success) {
        //Save token to the browser storage
        localStorage.setItem("token", response.data.token);

        //Redirect to dashboard
         navigate("/dashboard");

         console.log(response.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error during login or registration", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <form
          onSubmit={onLogin}
          className="relative bg-white rounded-lg shadow-lg max-w-md w-full p-6 space-y-6 animate-fadeIn m-4 sm:mx-6"
        >
          <h2 className="text-lg font-semibold text-gray-700">{`User ${currState}`}</h2>
          {currState === 'Sign Up' && (
            <div>
            <input
              name="name"
              onChange={handleChange}
              value={formData.name}
              type="text"
              placeholder="Your Name"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          )}
          
          <div>
            <input
              name="email"
              onChange={handleChange}
              value={formData.email}
              type="email"
              placeholder="Email"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>
            <div>
            <input
              name="password"
              onChange={handleChange}
              value={formData.password}
              type="password"
              placeholder="Password"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>
            <div>

            {currState === "Sign Up" && (
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleChange}
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleChange}
                  />
                  <span>Female</span>
                </label>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-orange-400 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {currState === "Login" ? "Login" : "Create account"}
          </button>

          <div className="flex items-center text-gray-500 text-xs">
            <input type="checkbox" required className="mr-2" />
            <p>By Continuing, I agree to the terms of use & privacy policy.</p>
          </div>

          {currState === "Login" ? (
            <p className="text-center text-sm text-gray-600">
              Create a new account?{" "}
              <span
                onClick={() => setCurrState("Sign Up")}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Click here
              </span>
            </p>
          ) : (
            <p className="text-center text-sm text-gray-600">
              {" "}
              Already have an account?{""}{" "}
              <span
                onClick={() => setCurrState("Login")}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Login here
              </span>
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default LoginPage;
