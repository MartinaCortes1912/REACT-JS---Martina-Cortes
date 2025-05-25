import "../styles/Productos.css"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function ProductosContainer(){
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    {useEffect(() => {
        fetch('https://6831696e6205ab0d6c3c32c7.mockapi.io/productos')
            .then((respuesta) =>
                respuesta.json()
            )
            .then((datos) => {
                console.log(datos)
                setProductos(datos)
                setCargando(false);
            })
            .catch((error) => {
                console.log("Error", error)
                setError('Hubo un problema al cargar los productos.');
                setCargando(false);
            });
    }, []);}


    if (cargando) {
        return <p>Cargando...</p>;
    }else if (error){
        return <p>{error}</p>;
    }else{
        return(
            <div className="productos-conteiner">
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

