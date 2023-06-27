import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container as MuiContainer } from "@mui/material";
//contextos
import { useAuth } from "./context/AuthContext";
//componentes
import ListaTareas from "./components/ListaTareas";
import Formulario from "./components/Formulario";
import Navbar from "./components/Navbar";
//vistas- componentes
import Inicio from "./views/Inicio";
import InicioSesion from "./views/InicioSesion";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <React.Fragment>
      <Navbar />
      <MuiContainer style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="iniciosesion" element={<InicioSesion />} />
          <Route
            path="iniciotareas"
            element={
              isAuthenticated ? (
                <ListaTareas />
              ) : (
                <Navigate to="/iniciosesion" />
              )
            }
          />
          <Route
            path="nuevatarea"
            element={
              isAuthenticated ? <Formulario /> : <Navigate to="/iniciosesion" />
            }
          />
          <Route
            path="nuevatarea/:id/edicion"
            element={
              isAuthenticated ? <Formulario /> : <Navigate to="/iniciosesion" />
            }
          />
        </Routes>
      </MuiContainer>
    </React.Fragment>
  );
}

export default App;
