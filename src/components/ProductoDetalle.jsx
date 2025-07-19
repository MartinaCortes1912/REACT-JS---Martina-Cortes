import { useContext, useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { dispararSweetBasico } from "../assets/SweetAlert";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useProductosContext } from "../contexts/ProductosContext";


function ProductoDetalle({}) {

  const{user} = useAuthContext();

  const {agregarAlCarrito} = useContext(CarritoContext);
  const { productoEncontrado, obtenerProducto, eliminarProducto, cargando, error } = useProductosContext();
  

  const { id } = useParams();
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
    eliminarProducto(id).then(() => {
      navigate("/productos")
    }).catch((error) => {
      dispararSweetBasico("Hubo un problema al agregar el producto", error, "error", "Cerrar")
    })
  }

  if (cargando) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!productoEncontrado) return null;

  return (
    <div className="detalle-container">
      <img className="detalle-imagen" src={productoEncontrado.imagen} alt={productoEncontrado.name} />
      <div className="detalle-info">
        <h2>{productoEncontrado.name}</h2>
        <p>$ {productoEncontrado.price}</p>
        <p>{productoEncontrado.description}</p>
        {user ? null : <div className="detalle-contador">
          <button onClick={restarContador}>-</button>
          <span>{cantidad}</span>
          <button onClick={sumarContador}>+</button>
        </div>}
        {user ? <Link to={`/admin/editar/${id}`}>Editar Producto</Link> : <button className="detalle-btn" onClick={funcionCarrito}>Agregar al carrito</button>}
        {user ? <button onClick={dispararEliminar} >Eliminar</button> : null}
      </div>
    </div>
  );
}

export default ProductoDetalle;
