import express from "express";
import {
  getAgenda,
  addAgenda,
  updateAgenda,
  deleteAgenda,
} from "../controllers/agenda.js";

const router = express.Router();

router.get("/", getAgenda);

router.post("/", addAgenda);

router.put("/:id", updateAgenda);

router.delete("/:id", deleteAgenda);

export default router;
