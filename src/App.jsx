
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
import Login from './components/Login';
import Carrito from './components/Carrito';
import { CarritoProvider } from './contexts/CarritoContext';

function App() {
  const [usuarioLogeado, setUsuarioLogeado] = useState(false)
  const [adminLogeado, setAdminLogeado] = useState(false)

  function manejarAdmin() {
    setAdminLogeado(!adminLogeado)
  }

  function manejarUser(){
    setUsuarioLogeado(!usuarioLogeado)
  }
  return (
    <CarritoProvider>
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
            <Route path="/carrito" element={usuarioLogeado ? <Carrito/> : <Navigate to={"/login"} replace/>}/>   
            <Route path='/admin' element={adminLogeado ? <Admin/> : <Navigate to={"/login"} replace/>} />
            <Route path="/login" element={<Login user={usuarioLogeado} admin={adminLogeado} setLogeadoAdmin={manejarAdmin} setLogeadoUser={manejarUser}/>}/>  
          </Routes>
          <Footer/>
        </div>
      </Router>
    </CarritoProvider>
  )
}

export default App