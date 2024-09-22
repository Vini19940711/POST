import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../Style/MEstudiante.css"; // Importar el CSS Module

const Estudiantes = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/estudiantes")
      .then((response) => {
        setData(response.data); // Aquí accedemos directamente al array
        setFilteredData(response.data); // Inicialmente muestra todos los datos
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los datos:", error);
      });
  }, []);

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim(); // Eliminar espacios adicionales en el término de búsqueda
    const filtered = data.filter(
      (est) =>
        est.Carnet &&
        est.Carnet.replace(/\s+/g, "").includes(
          trimmedSearchTerm.replace(/\s+/g, "")
        )
    );
    setFilteredData(filtered);
  };

  const handleClear = () => {
    setSearchTerm("");
    setFilteredData(data); // Restaurar la lista completa
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.heading}>Consulta de alumnos</h1>
      <div className={styles.formGroup}>
        <label className={styles.label}>Carnet:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.buttonGroup}>
        <button onClick={handleSearch} className={styles.button}>
          Buscar
        </button>
        <button onClick={handleClear} className={styles.button}>
          Limpiar
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Carnet</th>
            <th>Estudiante</th>
            <th>Correo Electrónico</th>
            <th>Sección</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((estudiante) => (
            <tr key={estudiante._id}>
              <td>{estudiante.Carnet}</td>
              <td>{estudiante.Estudiante}</td>
              <td>{estudiante.Email}</td>
              <td>{estudiante.Seccion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Estudiantes;
