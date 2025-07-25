import { useContext, useEffect, useState } from "react";
import CarritoCard from "./CarritoCard.jsx";
import { CarritoContext } from "../contexts/CarritoContext.jsx";
import { dispararSweetBasico, dispararSweetConfirmacion } from "../assets/SweetAlert.js";

export default function Carrito() {
    const {productosCarrito, vaciarCarrito, borrarProductoCarrito} = useContext(CarritoContext);
    console.log("Productos: " + productosCarrito)

    const total = productosCarrito.reduce(
        (subTotal, producto) => subTotal + producto.price * producto.cantidad, 0
    )

    function funcionDisparadora(id){
        borrarProductoCarrito(id)
        dispararSweetBasico("¡Eliminado!", "El producto se ha eliminado con éxito.", "success", "Cerrar")
    }

    async function funcionDisparadora2(){
        const result = await dispararSweetConfirmacion();

        if (result.isConfirmed) {
            vaciarCarrito()
            dispararSweetBasico("¡Carrito Vaciado!", "El carrito se ha vaciado con éxito", "success", "Cerrar");
        }
    }

    console.log("Total: " + total)

    return(
        <div className="carrito-conteiner">
            {productosCarrito.length > 0 ? <>
                            <div className="carrito-titulos" >
                                <h2 className="carrito-titulo-producto"> Producto </h2>
                                <h2 className="carrito-titulo-descripcion">Descripción</h2>
                                <h2> Cantidad  |  Precio  |  Total </h2>
                                <h2></h2>
                            </div>
            {productosCarrito.map((producto) => (

                <CarritoCard 
                    producto={producto}
                    funcionDisparadora={funcionDisparadora}
                />
            ))}
            {total > 0 ? <h2 class="carrito-total">Total a pagar: {total.toFixed(2)} $</h2>: <></>}
            <button class="boton-vaciar" onClick={funcionDisparadora2} aria-label="Vaciar carrito">Vaciar carrito</button>
            </>
            : <p className="carrito-vacio">¡Nooo! Tu carrito está vacío</p>}
        </div>
    )
}