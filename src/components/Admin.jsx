import { useAuthContext } from '../contexts/AuthContext.jsx';
import { dispararSweetConfirmacion} from '../assets/SweetAlert.js';

export default function Admin() {
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
      <h2 className="titulo">¡Hola Admin!</h2>
      <p>
        No tenemos noticias para vos, pero ¡Acordáte que podes manejar todo el inventario desde la sección <b>Productos</b>!
      </p>
      <form onSubmit={handleSubmit}>
        <button type="submit" aria-label="Cerrar sesión">Cerrar sesión</button>
      </form>
    </section>
  )
}