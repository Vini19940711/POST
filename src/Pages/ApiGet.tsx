import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Style/CEstudiate.css";

const StudentSearchComponent = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEstudiante, setSelectedEstudiante] = useState(null);

  // Carga inicial de datos
  useEffect(() => {
    axios
      .get("/api/estudiantes")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los datos:", error);
      });
  }, []);

  // Manejador de búsqueda
  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm
      .trim()
      .replace(/\s+/g, "")
      .toUpperCase();
    const found = data.find(
      (est) =>
        est.Carnet.replace(/\s+/g, "").toUpperCase() === trimmedSearchTerm
    );
    setSelectedEstudiante(found || null);
  };

  // Limpiar búsqueda y seleccionado
  const handleClear = () => {
    setSearchTerm("");
    setSelectedEstudiante(null);
  };

  return (
    <>
      <div className="form-container">
        <h1>Consulta de Alumno</h1>
        <div className="form-group">
          <label>Carnet:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Nombres:</label>
          <input
            type="text"
            value={selectedEstudiante ? selectedEstudiante.Estudiante : ""}
            disabled
          />
        </div>
        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input
            type="text"
            value={selectedEstudiante ? selectedEstudiante.Email : ""}
            disabled
          />
        </div>
        <div className="form-group">
          <label>Sección:</label>
          <input
            type="text"
            value={selectedEstudiante ? selectedEstudiante.Seccion : ""}
            disabled
          />
        </div>
        <div className="button-group">
          <button type="button" onClick={handleSearch}>
            Buscar
          </button>
          <button type="button" onClick={handleClear}>
            Limpiar
          </button>
          <button type="button" onClick={() => window.location.reload()}>
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
};

export default StudentSearchComponent;
