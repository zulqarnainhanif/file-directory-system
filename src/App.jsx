import React from "react";

import { SnackbarProvider } from "notistack";

import "./App.css";
import Directory from "./components/Directory";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <nav className="App-navbar">File Directory System</nav>
      <div className="App-container">
        <Directory name="root" path="root" />
      </div>
    </SnackbarProvider>
  );
}

export default App;
