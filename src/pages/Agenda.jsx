// pages/Agenda.jsx
import React, { useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

const CalendarioArrastar = withDragAndDrop(Calendar);
const localizador = momentLocalizer(moment);

function Agenda() {
  const [eventos, setEventos] = useState([
    {
      id: 1,
      titulo: "Reunião com equipe",
      inicio: new Date(2025, 9, 23, 10, 0),
      fim: new Date(2025, 9, 23, 11, 0),
    },
    {
      id: 2,
      titulo: "Almoço com cliente",
      inicio: new Date(2025, 9, 24, 12, 30),
      fim: new Date(2025, 9, 24, 13, 30),
    },
    {
      id: 3,
      titulo: "Treinamento",
      inicio: new Date(2025, 9, 25, 14, 0),
      fim: new Date(2025, 9, 25, 16, 0),
    },
  ]);

  // ESTADOS DO MODAL
  const [modalAberto, setModalAberto] = useState(false);
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [tituloInput, setTituloInput] = useState("");
  const [eventoEditando, setEventoEditando] = useState(null);

  // Mover evento
  const aoMoverEvento = ({ event, start, end }) => {
    const eventoQueMoveu = { ...event, inicio: start, fim: end };
    setEventos(eventos.map((ev) => (ev.id === event.id ? eventoQueMoveu : ev)));
  };


  const aoSelecionarEspaco = (slotInfo) => {
    setDataSelecionada(slotInfo.start);
    setTituloInput("");
    setEventoEditando(null);
    setModalAberto(true);
  };

 
  const abrirModalEvento = (event) => {
    setDataSelecionada(event.inicio);
    setTituloInput(event.titulo);
    setEventoEditando(event);
    setModalAberto(true);
  };

  // Criar novo evento
  const salvarNovoEvento = () => {
    if (!tituloInput) return;

    const novoEvento = {
      id: eventos.length + 1,
      titulo: tituloInput,
      inicio: dataSelecionada,
      fim: new Date(dataSelecionada.getTime() + 60 * 60 * 1000),
    };

    setEventos([...eventos, novoEvento]);
    setTituloInput("");
  };

  // Editar evento existente
  const salvarEdicao = () => {
    if (!tituloInput || !eventoEditando) return;

    const atualizado = eventos.map((ev) =>
      ev.id === eventoEditando.id ? { ...ev, titulo: tituloInput } : ev
    );

    setEventos(atualizado);
    setEventoEditando(null);
    setTituloInput("");
  };

  // Excluir evento
  const deletarEvento = (id) => {
    setEventos(eventos.filter((ev) => ev.id !== id));
  };

  // Fechar modal
  const fecharModal = () => {
    setModalAberto(false);
    setTituloInput("");
    setEventoEditando(null);
  };

  const eventosDoDia = eventos.filter(
    (ev) =>
      moment(ev.inicio).format("YYYY-MM-DD") ===
      moment(dataSelecionada).format("YYYY-MM-DD")
  );

  return (
    <div style={{ height: "100vh", margin: "20px" }}>
      <CalendarioArrastar
        localizer={localizador}
        events={eventos}
        startAccessor="inicio"
        endAccessor="fim"
        selectable
        style={{ height: "100%" }}
        onEventDrop={aoMoverEvento}
        onEventResize={aoMoverEvento}
        onSelectSlot={aoSelecionarEspaco}
        onSelectEvent={abrirModalEvento}
      />

      {modalAberto && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2 style={{ marginBottom: 10 }}>
              {eventoEditando ? "Editar Consulta" : "Nova Consulta"}
            </h2>

            {/* Campo de texto */}
            <input
              type="text"
              placeholder="Descrição da consulta..."
              value={tituloInput}
              onChange={(e) => setTituloInput(e.target.value)}
              style={styles.input}
            />

            {/* Botões principais */}
            <div style={styles.botoes}>
              <button onClick={fecharModal} style={styles.btnCancelar}>
                Cancelar
              </button>

              {eventoEditando ? (
                <button onClick={salvarEdicao} style={styles.btnSalvar}>
                  Salvar
                </button>
              ) : (
                <button onClick={salvarNovoEvento} style={styles.btnSalvar}>
                  Salvar
                </button>
              )}
            </div>

            {/* Lista de eventos existentes no dia */}
            {eventosDoDia.length > 0 && (
              <>
                <h3 style={{ marginTop: 20 }}>Consultas do dia:</h3>
                {eventosDoDia.map((ev) => (
                  <div key={ev.id} style={styles.eventoLinha}>
                    <span>{ev.titulo}</span>

                    <div>
                      <button
                        onClick={() => abrirModalEvento(ev)}
                        style={styles.btnSalvar}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deletarEvento(ev.id)}
                        style={styles.btnDeletar}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}

                {/* Botão adicionar mais */}
                <button
                  onClick={() => {
                    setEventoEditando(null);
                    setTituloInput("");
                  }}
                  style={styles.btnAdd}
                >
                  + Nova consulta
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ESTILOS INLINE
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  modal: {
    width: "420px",
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  botoes: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
  },
  btnSalvar: {
    padding: "8px 16px",
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  btnCancelar: {
    padding: "8px 16px",
    background: "#777",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  btnDeletar: {
    marginLeft: "10px",
    padding: "6px 10px",
    background: "#E53935",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  btnAdd: {
    marginTop: "10px",
    width: "100%",
    padding: "10px",
    background: "#2196F3",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  eventoLinha: {
    marginTop: "10px",
    padding: "10px",
    background: "#f2f2f2",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
  },
};

export default Agenda;