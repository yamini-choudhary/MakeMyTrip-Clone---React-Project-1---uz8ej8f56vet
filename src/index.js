import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { ListenerProvider } from "./components/Slider1/ListenerProvider";
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
    <ListenerProvider>
    <App />
    </ListenerProvider>
    </BrowserRouter>
  </StrictMode>
);
