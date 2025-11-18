import React, { useState, useEffect } from "react";
import moment from "moment";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "moment/locale/pt-br";
import GlobalStyle from "../styles/global";

import {
  Overlay,
  Modal,
  Input,
  Botoes,
  BtnSalvar,
  BtnCancelar,
  BtnDeletar,
  EventoLinha,
} from "../styles/modalStyled";

moment.locale("pt-br");
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

function Agenda() {
  const [eventos, setEventos] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [tituloInput, setTituloInput] = useState("");
  const [eventoEditando, setEventoEditando] = useState(null);

  useEffect(() => {
    const carregarEventos = async () => {
      try {
        const res = await axios.get("http://localhost:8800/agenda");
        const eventosFormatados = res.data.map((ev) => ({
          id: ev.idAgenda,
          titulo: ev.evento,
          inicio: new Date(ev.data),
          fim: new Date(new Date(ev.data).getTime() + 60 * 60 * 1000),
        }));
        setEventos(eventosFormatados);
      } catch (err) {
        console.error(err);
      }
    };
    carregarEventos();
  }, []);

  const aoMoverEvento = async ({ event, start, end }) => {
    try {
      await axios.put(`http://localhost:8800/agenda/${event.id}`, {
        evento: event.titulo,
        data: start.toISOString(),
      });
      setEventos(
        eventos.map((ev) =>
          ev.id === event.id ? { ...ev, inicio: start, fim: end } : ev
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const aoSelecionarEspaco = ({ start }) => {
    setDataSelecionada(start);
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

  const salvarNovoEvento = async () => {
    if (!tituloInput) return;
    try {
      const res = await axios.post("http://localhost:8800/agenda", {
        evento: tituloInput,
        data: dataSelecionada.toISOString(),
      });
      setEventos([
        ...eventos,
        {
          id: res.data.idAgenda,
          titulo: res.data.evento,
          inicio: new Date(res.data.data),
          fim: new Date(new Date(res.data.data).getTime() + 60 * 60 * 1000),
        },
      ]);
      setModalAberto(false);
      setTituloInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const salvarEdicao = async () => {
    if (!tituloInput || !eventoEditando) return;
    try {
      await axios.put(`http://localhost:8800/agenda/${eventoEditando.id}`, {
        evento: tituloInput,
        data: eventoEditando.inicio.toISOString(),
      });
      setEventos(
        eventos.map((ev) =>
          ev.id === eventoEditando.id ? { ...ev, titulo: tituloInput } : ev
        )
      );
      setEventoEditando(null);
      setModalAberto(false);
      setTituloInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const deletarEvento = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/agenda/${id}`);
      setEventos(eventos.filter((ev) => ev.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const eventosDoDia = dataSelecionada
    ? eventos.filter(
        (ev) =>
          moment(ev.inicio).format("YYYY-MM-DD") ===
          moment(dataSelecionada).format("YYYY-MM-DD")
      )
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 p-6">
      <h1 className="text-2xl mb-4">Agendar Pacientes</h1>
      <div className="bg-white rounded-2xl shadow-lg p-4 border border-slate-100">
        <DnDCalendar
          localizer={localizer}
          events={eventos}
          startAccessor="inicio"
          endAccessor="fim"
          selectable
          resizable
          onEventDrop={aoMoverEvento}
          onEventResize={aoMoverEvento}
          onSelectSlot={aoSelecionarEspaco}
          onSelectEvent={abrirModalEvento}
          defaultView={Views.MONTH}
          views={{ month: true, week: true, day: true, agenda: true }}
          style={{ height: "75vh" }}
          popup
          eventPropGetter={() => ({
            style: {
              backgroundColor: "#3c5d8a",
              borderRadius: "8px",
              color: "white",
              fontWeight: 500,
              cursor: "pointer",
              minHeight: "60px",
              padding: "4px 8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            },
          })}
          components={{
            event: ({ event }) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <strong>{event.titulo}</strong>
                <span style={{ fontSize: "0.75rem" }}>
                  {moment(event.inicio).format("HH:mm")} -{" "}
                  {moment(event.fim).format("HH:mm")}
                </span>
              </div>
            ),
          }}
        />
      </div>

      {modalAberto && (
        <Overlay>
          <Modal>
            <h2>{eventoEditando ? "Editar Consulta" : "Nova Consulta"}</h2>
            <Input
              type="text"
              placeholder="Descrição da consulta..."
              value={tituloInput}
              onChange={(e) => setTituloInput(e.target.value)}
            />
            <Botoes>
              <BtnCancelar onClick={() => setModalAberto(false)}>
                Cancelar
              </BtnCancelar>
              <BtnSalvar
                onClick={eventoEditando ? salvarEdicao : salvarNovoEvento}
              >
                Salvar
              </BtnSalvar>
            </Botoes>

            {eventosDoDia.map((ev) => (
              <EventoLinha key={ev.id}>
                <span>
                  {ev.titulo} ({moment(ev.inicio).format("HH:mm")} -{" "}
                  {moment(ev.fim).format("HH:mm")})
                </span>
                <div>
                  <BtnSalvar onClick={() => abrirModalEvento(ev)}>
                    Editar
                  </BtnSalvar>
                  <BtnDeletar onClick={() => deletarEvento(ev.id)}>
                    Excluir
                  </BtnDeletar>
                </div>
              </EventoLinha>
            ))}
          </Modal>
        </Overlay>
      )}
      <GlobalStyle />
    </div>
  );
}

export default Agenda;
