import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography variant="h4" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: "none", color: "#ffff" }}>
                <span style={{ fontFamily: "Anton" }}>PERN</span>{" "}
                <span style={{ fontFamily: "Gloria Hallelujah" }}>list</span>
              </Link>
            </Typography>
            <Button
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              variant="text"
              color="warning"
              onClick={() => navigate("/nuevatarea")}
            >
              <AddTaskOutlinedIcon />
              Nueva Tarea
            </Button>
            {isAuthenticated ? (
              <>
                <Button
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  variant="text"
                  color="secondary"
                  onClick={() => navigate("/iniciotareas")}
                >
                  <AssignmentOutlinedIcon />
                  Mis Tareas
                </Button>
                <Button
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  variant="text"
                  color="error"
                  onClick={handleLogout}
                >
                  <LogoutOutlinedIcon />
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <Button
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                variant="text"
                color="success"
                onClick={() => navigate("/iniciosesion")}
              >
                <LoginOutlinedIcon />
                <p>Iniciar sesión</p>
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Navbar;
