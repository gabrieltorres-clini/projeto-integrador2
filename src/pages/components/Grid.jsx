import React from "react";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td } from "../../styles/grid";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Grid = ({ pacis, setPaci, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/Paciente/" + id)
      .then(({ data }) => {
        const newArray = pacis.filter((paci) => paci.id !== id);
        setPaci(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Telefone</Th>
          <Th alignCenter>Ações</Th>
        </Tr>
      </Thead>
      <Tbody>
        {pacis?.length > 0 ? (
          pacis.map((item, i) => (
            <Tr key={i}>
              <Td width="40%">{item.nome}</Td>
              <Td width="40%">{item.fone}</Td>
              <Td alignCenter width="20%">
                <FaEdit onClick={() => handleEdit(item)} />
                <FaTrash onClick={() => handleDelete(item.id)} />
              </Td>
            </Tr>
          ))
        ) : (
          <Tr>
            <Td colSpan="3">Nenhum paciente encontrado</Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  );
};

export default Grid;
