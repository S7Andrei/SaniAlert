import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Navbar from './components/Navbar';
import MenuScreen from './pages/MenuScreen/MenuScreen'; 
import SituacaoAtualScreen from './pages/SituacaoAtualScreen/SituacaoAtualScreen'; 
import IncluirDadosScreen from './pages/IncluirDadosScreen/IncluirDadosScreen'; 
import PocoDetailsScreen from './pages/Screen1'; 
import SituacaoBairroScreen from './pages/Screen2'; 
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('Menu'); 
  const [mainMenuScreen, setMainMenuScreen] = useState('Menu');
  const [isAdmin, setIsAdmin] = useState(() => !!localStorage.getItem('sanialert_logged'));

  useEffect(() => {
    setIsAdmin(!!localStorage.getItem('sanialert_logged'));
  }, [currentScreen]);

  const handleScreenChange = (screen: string) => {
    setCurrentScreen(screen);
    if (["Menu", "SituacaoAtual", "IncluirDados"].includes(screen)) {
      setMainMenuScreen(screen);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdmin(true);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Menu':
        return <MenuScreen />;
      case 'SituacaoAtual':
        return <SituacaoAtualScreen onNavigateToSituacaoBairro={() => setCurrentScreen('SituacaoBairro')} />;
      case 'IncluirDados':
        return isAdmin ? <IncluirDadosScreen onNavigateToPocoDetails={() => setCurrentScreen('PocoDetails')} /> : <MenuScreen />;
      case 'PocoDetails':
        return <PocoDetailsScreen onNavigateBack={() => setCurrentScreen('IncluirDados')} />; 
      case 'SituacaoBairro':
        return <SituacaoBairroScreen onNavigateBack={() => setCurrentScreen('SituacaoAtual')} />;
      default:
        return <MenuScreen />;
    }
  };

  return (
    <Provider store={store}>
      <div className="app-container">
        <Navbar 
          currentScreen={mainMenuScreen} 
          onScreenChange={handleScreenChange} 
          isAdmin={isAdmin} 
          onLoginSuccess={handleLoginSuccess} 
        />
        <main className="app-content">
          {renderScreen()}
        </main>
      </div>
    </Provider>
  )
}

export default App
