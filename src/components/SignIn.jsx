import React, { useState } from 'react';
import { Link } from'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { crearUsuario } from '../auth/firebase';
import { dispararSweetBasico } from '../assets/SweetAlert';

function Signin() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const { login} = useAuthContext();
  const navigate = useNavigate();

  const validarFormulario = () => {
    if (!usuario.trim()) {
      return "El email no debe estar vacío.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(usuario)) {
      return "El formato del email no es válido.";
    }
    if (!password.trim()) {
      return "La contraseña no debe estar vacía.";
    }
    if (password.length <= 6) {
      return "La contraseña debe tener más de 6 caracteres.";
    }
    return true;
  };

  function registrarUsuario (e) {
    e.preventDefault();
    const validarForm = validarFormulario();
    
    if (validarForm === true) {
      crearUsuario(usuario, password)
        .then((userCredential) => {
          login(usuario);
          dispararSweetBasico("¡Bienvenido!", "Te has registrado con éxito", "success", "Cerrar");
          navigate('/');
        })
        .catch((error) => {
          console.error("Error de registro:", error);
          dispararSweetBasico("Opps...", "Hubo un error al registrar al usuario", "error", "Cerrar");
        });
    } else {
      dispararSweetBasico("Opps...", validarForm, "warning", "Cerrar");
    }
  }

return (
<form onSubmit={registrarUsuario} className='login'>
<h2 className='titulo'>Registrarse</h2>

<div>
  <br></br>
  <label>Email:</label>
  <input
    placeholder="ejemplo@gmail.com"
    type="text"
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
<button type="submit" aria-label="Registrarse">Registrarse</button>
<Link to="/login" aria-label="Iniciar sesión">Si ya tenes usuario. . . <u>¡Inicia Sesión!</u></Link>
</form>

)}

export default Signin;