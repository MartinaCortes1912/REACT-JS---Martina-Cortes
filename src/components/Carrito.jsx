import "../styles/Carrito.css"
import { useContext, useEffect, useState } from "react";
import CarritoCard from "./CarritoCard.jsx";
import { Navigate } from "react-router-dom";
import { CarritoContext } from "../contexts/CarritoContext.jsx";

export default function Carrito() {
    const {productosCarrito, vaciarCarrito, borrarProductoCarrito} = useContext(CarritoContext);
    console.log("Productos: " + productosCarrito)

    const total = productosCarrito.reduce(
        (subTotal, producto) => subTotal + producto.price * producto.cantidad, 0
    )

    function funcionDisparadora(id){
        borrarProductoCarrito(id)
    }

    function funcionDisparadora2(){
        vaciarCarrito()
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
            {total > 0 ? <h2 class="carrito-total" >Total a pagar: {total.toFixed(2)} $</h2>: <></>}
            <button class="boton-vaciar" onClick={funcionDisparadora2}>Vaciar carrito</button>
            </>
            : <p className="carrito-vacio">Carrito vacio</p>}
        </div>
    )
}