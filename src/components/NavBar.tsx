import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import "../css/nav-bar.css";

function NavBar() {
  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <img src="/logo.png" alt="recipe converter logo" />
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
