export const agregarProducto = async (producto) => {
    return(
        new Promise(async (res, rej) => {
            try {
      const respuesta = await fetch('https://6831696e6205ab0d6c3c32c7.mockapi.io/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(producto),
      });

if (!respuesta.ok) {
        throw new Error('Error al agregar el producto.');
      }
const data = await respuesta.json();
      console.log('Producto agregado:', data);
      res(data);
    } catch (error) {
      console.error(error.message);
      res("Hubo un problema al agregar el producto.")
    }
    })
    )
  };