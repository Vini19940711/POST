import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "../Style/ICurso.css"; // Importar los estilos

interface Curso {
  nombre: string;
  creditos: number;
  descripcion: string;
}

const CursoForm: React.FC = () => {
  const [formData, setFormData] = useState<Curso>({
    nombre: "",
    creditos: 0,
    descripcion: "",
  });

  const [message, setMessage] = useState<string>(""); // Para mostrar mensajes de éxito o error

  // Manejo de cambios en los campos del formulario
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "creditos" ? parseInt(value) : value, // Parsear el campo de créditos como número
    });
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Evitar el comportamiento predeterminado del formulario
    try {
      // Enviar la petición POST a la API
      const response = await axios.post("/api/cursos", formData);

      // Desestructurar los datos devueltos por la API
      const { nombre, creditos, descripcion, _id, createdAt } =
        response.data.Cursos;

      // Mostrar mensaje de éxito
      setMessage(
        `Curso creado con éxito:
        Nombre: ${nombre}
        Créditos: ${creditos}
        Descripción: ${descripcion}
        ID: ${_id}
        Creado el: ${new Date(createdAt).toLocaleString()}`
      );

      // Resetear el formulario
      setFormData({
        nombre: "",
        creditos: 0,
        descripcion: "",
      });
    } catch (error) {
      // Mostrar mensaje de error si algo sale mal
      setMessage("Error al crear el curso");
    }
  };

  return (
    <div className="form-container">
      <h1>Ingresar Curso</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Créditos:</label>
          <input
            type="number"
            name="creditos"
            value={formData.creditos}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <input
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Crear Curso</button>
      </form>

      {/* Mostrar el mensaje de éxito o error */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default CursoForm;
