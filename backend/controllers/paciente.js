import { db } from "../db.js";

export const getPaciente = (_, res) => {
  const q = "SELECT * FROM paciente";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addPaciente = (req, res) => {
  const q = "INSERT INTO paciente (`nome`, `fone`, `data`) VALUES (?)";

  const values = [req.body.nome, req.body.fone, req.body.data];

  db.query(q, [values], (err) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Paciente adicionado com sucesso.");
  });
};

export const updatePaciente = (req, res) => {
  const q =
    "UPDATE paciente SET `nome` = ?, `fone` = ?, `data` = ? WHERE id = ?";

  const values = [req.body.nome, req.body.fone, req.body.data];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Paciente atualizado com sucesso.");
  });
};

export const deletePaciente = (req, res) => {
  const q = "DELETE FROM paciente WHERE id = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Paciente deletado com sucesso.");
  });
};
