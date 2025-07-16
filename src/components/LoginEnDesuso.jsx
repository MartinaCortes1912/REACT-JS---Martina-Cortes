import "../styles/Login.css"

export default function Login({setLogeadoUser, setLogeadoAdmin, user, admin}) {

//Posibles Mensajes de Confirmación

    return(
        <section className="login">
            <h2>{user && admin ? "¡No te olvides de cerrar sesión!" 
                : user ? "¡Hola Usuario! Ahora puedes ir a Carrito" 
                : admin ? "¡Hola Admin! Ahora puedes ir a Admin": "¡No estás logeado! Inicia sesión"}</h2>
            <button onClick={setLogeadoUser}>{user ? "Cerrar sesión como Usuario" : "Iniciar sesión como Usuario"}</button>
            <button onClick={setLogeadoAdmin}>{admin ? "Cerrar sesión como Admin" : "Iniciar sesión como Admin"}</button>
        </section>
    )
}