import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useProductosContext } from "../contexts/ProductosContext"
import {Helmet} from "react-helmet";
import { useAuthContext } from "../contexts/AuthContext";

function ProductosContainer(){
    const { productos, obtenerProductos, cargando, error } = useProductosContext();
    const{admin} = useAuthContext();

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
                {admin ? <Link to="/admin/productos" class="producto-añadir-btn" aria-label="Añadir productos">Añadir Productos</Link> : null}
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {productos.map((producto) => (
                    <div className="producto-card" >
                    <Link to={"/productos/"+ producto.id}><img className="producto-image" src={producto.imagen}></img></Link>
                    <Link to={"/productos/" + producto.id} ><button className="producto-btn">Ver más</button></Link>
                    <h2 className="producto-titulo">{producto.name}</h2>
                    <p>$ {producto.price}</p>
                                    </div>
                ))}
                </div>
            </div>
        )
    }
}

export default ProductosContainer

