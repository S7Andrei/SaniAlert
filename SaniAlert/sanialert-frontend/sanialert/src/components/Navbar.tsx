import React, { useState, useEffect } from 'react';
import './Navbar.css';
import LoginModal from './auth/LoginModal';

interface NavbarProps {
  currentScreen: string;
  onScreenChange: (screen: string) => void;
  isAdmin?: boolean;
  onLoginSuccess: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentScreen, onScreenChange, isAdmin, onLoginSuccess }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [admin, setAdmin] = useState<boolean>(
    !!localStorage.getItem('sanialert_logged')
  );

  useEffect(() => {
    setAdmin(!!localStorage.getItem('sanialert_logged'));
  }, [isLoginModalOpen]);

  const handleUserIconClick = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLoginSuccess = () => {
    setAdmin(true);
    onLoginSuccess();
    setIsLoginModalOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">SaniAlert</div>
      <div className="navbar-menu">
        <div
          className={`navbar-item ${currentScreen === 'Menu' ? 'active' : ''}`}
          onClick={() => onScreenChange('Menu')}
        >
          Menu
        </div>
        <div
          className={`navbar-item ${currentScreen === 'SituacaoAtual' ? 'active' : ''}`}
          onClick={() => onScreenChange('SituacaoAtual')}
        >
          Situação Atual
        </div>
        {admin && (
          <div
            className={`navbar-item ${currentScreen === 'IncluirDados' ? 'active' : ''}`}
            onClick={() => onScreenChange('IncluirDados')}
          >
            + Incluir Dados
          </div>
        )}
      </div>
      <div className="navbar-user-icon" onClick={handleUserIconClick}>
        <span className="material-icons" style={{ fontSize: '38px', color: '#fff', cursor: 'pointer', marginTop: '5px' }}>account_circle</span>
      </div>
      {isLoginModalOpen && (
        <LoginModal onClose={closeLoginModal} onLoginSuccess={handleLoginSuccess} />
      )}
    </nav>
  );
};

export default Navbar;
