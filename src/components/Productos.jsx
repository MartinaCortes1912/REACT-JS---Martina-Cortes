import "../styles/Productos.css"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useProductosContext } from "../contexts/ProductosContext"
import {Helmet} from "react-helmet";
import { useAuthContext } from "../contexts/AuthContext";

function ProductosContainer(){
    const { productos, obtenerProductos, cargando, error } = useProductosContext();
    const{user} = useAuthContext();

    useEffect(() => {
        obtenerProductos().catch((error) => {
            console.error('Error al cargar productos:', error);
        });
    }, []);


    if (cargando) {
        return <p>Cargando...</p>;
    }else if (error){
        return <p>{error}</p>;
    }else{
        return(
            <div className="productos-conteiner">
                <Helmet>
                <title>Marruca | Productos</title>
                <meta name="description" content="Explora nuestra variedad de productos." />
                </Helmet>
                {user ? <Link to="/admin/productos" style={{ color: "white", textDecoration: "none" }}>Productos</Link> : null}
                {productos.map((producto) => (
                    <div className="producto-card" >
                    <h2 className="producto-titulo">{producto.name}</h2>
                    <Link to={"/productos/"+ producto.id}><img className="producto-image" src={producto.imagen}></img></Link>
                    <p>$ {producto.price}</p>
                    <Link to={"/productos/" + producto.id} ><button className="producto-btn">Ver más</button></Link>
                </div>
                ))}
            </div>
        )
    }
}

export default ProductosContainer

