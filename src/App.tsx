import "./App.css";
import { Routes, Route } from "react-router-dom";
import Consulta from "./Pages/ApiGet";
import ConsultaTabla from "./Pages/ApiGetE";
import Menu from "./Pages/Menu";
import Curso from "./Pages/CrearCurso";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/CrearCurso" element={<Curso />} />
        <Route path="/BuscarAlumno" element={<Consulta />} />
        <Route path="/BuscarAlumnoTable" element={<Consulta />} />
      </Routes>
    </>
  );
}

export default App;
