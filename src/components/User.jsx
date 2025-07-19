import { useAuthContext } from '../contexts/AuthContext.jsx';

export default function User() {
  const { logout } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    logout();
  };

  return(
    <section className="login">
      <h2 className="titulo">¡Hola User!</h2>
      <p>
        No tenemos noticias para vos, pero ¡Te invitamos a explorar nuestra sección de <b>Productos</b>!
      </p>
      <form onSubmit={handleSubmit}>
        <button type="submit" aria-label="Cerrar sesión">Cerrar sesión</button>
      </form>
    </section>
  )
}