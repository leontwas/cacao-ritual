import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { alertaError } from '../utils/sweetalert';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [enviando, setEnviando] = useState(false);
  const { registro } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alertaError('Contraseñas no coinciden', 'Por favor verifica que ambas contraseñas sean idénticas.');
      return;
    }

    setEnviando(true);
    try {
      await registro(nombre, email, password);
      navigate('/');
    } catch (err) {
      // El error ya es manejado en AuthContext
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div style={{ padding: '120px 20px 80px', minHeight: '80vh', background: 'var(--color-claro)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="formulario" style={{ background: 'var(--color-blanco)', padding: '40px', boxShadow: 'var(--sombra)', width: '100%', maxWidth: '450px' }}>
        <div className="titulo-centrado" style={{ width: '100%' }}>
          <h2>Crear Cuenta</h2>
          <div className="separador"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="formulario__grupo">
            <label htmlFor="nombre">Nombre Completo</label>
            <input
              type="text"
              id="nombre"
              placeholder="Juan Pérez"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="formulario__grupo">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="tuemail@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="formulario__grupo">
            <label htmlFor="password">Contraseña (mínimo 6 caracteres)</label>
            <input
              type="password"
              id="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="formulario__grupo">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="******"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn--oscuro" style={{ width: '100%', marginTop: '10px' }} disabled={enviando}>
            {enviando ? 'Creando cuenta...' : 'Registrarse'}
          </button>
        </form>
        <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem', color: '#7a5c42' }}>
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" style={{ color: 'var(--color-secundario)', fontWeight: 'bold' }}>
            Inicia sesión aquí
          </Link>
        </p>
        <div style={{ marginTop: '15px', textAlign: 'center' }}>
          <Link to="/" style={{ fontSize: '0.85rem', color: 'var(--color-acento)' }}>
            <i className="fa-solid fa-arrow-left"></i> Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registro;
