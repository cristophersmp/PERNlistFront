import React from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, TextField, Button, Box } from "@mui/material";

const registrarUsuario = async (data) => {
  try {
    const response = await fetch(`pernlist-back.vercel.app/post/registro`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(response);
    const responseData = await response.json();
    if (response.ok) {
      alert(`Bienvenid@ ${data.nombre}`);
    } else {
      alert("Algo salió mal, intente de nuevo");
    }
    return responseData;
  } catch (error) {
    console.error(error);
    throw new Error("Error al registrar el usuario");
  }
};

const Registro = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await registrarUsuario(data);
    onClose();
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={2}>
            <TextField
              {...register("nombre", { required: true })}
              label="Nombre"
              name="nombre"
              error={!!errors.nombre}
              helperText={errors.nombre && "Este campo es requerido"}
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              {...register("correo", { required: true })}
              type="email"
              label="Email"
              name="correo"
              error={!!errors.correo}
              helperText={errors.correo && "Este campo es requerido"}
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              {...register("contrasena", { required: true })}
              type="password"
              label="Password"
              name="contrasena"
              error={!!errors.contrasena}
              helperText={errors.contrasena && "Este campo es requerido"}
              fullWidth
            />
          </Box>
          <Button type="submit" variant="contained" color="primary">
            Registrarse
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Registro;
