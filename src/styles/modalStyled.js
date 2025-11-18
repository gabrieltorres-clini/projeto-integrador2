import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const Modal = styled.div`
  width: 420px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

export const Botoes = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

export const BtnSalvar = styled.button`
  padding: 8px 16px;
  background: #4caf50;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

export const BtnCancelar = styled.button`
  padding: 8px 16px;
  background: #777;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

export const BtnDeletar = styled.button`
  margin-left: 10px;
  padding: 6px 10px;
  background: #e53935;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

export const EventoLinha = styled.div`
  margin-top: 10px;
  padding: 10px;
  background: #f2f2f2;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
`;
