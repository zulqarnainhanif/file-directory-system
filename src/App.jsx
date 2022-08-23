import "./App.css";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Container, List } from "@mui/material";
import Directory from "./components/Directory";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <CssBaseline />
      <nav className="App-navbar">File Directory System</nav>
      <Container className="App-container">
        <List component="div" disablePadding>
          <Directory name="root" path="root" />
        </List>
      </Container>
    </SnackbarProvider>
  );
}

export default App;
