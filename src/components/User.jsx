import { useAuthContext } from '../contexts/AuthContext.jsx';
import { dispararSweetConfirmacion} from '../assets/SweetAlert.js';

export default function User() {
  const { logout } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await dispararSweetConfirmacion(
    );

    if (result.isConfirmed) {
      logout();
    }
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