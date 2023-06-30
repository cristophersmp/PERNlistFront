import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Formulario() {
  const [tarea, setTarea] = useState({
    titulo: "",
    descripcion: "",
  });
  const [loading, setLoading] = useState(false);
  const [editar, setEditar] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const handleChange = (e) =>
    setTarea({ ...tarea, [e.target.name]: e.target.value });

  const cragarTareaUnica = async (id) => {
    const respuesta = await fetch(
      `https://per-nlist-front.vercel.app/tareas/${id}`
    );
    const datos = await respuesta.json();
    setTarea({ titulo: datos.titulo, descripcion: datos.descripcion });
    setEditar(true);
  };

  useEffect(() => {
    if (params.id) {
      cragarTareaUnica(params.id);
    }
  }, [params.id]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      if (editar) {
        const respuesta = await fetch(
          `https://per-nlist-front.vercel.app/tareas/${params.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tarea),
          }
        );
        const datos = await respuesta.json();
        console.log(datos);
      } else {
        console.log(tarea);
        console.log(JSON.stringify(tarea));
        await fetch("https://per-nlist-front.vercel.app/tareas", {
          method: "POST",
          body: JSON.stringify(tarea),
          headers: { "Content-Type": "application/json" },
        });
      }
      setLoading(false);
      navigate("/iniciotareas");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      <Grid item xs={3}>
        <Card
          sx={{ mt: 5 }}
          style={{
            backgroundColor: "#dddddd",
            padding: "1rem",
          }}
        >
          <Typography textAlign="center" color={"#616161"}>
            {editar ? "Editar tarea" : "Crear tarea"}
          </Typography>

          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                id="standard-basic"
                label="Nombre de la tarea"
                variant="standard"
                margin="dense"
                name="titulo"
                value={tarea.titulo}
                onChange={handleChange}
              />

              <TextField
                id="outlined-multiline-flexible"
                label="Descripción"
                multiline
                maxRows={4}
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="descripcion"
                value={tarea.descripcion}
                onChange={handleChange}
              />

              <Button
                variant="contained"
                color="success"
                type="submit"
                sx={{ margin: "10px" }}
                disabled={!tarea.titulo || !tarea.descripcion}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : editar ? (
                  "Editar"
                ) : (
                  "Crear"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Formulario;
