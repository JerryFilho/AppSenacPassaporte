import { useState } from 'react';
import './Home.css';

export default function Home({ onComplete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form state
  const [fullName, setFullName] = useState('');
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [error, setError] = useState('');

  const getPeriod = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return 'Manhã';
    if (hour >= 12 && hour < 18) return 'Tarde';
    return 'Noite';
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    if (!fullName.trim()) {
      setError('Por favor, informe seu nome completo.');
      return;
    }

    const userData = {
      fullName: fullName.trim(),
      isFirstTime,
      registeredAt: new Date().toISOString(),
      period: getPeriod()
    };

    localStorage.setItem('userData', JSON.stringify(userData));
    onComplete(userData);
  };

  return (
    <div className="home-container fade-in">
      {!isModalOpen ? (
        <div className="hero-section fade-in">
          <h1 className="title">Casa Aberta</h1>
          <h2 className="subtitle">Senac 2026</h2>
          <p className="description">
            Descubra oficinas incríveis, aprenda novas habilidades e preencha seu passaporte do conhecimento.
          </p>
          
          <button 
            className="btn-primary pulse-animation" 
            onClick={() => setIsModalOpen(true)}
          >
            Ver Oficinas
          </button>
        </div>
      ) : (
        <div className="modal-content glass-panel fade-in">
          <button className="close-btn" onClick={() => setIsModalOpen(false)}>×</button>
          
          <h3>Crie seu Passaporte</h3>
          <p>Para ver o cronograma, informe seus dados.</p>
          
          <form onSubmit={handleRegister} className="register-form">
            <div className="form-group">
              <label htmlFor="fullName">Nome Completo</label>
              <input 
                type="text" 
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ex: João da Silva"
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label>É sua primeira vez no Senac?</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="isFirstTime"
                    value="true"
                    checked={isFirstTime === true}
                    onChange={() => setIsFirstTime(true)}
                  />
                  Sim
                </label>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="isFirstTime"
                    value="false"
                    checked={isFirstTime === false}
                    onChange={() => setIsFirstTime(false)}
                  />
                  Não
                </label>
              </div>
            </div>

            {error && <span className="error-message">{error}</span>}

            <button type="submit" className="btn-primary w-full mt-4">
              Entrar e Ver Cronograma
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
