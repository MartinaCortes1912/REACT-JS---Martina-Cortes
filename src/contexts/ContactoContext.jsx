import React, { createContext, useContext } from 'react';

const ContactoContext = createContext();

export function ContactoProvider({ children }) {

    const enviarMensaje = async (datosContacto) => {
        return new Promise(async (res, rej) => {            
            try {
                const respuesta = await fetch('https://formspree.io/f/xblkdyld', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(datosContacto),
                });

                if (!respuesta.ok) {
                    throw new Error('Error al enviar el mensaje.');
                }

                const data = await respuesta.json();
                console.log('Mensaje enviado:', data);
                res(data);
            } catch (error) {
                console.error(error.message);
                rej(error);
            }
        });
    };

    return (
        <ContactoContext.Provider value={{enviarMensaje}}>
            {children}
        </ContactoContext.Provider>
    );
}

export const useContactoContext = () => useContext(ContactoContext);