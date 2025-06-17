import React, { useState } from 'react';
import Modal from '../Modal';
import './LoginModal.css';

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogged, setIsLogged] = useState<boolean>(
    !!localStorage.getItem('sanialert_logged')
  );

  const handleSubmit = () => {
    if (email === 'admin@sanialert.com' && password === 'Sani123') {
      localStorage.setItem('sanialert_logged', 'true');
      setIsLogged(true);
      setError('');
      onLoginSuccess();
      onClose();
    } else {
      setError('E-mail ou senha inválidos.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sanialert_logged');
    setIsLogged(false);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="login-modal-content" style={{ maxWidth: 340, margin: '0 auto', padding: '32px 24px 24px 24px', borderRadius: 12 }}>
        <span className="material-icons" style={{ fontSize: '48px', color: '#2c3e50', display: 'block', margin: '24px auto 10px auto' }}>account_circle</span>
        {isLogged ? (
          <>
            <h2>Você já está logado</h2>
            <button onClick={handleLogout} className="btn-login">Sair da conta</button>
          </>
        ) : (
          <>
            <h2>Login</h2>
            {error && <p className="login-error">{error}</p>}
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                onKeyDown={handleKeyDown}
              />
            </div>
            <button onClick={handleSubmit} className="btn-login">Entrar</button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default LoginModal;
