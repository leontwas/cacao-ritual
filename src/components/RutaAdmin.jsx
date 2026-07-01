import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { alertaError } from '../utils/sweetalert';

const RutaAdmin = ({ children }) => {
  const { usuario, cargando } = useAuth();

  useEffect(() => {
    if (!cargando && (!usuario || usuario.rol !== 'admin')) {
      alertaError('Acceso Denegado', 'No posees permisos de administrador para ingresar aquí.');
    }
  }, [usuario, cargando]);

  if (cargando) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f7f0e8', color: '#1a0800', fontFamily: 'var(--fuente-cuerpo)' }}>
        <div className="titulo-centrado">
          <h2>Verificando credenciales...</h2>
          <div className="separador"></div>
        </div>
      </div>
    );
  }

  if (!usuario || usuario.rol !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RutaAdmin;
