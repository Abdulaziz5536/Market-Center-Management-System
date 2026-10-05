import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Unit from './components/Unit';
import Tenant from './components/Tenant';
import Contract from './components/Contract';
import Utility from './components/Utility';
import Announcement from './components/Announcement';

function App() {
  

  return (
    <>
    <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/units" element={<Unit />}/>
      <Route path="/tenants" element={<Tenant />}/>
      <Route path="/contracts" element={<Contract />}/>
      <Route path="/utilities" element={<Utility />}/>
      <Route path="/announcement" element={<Announcement />}/>

    </Routes>

      
    </>
  )
}

export default App
