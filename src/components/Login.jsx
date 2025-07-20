import React, { useState } from 'react';
import { Link } from'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { loginEmailPass } from '../auth/firebase';
import { dispararSweetBasico } from '../assets/SweetAlert';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useAuthContext();
  const navigate = useNavigate();

  const validarFormulario = () => {
    if (!usuario.trim()) {
      return "El email no debe estar vacío.";
    }
    if (!password.trim()) {
      return "La contraseña no debe estar vacía.";
    }
    return true;
  };

  function iniciarSesionEmailPass(e) {
    e.preventDefault();
    const validarForm = validarFormulario();
    
    if (validarForm === true) {
      loginEmailPass(usuario, password)
        .then((userCredential) => {
          const email = userCredential.user.email;
          login(email);
          dispararSweetBasico("¡Bienvenido!", "Te has logeado con éxito", "success", "Cerrar");
          navigate('/');
        })
        .catch((error) => {
          console.error("Error:", error);
          dispararSweetBasico("Opps...", "Hubo un error en la autenticación", "error", "Cerrar");
          }
        );
    } else {
      dispararSweetBasico("Opps...", validarForm, "warning", "Cerrar");
    }
  }

  return (
    <div className='login'>
      <form onSubmit={iniciarSesionEmailPass}>
        <h2 className='titulo'>Iniciar Sesión</h2>
        <p>¡Recordá que para finalizar tu compra debes iniciar sesión!</p>
        <div>
          <label>Email:</label>
          <input
            placeholder="ejemplo@gmail.com"
            type="email"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            aria-label="Email"
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            placeholder="contraseña123"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Contraseña"
          />
        </div>
        <button type="submit" aria-label="Iniciar sesión">Iniciar Sesión</button>
        <Link to="/signin" aria-label="Registrarse">Sino tenes usuario. . . <u>¡Registrate!</u></Link>
        <p className="login-usuarios"><b>*</b>Psst! Usá . . . <b>user:</b> user@gmail.com | test12 . . . y . . . <b>admin:</b> admin@gmail.com | test12</p>
      </form>
    </div>
  );
}

export default Login;