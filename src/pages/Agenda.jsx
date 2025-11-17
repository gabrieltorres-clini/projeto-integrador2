// pages/Agenda.jsx
import React, { useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "moment/locale/pt-br";
import GlobalStyle from "../styles/global";

moment.locale("pt-br");

const localizador = momentLocalizer(moment);
const CalendarioArrastar = withDragAndDrop(Calendar);

function Agenda() {
  const [eventos, setEventos] = useState([
    {
      id: 1,
      title: "Reunião com equipe",
      start: new Date(2025, 9, 23, 10, 0),
      end: new Date(2025, 9, 23, 11, 0),
    },
    {
      id: 2,
      title: "Almoço com cliente",
      start: new Date(2025, 9, 24, 12, 30),
      end: new Date(2025, 9, 24, 13, 30),
    },
    {
      id: 3,
      title: "Treinamento",
      start: new Date(2025, 9, 25, 14, 0),
      end: new Date(2025, 9, 25, 16, 0),
    },
  ]);

  const aoMoverEvento = ({ event, start, end }) => {
    setEventos((prev) =>
      prev.map((ev) => (ev.id === event.id ? { ...ev, start, end } : ev))
    );
  };

  const aoSelecionarEspaco = ({ start, end }) => {
    const titulo = window.prompt("Digite o título do novo evento:");
    if (titulo) {
      setEventos((prev) => [
        ...prev,
        { id: prev.length + 1, title: titulo, start, end },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 p-6">
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="AgendarPacientes">Agendar Pacientes</h1>
        <p className="text-slate-500"></p>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-4 border border-slate-100">
        <GlobalStyle />
        <CalendarioArrastar
          localizer={localizador}
          events={eventos}
          startAccessor="start"
          endAccessor="end"
          selectable
          resizable
          onEventDrop={aoMoverEvento}
          onEventResize={aoMoverEvento}
          onSelectSlot={aoSelecionarEspaco}
          defaultView={Views.MONTH}
          views={{
            month: true,
            week: true,
            day: true,
            agenda: true,
          }}
          style={{ height: "75vh" }}
          popup
          messages={{
            today: "Hoje",
            previous: "Anterior",
            next: "Próximo",
            month: "Mês",
            week: "Semana",
            day: "Dia",
            agenda: "Agenda",
            showMore: (total) => `+${total} mais`,
          }}
          eventPropGetter={() => ({
            style: {
              backgroundColor: "#2563eb",
              borderRadius: "8px",
              color: "white",
              border: "none",
              fontWeight: 500,
              cursor: "pointer",
            },
          })}
          components={{
            event: ({ event }) => (
              <span className="hover:opacity-90">{event.title}</span>
            ),
          }}
        />
      </div>
    </div>
  );
}

export default Agenda;
