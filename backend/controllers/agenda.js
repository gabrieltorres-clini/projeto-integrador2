import { db } from "../db.js";

// GET all events
export const getAgenda = (_, res) => {
  const q = "SELECT * FROM agenda";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// POST new event
export const addAgenda = (req, res) => {
  const { evento, data } = req.body;
  if (!evento || !data)
    return res.status(400).json({ message: "Evento e data são obrigatórios." });

  const dt = new Date(data);
  const formattedDate = `${dt.getFullYear()}-${String(
    dt.getMonth() + 1
  ).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")} ${String(
    dt.getHours()
  ).padStart(2, "0")}:${String(dt.getMinutes()).padStart(2, "0")}:${String(
    dt.getSeconds()
  ).padStart(2, "0")}`;

  const q = "INSERT INTO agenda (`evento`, `data`) VALUES (?)";
  const values = [evento, formattedDate];

  db.query(q, [values], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({
      idAgenda: result.insertId,
      evento,
      data: formattedDate,
    });
  });
};

// PUT update event
export const updateAgenda = (req, res) => {
  const { evento, data } = req.body;
  const q = "UPDATE agenda SET evento = ?, data = ? WHERE idAgenda = ?";
  const values = [evento, data];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ message: "Evento atualizado com sucesso." });
  });
};

// DELETE event
export const deleteAgenda = (req, res) => {
  const q = "DELETE FROM agenda WHERE idAgenda = ?";
  db.query(q, [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ message: "Evento deletado com sucesso." });
  });
};
