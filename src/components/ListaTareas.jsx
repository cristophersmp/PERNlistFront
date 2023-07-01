import { Button, Card, CardContent, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function ListaTareas() {
  const [tareas, setTareas] = useState([]);
  const navigate = useNavigate();

  const cargarTareas = async () => {
    const res = await fetch("https://pernlist-back.vercel.app/tareas");
    const datos = await res.json();
    setTareas(datos);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://pernlist-back.vercel.app/tareas/${id}`, {
        method: "DELETE",
      });
      setTareas(tareas.filter((tarea) => tarea.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  return (
    <>
      <h1>Lista de tareas</h1>
      {tareas.map((tarea) => (
        <Card
          style={{
            marginBottom: "1rem",
            backgroundColor: "#dddddd",
          }}
          key={tarea.id}
        >
          <CardContent
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <Typography>{tarea.titulo}</Typography>
              <Typography>{tarea.descripcion}</Typography>
            </div>

            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => {
                  navigate(`/nuevatarea/${tarea.id}/edicion`);
                }}
                style={{ magin: ".25rem" }}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => {
                  handleDelete(tarea.id);
                }}
                style={{ magin: ".25rem" }}
              >
                Eliminar
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default ListaTareas;
