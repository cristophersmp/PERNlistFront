import React, { useState } from "react";
import { Card, CardContent, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Log = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ correo: "", contrasena: "" });
  const [formErrors, setFormErrors] = useState({});
  const [token, setToken] = useState("");

  // Maneja el cambio en los campos del formulario y actualiza el estado local
  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  // Valida los datos del formulario antes de enviarlos
  const validateForm = () => {
    let errors = {};
    if (!formData.correo) errors.correo = "Este campo es requerido";
    if (!formData.contrasena) errors.contrasena = "Este campo es requerido";
    return errors;
  };

  // Maneja el envío del formulario
  const handleLogin = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const res = await fetch(
          `https://per-nlist-front.vercel.app/post/login`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const response = await res.json();
        setToken(response.token);
        localStorage.setItem("token", response.token);
        login(response.token);
        navigate("/iniciotareas");
      } catch (error) {
        console.error(error);
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleLogin}>
          <Box mb={2}>
            <TextField
              type="text"
              label="Email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              error={!!formErrors.correo}
              helperText={formErrors.correo}
            />
          </Box>
          <Box mb={2}>
            <TextField
              type="password"
              label="Password"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              error={!!formErrors.contrasena}
              helperText={formErrors.contrasena}
            />
          </Box>
          <Box mb={2}>
            <Button type="submit" variant="contained" color="primary">
              Iniciar sesión
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default Log;
