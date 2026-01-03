import React from 'react'
import Logo from "../assets/logo.png"

function Registration() {
  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to- from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start'>
      <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer'>
      <img className='w-[100px]' src={Logo} alt="" />
     
      </div>
      <div className='text-black'> <h1>OneCart</h1></div>

    </div>
  )
}

export default Registration
