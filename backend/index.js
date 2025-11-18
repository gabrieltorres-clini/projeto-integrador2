import express from "express";
import cors from "cors";
import pacientesRoute from "./routes/pacientes.js";
import agendaRoutes from "./routes/agenda.js";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/paciente", pacientesRoute);
app.use("/agenda", agendaRoutes);
app.listen(8800, () => {
  console.log("banco de dados conectado");
});
