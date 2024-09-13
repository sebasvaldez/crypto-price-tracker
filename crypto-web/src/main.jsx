import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CoinContextProvider } from "./context/CoinContextProvider.jsx";
import { AuthContextProvider } from "./context/AuthContextProvider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <CoinContextProvider>
        <App />
      </CoinContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
