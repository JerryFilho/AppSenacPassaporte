import { useState, useEffect } from 'react';
import Home from './Home';
import Cronograma from './Cronograma';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('loading');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check if user is registered on mount
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
      setCurrentScreen('cronograma');
    } else {
      setCurrentScreen('home');
    }
  }, []);

  const handleRegistrationComplete = (data) => {
    setUserData(data);
    setCurrentScreen('cronograma');
  };

  if (currentScreen === 'loading') {
    return <div className="loading-screen">Carregando...</div>;
  }

  return (
    <div className="app-container">
      {currentScreen === 'home' && <Home onComplete={handleRegistrationComplete} />}
      {currentScreen === 'cronograma' && <Cronograma userData={userData} />}
    </div>
  );
}

export default App;
