import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import {
  FormContainer,
  InputArea,
  Input,
  Label,
  Button,
} from "../../styles/form";
const Form = ({ getPacis, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const Paci = ref.current;

      Paci.nome.value = onEdit.nome;
      Paci.fone.value = onEdit.fone;
      Paci.data.value = onEdit.data;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Paci = ref.current;

    if (!Paci.nome.value || !Paci.fone.value || !Paci.data.value) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/paciente/" + onEdit.id, {
          nome: Paci.nome.value,
          fone: Paci.fone.value,
          data: Paci.data.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800/paciente", {
          nome: Paci.nome.value,
          fone: Paci.fone.value,
          data: Paci.data.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    Paci.nome.value = "";
    Paci.fone.value = "";
    Paci.data.value = "";

    setOnEdit();
    getPacis();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input name="fone" />
      </InputArea>
      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input name="data" type="date" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
