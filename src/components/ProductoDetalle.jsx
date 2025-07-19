import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; // Agregar useNavigate
import { dispararSweetBasico, dispararSweetConfirmacion } from "../assets/SweetAlert"; // Agregar dispararSweetConfirmacion
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useProductosContext } from "../contexts/ProductosContext";

function ProductoDetalle({}) {
  const { admin } = useAuthContext();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { productoEncontrado, obtenerProducto, eliminarProducto, cargando, error } = useProductosContext();
  const { id } = useParams();
  const navigate = useNavigate(); // Inicializar navigate
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    obtenerProducto(id).then(() => {
      setCargando(false);
    }).catch((error) => {
      if(error == "Producto no encontrado"){
        setError("Producto no encontrado")
      }
      if(error == "Hubo un error al obtener el producto."){
        setError("Hubo un error al obtener el producto.");
      }
      setCargando(false);
    })
  }, [id]);

  function funcionCarrito() {
    if (cantidad < 1) return;
    dispararSweetBasico("Producto Agregado", "El producto fue agregado al carrito con éxito", "success", "Cerrar");
    agregarAlCarrito({ ...productoEncontrado, cantidad });
  }

  function sumarContador() {
    setCantidad(cantidad + 1);
  }

  function restarContador() {
    if (cantidad > 1) setCantidad(cantidad - 1);
  }

  function dispararEliminar(){
    dispararSweetConfirmacion().then((result) => {
      if (result.isConfirmed) {
        eliminarProducto(id).then(() => {
          dispararSweetBasico("Eliminado", "El producto se ha eliminado con éxito.", "success", "Aceptar").then(() => {
            navigate("/productos")
          })
        }).catch((error) => {
          dispararSweetBasico("Hubo un problema al eliminar el producto", error, "error", "Cerrar")
        })
      }
    })
  }

  if (cargando) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!productoEncontrado) return null;

  return (
    <div className="detalle-container">
      <img className="detalle-imagen" src={productoEncontrado.imagen} alt={productoEncontrado.name} />
      <div className="detalle-info">
        <h2 className="detalle-titulo">{productoEncontrado.name}</h2>
        <p>{productoEncontrado.description}</p>
        <p className="detalle-precio">$ {productoEncontrado.price}</p>
            {admin ? <div>
            <Link to={`/admin/editar/${id}`} className="detalle-editar-btn" aria-label="Editar producto">Editar</Link>
            <button onClick={dispararEliminar} className="detalle-editar-btn" aria-label="Eliminar producto">Eliminar</button>
            </div>
            :
            <div className="detalle-contador">
            <button className="detalle-contador-btn" onClick={restarContador} aria-label="Menos">-</button>
            <span>{cantidad}</span>
            <button className="detalle-contador-btn" onClick={sumarContador} aria-label="Más">+</button>
            <button className="detalle-btn" onClick={funcionCarrito} aria-label="Agregar al carrito">Agregar</button>
            </div>}    
      </div>
    </div>
  );
}

export default ProductoDetalle;