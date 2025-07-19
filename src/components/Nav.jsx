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
        <nav style={{ backgroundColor: "#a75865", color: "white", padding: "10px" }}>  
            <ul style={{ listStyle: "none", display: "flex", justifyContent: "space-around", margin: 0 }}>  
                {user ? <li><Link to="/admin" style={{ color: "white", textDecoration: "none" }}>¡Hola Admin!</Link></li> : <li><Link to="/login" style={{ color: "white", textDecoration: "none" }}>¡Iniciá Sesión!</Link></li>}
                <li><Link to="/productos" style={{ color: "white", textDecoration: "none", fontWeight: "bold"}}>Productos</Link></li>   
                <li><Link to="/nosotros" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>Nosotros</Link></li>  
                <li><Link to="/contacto" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>Contacto</Link></li> 
                <li><Link to="/carrito" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}><IoBag /><span>{productosCarrito.length > 0 ? productosCarrito.length : ""}</span></Link></li> 
            </ul>  
        </nav>  
    );  
}

export default Nav;