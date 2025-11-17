import express from "express";
import {
  getPaciente,
  addPaciente,
  updatePaciente,
  deletePaciente,
} from "../controllers/paciente.js";

const router = express.Router();

router.get("/", getPaciente);

router.post("/", addPaciente);

router.put("/:id", updatePaciente);

router.delete("/:id", deletePaciente);

export default router;
