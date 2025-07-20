import React, { useState } from "react";
import { useContactoContext } from '../contexts/ContactoContext';
import { dispararSweetBasico } from '../assets/SweetAlert';

function Contacto() {
    const { enviarMensaje } = useContactoContext();
    const [datosContacto, setDatosContacto] = useState({
        nombre: '',
        email: '',
        mensaje: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatosContacto({ ...datosContacto, [name]: value });
    };

    const validarFormulario = () => {
        if (!datosContacto.nombre.trim()) {
            return "El nombre es obligatorio.";
        }
        if (!datosContacto.email.trim()) {
            return "El email es obligatorio.";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datosContacto.email)) {
            return "Por favor ingresa un email válido.";
        }
        if (!datosContacto.mensaje.trim() || datosContacto.mensaje.length < 10) {
            return "El mensaje debe tener al menos 10 caracteres.";
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validarForm = validarFormulario();

        if (validarForm === true) {
            enviarMensaje(datosContacto).then((data) => {
                setDatosContacto({ nombre: '', email: '', mensaje: '' });
                dispararSweetBasico("¡Listo!", "Tu mensaje se ha enviado exitosamente", "success", "Cerrar");
            }).catch((error) => {
                console.error("Error:", error);
                dispararSweetBasico("Opps...", "Hubo un problema al enviar el mensaje", "error", "Cerrar");
            });
        } else {
            dispararSweetBasico("Opps...", validarForm, "warning", "Cerrar");
        }
    };

    return (
        <section className="login">
            <form onSubmit={handleSubmit}>
                <h2 className="titulo">Contacto</h2>
                <div>
                    <br />
                    <label>Nombre:</label>
                    <input
                        placeholder="Pepe Pérez"
                        type="text"
                        name="nombre"
                        value={datosContacto.nombre}
                        onChange={handleChange}
                        aria-label="Nombre"
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        placeholder="ejemplo@gmail.com"
                        type="text"
                        name="email"
                        value={datosContacto.email}
                        onChange={handleChange}
                        aria-label="Email"
                    />
                </div>
                <div>
                    <label>Mensaje:</label>
                    <textarea
                        placeholder="Tu mensaje"
                        rows="4"
                        name="mensaje"
                        value={datosContacto.mensaje}
                        onChange={handleChange}
                        aria-label="Mensaje"
                    />
                </div>
                <button type="submit" aria-label="Enviar">
                    Enviar
                </button>
            </form>
        </section>
    );
}

export default Contacto;
