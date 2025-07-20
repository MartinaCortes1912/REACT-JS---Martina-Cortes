import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useProductosContext } from "../contexts/ProductosContext";
import { dispararSweetBasico } from "../assets/SweetAlert";

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
    if (!producto.imagen.trim()) {
      return "La url de la imagen no debe estar vacía."
    }
    if (!producto.price || producto.price <= 0) {
      return "El precio debe ser mayor a 0."
    }
    if (!producto.description.trim() || producto.description.length < 10) {
      return "La descripción debe tener al menos 10 caracteres."
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validarForm = validarFormulario();
    
    if (validarForm === true) {
      editarProducto(producto).then(async () => {
        await dispararSweetBasico("¡Listo!", "El producto se ha editado correctamente", "success", "Cerrar");
        navigate(`/productos/${id}`);
      }).catch((error) => {
        console.error("Error:", error);
        dispararSweetBasico("Opps...", "Hubo un problema al actualizar el producto: " + error.message, "error", "Cerrar");
      })
    } else {
      dispararSweetBasico("Opps...", validarForm, "warning", "Cerrar");
    }
  };

  if (cargando) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <form onSubmit={handleSubmit} className='login'>
        <h2 className="titulo">Editar Producto</h2>
        <div>
          <br></br>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={producto.name || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Imagen URL:</label>
          <input
            type="text"
            name="imagen" 
            value={producto.imagen || ''} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={producto.price || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            value={producto.description || ''}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Actualizar Producto</button>
        <Link to={`/productos/${id}`}>¿Querés <u>cancelar</u> la edición?</Link>
      </form>
    </div>
  );
}

export default FormularioEdicion;