import "./App.css";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Container, List } from "@mui/material";
import Directory from "./components/Directory";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <nav className="App-navbar">File Directory System</nav>
      <Container className="App-container">
        <List component="div" disablePadding>
          <Directory name="root" path="root" />
        </List>
      </Container>
    </React.Fragment>
  );
}

export default App;
