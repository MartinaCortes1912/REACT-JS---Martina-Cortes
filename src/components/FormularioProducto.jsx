import React, { useState } from 'react';
import { useProductosContext } from '../contexts/ProductosContext';

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

  const [errores, setErrores] = useState({});

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!producto.name.trim()) {
      nuevosErrores.name = 'El nombre es obligatorio.';
    }
    if (!producto.imagen.trim()) {
        nuevosErrores.imagen = 'La imagen es obligatoria.';
      }
    if (!producto.price || producto.price <= 0) {
      nuevosErrores.price = 'El precio debe ser mayor a 0.';
    }
    if (!producto.description.trim() || producto.description.length < 10) {
      nuevosErrores.description = 'La descripción debe tener al menos 10 caracteres.';
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;};

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validarFormulario()) {
            agregarProducto(producto).then((data) => {
                setProducto({ name: '', price: '', description: '', imagen: ""});
              }).catch((error) => {
                alert('La descripción debe tener al menos 10 caracteres.')
              })
            } else{
                alert('La descripción debe tener al menos 10 caracteres.')
            }
          }

  return (
  <form onSubmit={handleSubmit}> 
    <h2>Agregar Producto</h2>
    <div>
      <label>Nombre:</label>
      <input
        type="text" name="name" value={producto.name} onChange={handleChange} required/>
    </div>
    <div>
      <label>Imagen (URL):</label>
      <input
        type="text" name="imagen" value={producto.imagen} onChange={handleChange} required/>
    </div>
    <div>
      <label>Precio:</label>
      <input type="number" name="price" value={producto.price} onChange={handleChange} required
        min="0"/>
    </div>
    <div>
        <label>Descripción:</label>
        <textarea
          name="description"
          value={producto.description}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Agregar Producto</button>
    </form>
  );
}

export default FormularioProducto;
