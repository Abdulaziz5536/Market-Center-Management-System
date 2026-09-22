import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Unit from './components/Unit';

function App() {
  

  return (
    <>
    <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/units" element={<Unit />}/>

    </Routes>

      
    </>
  )
}

export default App
