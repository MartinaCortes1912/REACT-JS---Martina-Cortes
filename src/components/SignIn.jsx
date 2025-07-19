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

  function registrarUsuario (e) {
    e.preventDefault();
    crearUsuario(usuario, password)
    login(usuario)
    dispararSweetBasico("¡Bienvenido!", "Te has logeado con éxito", "success", "Cerrar");
    navigate('/');
  }

return (
<form onSubmit={registrarUsuario} className='login'>
<h2 className='titulo'>Registrarse</h2>

<div>
  <br></br>
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
    minLength="6"
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