import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

export const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

export const Label = styled.label``;

export const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;
export const Container = styled.div`
  width: calc(100% - 250px); /* ajusta conforme a largura da tua sidebar */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 40px 0;
  box-sizing: border-box;
`;

export const Title = styled.h2`
   {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
    margin-bottom: 40px;
    color: #0077ffff;
    text-align: center;
  }
`;
