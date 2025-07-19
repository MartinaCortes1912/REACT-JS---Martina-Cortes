import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { CarritoContext} from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { IoBag } from "react-icons/io5";

function Nav() {  
    const {productosCarrito} = useContext(CarritoContext)
    const{user} = useAuthContext();

    return (  
        <nav>  
            <ul>  
                {user ? <li><Link to="/admin" style={{ fontWeight: "normal" }}>¡Hola Admin!</Link></li> : <li><Link to="/login" style={{ fontWeight: "normal" }}>¡Inicia Sesión!</Link></li>}
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/productos">Productos</Link></li>   
                <li><Link to="/nosotros">Nosotros</Link></li>  
                <li><Link to="/contacto">Contacto</Link></li> 
                <li><Link to="/carrito"><IoBag /><span>{productosCarrito.length > 0 ? productosCarrito.length : ""}</span></Link></li> 
            </ul>  
        </nav>  
    );  
}

export default Nav;