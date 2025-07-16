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
import Carrito from './components/Carrito';
import Login from './components/Login.jsx';
import { useAuthContext } from './contexts/AuthContext.jsx';
import FormularioProducto from './components/FormularioProducto.jsx';

function App() {
  const{user} = useAuthContext();

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
            <Route path='/admin' element={user ? <Admin/> : <Navigate to={"/login"} replace/>} />
            <Route path='/admin/productos' element={<FormularioProducto/>} />
            <Route path="/login" element={<Login/>} />
          </Routes>
          <Footer/>
        </div>
      </Router>
  )
}

export default App