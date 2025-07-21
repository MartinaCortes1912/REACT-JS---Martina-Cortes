import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useProductosContext } from "../contexts/ProductosContext"
import {Helmet} from "react-helmet";
import { useAuthContext } from "../contexts/AuthContext";
import { FaSearch } from "react-icons/fa";

function ProductosContainer(){
    const{admin} = useAuthContext();

    const {productos, obtenerProductos, filtrarProductos} = useProductosContext();
    const productosPorPagina = 6;
    const [paginaActual, setPaginaActual] = useState(1);
    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosActuales = productos.slice(indicePrimerProducto, indiceUltimoProducto);

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [filtro, setFiltro] = useState("")

    {useEffect(() => {
        obtenerProductos().then((productos) => {
            setCargando(false);
        }).catch((error) => {
            console.error("Error:", error);
            setError('Hubo un problema al cargar los productos.');
            setCargando(false);
        })
    }, []);}

    useEffect(() => {
        filtrarProductos(filtro)
    },[filtro])//filtro

    const totalPaginas = Math.ceil(productos.length / productosPorPagina);
    const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

    if (cargando) {
        return <p>Cargando...</p>;
    }else if (error){
        return <p>{error}</p>;
    }else{
        return(
            <div className="productos-conteiner">
                <Helmet>
                <title>Marruca | ¡Vivi tu piel!</title>
                <meta name="description" content="Explora nuestra variedad de productos." />
                </Helmet>
                <div className="producto-buscador">
                <div className="producto-pagina">
                <div className="d-flex justify-content-center my-4">
                    {Array.from({ length: totalPaginas }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`btn mx-1 ${paginaActual === index + 1 ? "producto-pagina-actual" : "producto-pagina-opcion"}`}
                        onClick={() => cambiarPagina(index + 1)}
                    >
                        {index + 1}
                    </button>
                    ))}
                </div>
                </div>
                <div className="input-group mb-3 mt-3">
                    <span className="input-group-text">
                        <FaSearch />
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar productos..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                </div>
                </div>
                {admin ? <Link to="/admin/productos" class="producto-añadir-btn" aria-label="Añadir productos">Añadir Productos</Link> : null}
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {productosActuales.map((producto) => (
                    <div className="producto-card" key={producto.id}>
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

