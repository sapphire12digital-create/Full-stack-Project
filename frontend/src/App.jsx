import React from "react";
import { Route, Routes } from "react-router-dom";
import Registration from "./Pages/Registration";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Nav from "./components/Nav"; // ✅ ADD THIS LINE

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
      </Routes>
    </>
  );
}

export default App;
