import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import dellocredIcon from './assets/dellocred-icon.png'; // Renamed import
import dellocredLogo from './assets/dellocred-logo-bluewhite.png'; // New import for full logo
import Clients from './components/Clients/Clients';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo-container">
        <img src={dellocredIcon} alt="dellocred icon" className="logo-icon" />
      </div>
      <nav className="nav-links">
        <Link to="/" className="nav-link">Início</Link>
        <Link to="/clients" className="nav-link">Clientes</Link>
      </nav>
    </aside>
  );
}

function Home() {
  return (
    <div className="content home-content">
      <img src={dellocredLogo} alt="Dellocred Logo" className="home-logo" />
      <h1>Bem-vindo ao CRM Dellocred</h1>
      <p>Gerencie seus clientes e operações financeiras com eficiência e modernidade.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clients" element={<Clients />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;