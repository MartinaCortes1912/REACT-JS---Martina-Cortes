import React, { useState } from "react";

function Contacto () {
    const [nombre, setNombre] = useState('');
    const [usuario, setUsuario] = useState('');
    const [mensaje, setMensaje] = useState('');

    return(
        <section className="login">
        <form>
            <h2 className="titulo">Contacto</h2>
            <div>
            <br></br>
            <label>Nombre:</label>
            <input
                placeholder="Pepe Peréz"
                required
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                aria-label="Nombre"
            />
            </div>
            <div>
            <label>Email:</label>
            <input
                placeholder="ejemplo@gmail.com"
                required
                type="email"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                aria-label="Email"
            />
            </div>
            <div>
            <label>Mensaje:</label>
            <textarea
                placeholder="Tu mensaje"
                required
                rows="4"
                type="text"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                aria-label="Mensaje"
            />
            </div>
            <button type="submit" aria-label="Enviar">Enviar</button>
        </form>
        </section>
    );
}

export default Contacto;