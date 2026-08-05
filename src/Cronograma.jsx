import './Cronograma.css';

export default function Cronograma({ userData }) {
  // If userData is missing for some reason, we could handle it, 
  // but App.jsx already protects this route.
  if (!userData) return null;

  return (
    <div className="cronograma-container fade-in">
      <header className="cronograma-header glass-panel">
        <h1>Cronograma</h1>
        <span className="badge-periodo">{userData.period}</span>
      </header>
      
      <main className="cronograma-content">
        <div className="empty-state glass-panel">
          <p>O cronograma de oficinas será exibido aqui em breve.</p>
        </div>
      </main>
    </div>
  );
}
