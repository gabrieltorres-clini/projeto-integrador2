import React from "react";
import Inicial from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Pacientes from "./pages/Pacientes";
import Agenda from "./pages/Agenda";
import Chat from "./pages/Chat";
import "./index.css";
import FloatingChat from "./shared/components/chat/FloatingChat";

function App() {
  return (
    <Router>
      <div className="container">
        {/* Menu lateral */}
        <aside className="sidebar">
          <h1 className="title">Clínica</h1>
          <nav>
            <Link to="/inicio" className="nav-link">
              Início
            </Link>
            <Link to="/pacientes" className="nav-link">
              Pacientes
            </Link>
            <Link to="/agenda" className="nav-link">
              Agenda
            </Link>
            <Link to="/chat" className="nav-link">
              Chat
            </Link>
          </nav>
        </aside>

        {/* Área principal */}
        <main className="main">
          <Routes>
            {/* Tela inicial padrão ao abrir o site */}
            <Route path="/" element={<Inicial />} />
            <Route path="/inicio" element={<Inicial />} />
            <Route path="/pacientes" element={<Pacientes />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </main>
      </div>
      <FloatingChat />
    </Router>
  );
}

export default App;
