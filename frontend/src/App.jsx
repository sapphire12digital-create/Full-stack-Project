import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Registration from './Pages/Registration'
import Home from './Pages/Home'
import Login from './Pages/Login'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Registration/>}/>
    </Routes>
    </>
  )
}

export default App
