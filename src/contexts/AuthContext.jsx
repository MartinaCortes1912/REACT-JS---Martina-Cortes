import React, { createContext, useState, useContext } from 'react';
// Crear el contexto de autenticación
const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);


  const login = (username) => {
    // Simulando la creación de un token (en una app real, esto sería generado por un servidor)
    const token = `fake-token-${username}`;
    localStorage.setItem('authToken-Marruca', token);
    setUser(username);
  };
  const logout = () => {
    localStorage.removeItem('authToken-Marruca');
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider> );
}
export const useAuthContext = () => useContext(AuthContext);
