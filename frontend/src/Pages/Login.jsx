import React, { useState,useContext } from 'react'
import { useNavigate } from "react-router-dom"
import Logo from "../assets/logo.png"
import google from '../assets/google.png'
import { IoMdEye } from "react-icons/io"
import { IoEye } from "react-icons/io5"
import { authDataContext } from '../context/authContext'
import axios from "axios"


function Login() {
  const [show, setShow] = useState(false)
    let [email, setEmail] = useState("")
    let [password, setpassword] = useState("")
    let {serverUrl} = useContext(authDataContext)



  let navigate = useNavigate()

 const handleLogin = async (e) => {
  e.preventDefault(); // 🔥 REQUIRED

  try {
    const result = await axios.post(
      serverUrl + '/api/auth/login',
      { email, password },
      { withCredentials: true }
    );

    console.log("LOGIN SUCCESS:", result.data);

  } catch (error) {
    console.log("LOGIN ERROR:", error.response?.data || error);
  }
};




  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-b from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">

      {/* Navbar */}
      <div
        className="w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img className="w-[40px]" src={Logo} alt="Logo" />
        <h1 className="text-[22px] font-sans text-white">OneCart</h1>
      </div>

      {/* Heading */}
      <div className="w-full h-[100px] flex items-center justify-center flex-col gap-[10px]">
        <span className="text-[25px] font-semibold">Registration Page</span>
        <span className="text-[16px]">Welcome to Onecart, Place your order</span>
      </div>

      {/* Glass Card */}
      <div className="max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center">

        <form action="" onSubmit={handleLogin} className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]">

          {/* Google Auth */}
          <div className="w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer">
            <img src={google} alt="google" className="w-[20px]" />
            Registration with Google
          </div>

          {/* OR */}
          <div className="w-full h-[20px] flex items-center justify-center gap-[10px]">
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
            OR
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
          </div>

          {/* Inputs */}
          <div className="w-[90%] flex flex-col gap-[15px] relative">

            

            <input
              type="email"
              placeholder="Email"
              required
              className="w-full h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
              onChange={(e)=>setEmail(e.target.value )} value={email}
            />

            <div className="relative">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                required
                className="w-full h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
                onChange={(e)=>setpassword(e.target.value )} value={password}
              />

              {!show ? (
                <IoMdEye
                  className="absolute right-[15px] top-[15px] w-[20px] h-[20px] cursor-pointer"
                  onClick={() => setShow(true)}
                />
              ) : (
                <IoEye
                  className="absolute right-[15px] top-[15px] w-[20px] h-[20px] cursor-pointer"
                  onClick={() => setShow(false)}
                />  
              )}
            </div>

            {/* Button */}
            <button className="w-full h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold">
              Login
            </button>

            {/* Login */}
            <p className="flex gap-[10px] justify-center">
              You haven't  any account?
              <span
                className="text-[#5555f6cf] text-[17px] font-semibold cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Create new Account
              </span>
            </p>

          </div>
        </form>
      </div>
    </div>
  )
}

export default Login

