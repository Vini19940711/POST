import React from "react";
import { Link } from "react-router-dom";
import "../Style/Menu.css"; // Importa los estilos

const Menu = () => {
  return (
    <div className="menu-container">
      <button className="menu-title">Menu</button>
      <Link to="/BuscarAlumno">
        <button className="menu-button">Consulta Alumno</button>
      </Link>
      <Link to="/CrearCurso">
        <button className="menu-button">Ingreso Curso</button>
      </Link>
    </div>
  );
};

export default Menu;
