import { db } from "../db.js";

export const getAgenda = (_, res) => {
  const q = "SELECT * FROM agenda";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addAgenda = (req, res) => {
  const q = "INSERT INTO agenda (`evento`, `data`, ) VALUES (?)";

  const values = [req.body.evento, req.body.data];

  db.query(q, [values], (err) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Evento adicionado com sucesso.");
  });
};

export const updateAgenda = (req, res) => {
  const q = "UPDATE agenda SET `evento` = ?, `data` = ? WHERE id = ?";

  const values = [req.body.evento, req.body.data];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Evento atualizado com sucesso.");
  });
};

export const deleteAgenda = (req, res) => {
  const q = "DELETE FROM agenda WHERE id = ?";
  db.query(q, [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Evento deletado com sucesso.");
  });
};
