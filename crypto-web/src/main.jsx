import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import {CoinContextProvider} from "./context/CoinContextProvider.jsx"
ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <CoinContextProvider>
        <App />
      </CoinContextProvider>
    </BrowserRouter>
  
);
