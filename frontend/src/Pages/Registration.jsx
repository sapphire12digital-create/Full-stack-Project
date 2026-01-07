import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import google from "../assets/google.png";
import { IoMdEye } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { authDataContext } from "../context/authContext";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/Firebase";

function Registration() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { serverUrl, setUser, setIsLoggedIn } =
    useContext(authDataContext);

  const navigate = useNavigate();

  /* ======================
     EMAIL / PASSWORD SIGNUP
  ====================== */
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        serverUrl + "/api/auth/register",
        { name, email, password },
        { withCredentials: true }
      );

      setUser(res.data);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.error("Register error:", error.response?.data || error);
    }
  };

  

  
 const googleSignup = async () => {
  try {
    const response = await signInWithPopup(auth, provider);

    const user = response.user;
    const name = user.displayName;
    const email = user.email;

    const res = await axios.post(
      serverUrl + "/api/auth/googleLogin", // ✅ fixed case
      { name, email },
      { withCredentials: true }
    );

    console.log(res.data); // ✅ fixed variable

    setUser(res.data);     // ✅ update context
    setIsLoggedIn(true);
    navigate("/");

  } catch (error) {
    console.error("Google signup error:", error);
  }
};


  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-b from-[#141414] to-[#0c2025] text-white flex flex-col items-center">
      
      {/* HEADER */}
      <div
        className="w-full h-[80px] flex items-center px-[30px] gap-[10px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img className="w-[40px]" src={Logo} alt="Logo" />
        <h1 className="text-[22px] font-sans">OneCart</h1>
      </div>

      {/* TITLE */}
      <div className="w-full h-[100px] flex flex-col items-center justify-center gap-[10px]">
        <span className="text-[25px] font-semibold">Registration Page</span>
        <span className="text-[16px]">
          Welcome to OneCart, place your order
        </span>
      </div>

      {/* CARD */}
      <div className="max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center">
        <form
          onSubmit={handleSignup}
          className="w-[90%] h-[90%] flex flex-col gap-[20px]"
        >
          {/* GOOGLE */}
          <div
            onClick={googleSignup}
            className="w-full h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] cursor-pointer"
          >
            <img src={google} alt="Google" className="w-[20px]" />
            Registration with Google
          </div>

          {/* OR */}
          <div className="flex items-center gap-[10px]">
            <div className="flex-1 h-[1px] bg-[#96969635]" />
            OR
            <div className="flex-1 h-[1px] bg-[#96969635]" />
          </div>

          {/* INPUTS */}
          <div className="flex flex-col gap-[15px] relative">
            <input
              type="text"
              placeholder="Username"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-style"
            />

            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-style"
            />

            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-style"
            />

            {!show ? (
              <IoMdEye
                className="eye-icon"
                onClick={() => setShow(true)}
              />
            ) : (
              <IoEye
                className="eye-icon"
                onClick={() => setShow(false)}
              />
            )}

            <button className="w-full h-[50px] bg-[#6060f5] rounded-lg mt-[20px] text-[17px] font-semibold">
              Create Account
            </button>

            <p className="flex gap-[10px] justify-center">
              Already have an account?
              <span
                className="text-[#5555f6cf] font-semibold cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
