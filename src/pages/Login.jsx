import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enviando, setEnviando] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    try {
      await login(email, password);
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
          <h2>Iniciar Sesión</h2>
          <div className="separador"></div>
        </div>
        <form onSubmit={handleSubmit}>
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
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn--oscuro" style={{ width: '100%', marginTop: '10px' }} disabled={enviando}>
            {enviando ? 'Iniciando...' : 'Ingresar'}
          </button>
        </form>
        <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem', color: '#7a5c42' }}>
          ¿No tienes una cuenta?{' '}
          <Link to="/registro" style={{ color: 'var(--color-secundario)', fontWeight: 'bold' }}>
            Regístrate aquí
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

export default Login;
