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

  function iniciarSesionEmailPass(e) {
    e.preventDefault();
    
    loginEmailPass(usuario, password)
      .then((userCredential) => {
        const email = userCredential.user.email;
        login(email);
        dispararSweetBasico("¡Bienvenido!", "Te has logeado con éxito", "success", "Cerrar");
        navigate('/');
      })
      .catch((error) => {
        console.error("Error de autenticación:", error);
        if(error.code === "auth/invalid-credential"){
          dispararSweetBasico("Opps...", "Credenciales incorrectas", "error", "Cerrar");
        } else if(error.code === "auth/user-not-found"){
          dispararSweetBasico("Opps...", "Usario no encontrado", "error", "Cerrar");
        } else if(error.code === "auth/wrong-password"){
          dispararSweetBasico("Opps...", "Contraseña incorrecta", "error", "Cerrar");
        } else {
          dispararSweetBasico("Opps...", "Error de autenticación", "error", "Cerrar");
        }
      });
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
            required
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
            required
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