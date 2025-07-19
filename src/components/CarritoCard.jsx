function CarritoCard({producto, funcionDisparadora}){
    
    function borrarDelCarrito() {
        console.log("Paso 1")
        funcionDisparadora(producto.id)
    }

    return(
        <div className="carrito-card" >
            <h3 className="carrito-producto">{producto.name}</h3>
            {<p className="descripcion-carrito">{producto.description}</p>}
            <span>{producto.cantidad}</span>
            <div className="carrito-unitario">
                <span>$ {producto.price}</span>
            </div>
            <div className="carrito-sub">
                <span>$ {producto.cantidad * producto.price}</span>
            </div>
            <button className="boton-carrito" onClick={borrarDelCarrito} aria-label="Borrar del carrito">X</button>
        </div>
    )
}

export default CarritoCard