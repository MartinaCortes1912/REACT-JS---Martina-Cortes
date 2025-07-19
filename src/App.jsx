import './App.css'
import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Inicio from './components/Inicio';
import ProductosContainer from './components/Productos';
import ProductoDetalle from './components/ProductoDetalle'
import Nosotros from './components/Nosotros'
import Contacto from './components/Contacto' 
import Admin from './components/Admin'; 
import User from './components/User';
import Carrito from './components/Carrito';
import Login from './components/Login.jsx';
import SignIn from './components/SignIn';
import { useAuthContext } from './contexts/AuthContext.jsx';
import FormularioProducto from './components/FormularioProducto.jsx';
import FormularioEdicion from './components/FormularioEdicion.jsx';

function App() {
  const{user} = useAuthContext();
  const{admin} = useAuthContext();

  return (
      <Router>
        <div>
          <Header/>
          <Nav/>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/productos" element={<ProductosContainer/>} />
            <Route path="/productos/:id" element={<ProductoDetalle/>} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto/>} />
            <Route path="/carrito" element={user ? <Carrito/> : <Navigate to={"/login"} replace/>}/>   
            <Route path='/admin' element={admin ? <Admin/> : <Navigate to={"/login"} replace/>} />
            <Route path='/user' element={user? <User/> : <Navigate to={"/login"} replace/>} />
            <Route path='/admin/productos' element={admin ? <FormularioProducto/> : <Navigate to={"/login"} replace/>} />
            <Route path="/admin/editar/:id" element={admin ? <FormularioEdicion/> : <Navigate to={"/login"} replace/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signin" element={<SignIn/>} />
            
          </Routes>
          <Footer/>
        </div>
      </Router>
  )
}

export default App