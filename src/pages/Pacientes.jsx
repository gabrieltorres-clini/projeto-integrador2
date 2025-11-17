import GlobalStyle from "../styles/global";
import { Container, Title } from "../styles/form";
import Form from "./components/Form";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function App() {
  const [Pacis, setPaci] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getPacis = async () => {
    try {
      const res = await axios.get("http://localhost:8800/paciente");
      setPaci(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getPacis();
  }, []);

  return (
    <>
      <Container>
        <Title>Pacientes</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getPacis={getPacis} />
        <Grid setOnEdit={setOnEdit} pacis={Pacis} setPaci={setPaci} />
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
      <GlobalStyle />
    </>
  );
}

export default App;
