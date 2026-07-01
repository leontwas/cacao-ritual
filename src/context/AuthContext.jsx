import React, { createContext, useState, useEffect, useContext } from 'react';
import { apiAuth } from '../services/api';
import { Toast, alertaError } from '../utils/sweetalert';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('cacao_token'));
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const inicializarAuth = async () => {
      const storedToken = localStorage.getItem('cacao_token');
      if (storedToken) {
        try {
          const res = await apiAuth.perfil();
          setUsuario(res);
        } catch (error) {
          console.error('Error al inicializar sesión:', error);
          localStorage.removeItem('cacao_token');
          setToken(null);
          setUsuario(null);
        }
      }
      setCargando(false);
    };

    inicializarAuth();
  }, [token]);

  const login = async (email, password) => {
    try {
      const data = await apiAuth.login(email, password);
      localStorage.setItem('cacao_token', data.token);
      setToken(data.token);
      setUsuario(data.usuario);
      Toast.fire({
        icon: 'success',
        title: `¡Bienvenido, ${data.usuario.nombre}!`
      });
      return data.usuario;
    } catch (error) {
      alertaError('Error de inicio de sesión', error.message || 'Credenciales incorrectas');
      throw error;
    }
  };

  const registro = async (nombre, email, password) => {
    try {
      const data = await apiAuth.registro(nombre, email, password);
      localStorage.setItem('cacao_token', data.token);
      setToken(data.token);
      setUsuario(data.usuario);
      Toast.fire({
        icon: 'success',
        title: `Cuenta creada. ¡Bienvenido, ${data.usuario.nombre}!`
      });
      return data.usuario;
    } catch (error) {
      alertaError('Error de registro', error.message || 'No se pudo crear la cuenta');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('cacao_token');
    setToken(null);
    setUsuario(null);
    Toast.fire({
      icon: 'success',
      title: 'Sesión cerrada correctamente'
    });
  };

  return (
    <AuthContext.Provider value={{ usuario, token, cargando, login, registro, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
