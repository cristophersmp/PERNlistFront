import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Log from "../components/Log";
import Registro from "../components/Registro";
import { Box, Container, Typography } from "@mui/material";
import FingerprintOutlinedIcon from "@mui/icons-material/FingerprintOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

function InicioSesion() {
  const [open, setOpen] = useState(false);
  const [component, setComponent] = useState(null);

  const toggleDrawer = (component) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(!open);
    setComponent(component);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Typography
        sx={{
          display: "flex",
          position: "sticky",
          justifyContent: "center",
        }}
      >
        INICIO DE SESION
      </Typography>
      <Box
        sx={{
          p: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          padding: "0px",
        }}
      >
        <Button
          variant="text"
          color="success"
          onClick={toggleDrawer(<Log />)}
          sx={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <LoginOutlinedIcon />
          Login
        </Button>
        <Button
          variant="text"
          color="secondary"
          onClick={toggleDrawer(<Registro onClose={handleClose} />)}
          sx={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <FingerprintOutlinedIcon />
          Registro
        </Button>
        <Drawer anchor="right" open={open} onClose={toggleDrawer(null)}>
          {component}
        </Drawer>
      </Box>
    </Container>
  );
}

export default InicioSesion;
