import React from "react";
import { useNavigate } from "react-router-dom";
import GlobalStyle from "../styles/global";
export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>Assistente Inteligente</h1>

      <div className="cards">
        <div className="card" onClick={() => navigate("/chat")}>
          <img
            src="https://img.freepik.com/vetores-premium/icone-de-bot-de-chat-assistente-inteligente-virtual-design-de-sinal-de-bot-cabeca-de-robo-com-bolha-de-fala-em-circulo_418020-468.jpg"
            alt="Chatbot"
          />
          <p>Chatbot IA</p>
        </div>

        <div className="card" onClick={() => navigate("/pacientes")}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2355/2355692.png"
            alt="Pacientes"
          />
          <p>Pacientes</p>
        </div>

        <div className="card" onClick={() => navigate("/agenda")}>
          <img
            src="https://itambaraca.pr.gov.br//instances/23/uploads/activities/editor/18a27618fdaa7abbe981b9cb89f3f640ab7573e7.png"
            alt="Calendário"
          />
          <p>Calendário</p>
        </div>
      </div>
      <GlobalStyle />
    </div>
  );
}
