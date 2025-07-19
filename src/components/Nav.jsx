import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { CarritoContext} from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { IoBag } from "react-icons/io5";

function Nav() {  
    const {productosCarrito} = useContext(CarritoContext)
    const{user} = useAuthContext();
    const{admin} = useAuthContext();

    return (  
        <nav>  
            <ul>  
                
            {(user && admin) ? (<li><Link to="/admin" style={{ fontWeight: "normal" }} aria-label="Admin">¡Hola Admin!</Link></li>
            ) : user ? (<li><Link to="/user" style={{ fontWeight: "normal" }} aria-label="User">¡Hola User!</Link></li>
            ) : (<li><Link to="/login" style={{ fontWeight: "normal" }} aria-label="Iniciar sesión">¡Inicia Sesión!</Link></li>)}
                <li><Link to="/productos" aria-label="Productos">Productos</Link></li>   
                <li><Link to="/nosotros" aria-label="Nosotros">Nosotros</Link></li>  
                <li><Link to="/contacto" aria-label="Contacto">Contacto</Link></li> 
                {admin ? null : <li><Link to="/carrito" aria-label="Carrito"><IoBag /><span>{productosCarrito.length > 0 ? productosCarrito.length : ""}</span></Link></li>} 
            </ul>  
        </nav>  
    );  
}

export default Nav;