import React, { useState } from 'react';
import { useProductosContext } from '../contexts/ProductosContext';
import { dispararSweetBasico } from '../assets/SweetAlert';

function FormularioProducto() {
  const {agregarProducto} = useProductosContext();
  const [producto, setProducto] = useState({
    name: '',
    price: '',
    description: '',
    imagen: "",
  });
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const validarForm = validarFormulario();

        if (validarForm === true)  {
            agregarProducto(producto).then((data) => {
                setProducto({ name: '', price: '', description: '', imagen: ""});
                dispararSweetBasico("¡Listo!", "El producto se ha creado exitosamente", "success", "Cerrar");
              }).catch((error) => {
                console.error("Error:", error);
                dispararSweetBasico("Opps...", "Hubo un problema al agregar el producto", "error", "Cerrar");
              })
            } else{
              dispararSweetBasico("Opps...", validarForm, "warning", "Cerrar");                
            }
          }

  return (
  <form onSubmit={handleSubmit} className='login'> 
    <h2 className='titulo'>Agregar Producto</h2>
    <div>
      <br></br>
      <label>Nombre:</label>
      <input
        type="text" name="name" value={producto.name} onChange={handleChange}/>
    </div>
    <div>
      <label>Imagen (URL):</label>
      <input
        type="text" name="imagen" value={producto.imagen} onChange={handleChange}/>
    </div>
    <div>
      <label>Precio:</label>
      <input type="number" name="price" value={producto.price} onChange={handleChange}/>
    </div>
    <div>
        <label>Descripción:</label>
        <textarea
          name="description"
          value={producto.description}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Agregar Producto</button>
    </form>
  );
}

export default FormularioProducto;
