import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useProductosContext } from "../contexts/ProductosContext";
import { useAuthContext } from "../contexts/AuthContext";

function FormularioEdicion() {
  const { obtenerProducto, productoEncontrado, editarProducto } = useProductosContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState({
    name: '',
    price: '',
    description: '',
    imagen: ''
  });
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerProducto(id).then(() => {
      setCargando(false);
    }).catch((error) => {
      if (error == "Producto no encontrado") {
        setError("Producto no encontrado")
      }
      if (error == "Hubo un error al obtener el producto.") {
        setError("Hubo un error al obtener el producto.");
      }
      setCargando(false);
    })
  }, [id]);

  // Actualizar el estado local cuando se carga el producto
  useEffect(() => {
    if (productoEncontrado) {
      setProducto(productoEncontrado);
    }
  }, [productoEncontrado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const validarFormulario = () => {
    if (!producto.name.trim()) {
      return "El nombre es obligatorio."
    }
    if (!producto.price || producto.price <= 0) {
      return "El precio debe ser mayor a 0."
    }
    if (!producto.description.trim() || producto.description.length < 10) {
      return "La descripción debe tener al menos 10 caracteres."
    }
    if (!producto.imagen.trim()) {
      return "La url de la imagen no debe estar vacía"
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validarForm = validarFormulario();
    
    if (validarForm === true) {
      editarProducto(producto).then((prod) => {
        alert("Producto editado correctamente!");
        navigate(`/productos/${id}`); // Redirigir al detalle del producto
      }).catch((error) => {
        alert("Hubo un problema al actualizar el producto: " + error.message);
      })
    } else {
      alert("Error en la validación: " + validarForm);
    }
  };

  if (cargando) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='d-flex flex-column justify-content-center align-items-center min-vh-100'>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
        <h3>Editar Producto</h3>
        <div>
          <label className="form-label">Nombre:</label>
          <input
            className="form-control"
            type="text"
            name="name"
            value={producto.name || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="form-label">Imagen URL:</label>
          <input
            type="text" 
            className="form-control" 
            name="imagen" 
            value={producto.imagen || ''} 
            onChange={handleChange} 
            required
          />
        </div>
        <div>
          <label className="form-label">Precio:</label>
          <input
            type="number"
            name="price"
            value={producto.price || ''}
            onChange={handleChange}
            required
            className="form-control"
            min="0"
          />
        </div>
        <div>
          <label className="form-label">Descripción:</label>
          <textarea
            name="description"
            value={producto.description || ''}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary me-2">Actualizar Producto</button>
        <Link to={`/productos/${id}`} className="btn btn-secondary">Cancelar</Link>
      </form>
    </div>
  );
}

export default FormularioEdicion;