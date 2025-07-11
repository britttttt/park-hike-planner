
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { App } from "./App.jsx";
import { NPSApiProvider } from "./Services/NPSApiContext.jsx";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <NPSApiProvider>
  <BrowserRouter basename='/<park-hike-planner>/' >
    <App />
  </BrowserRouter>
  </NPSApiProvider>
);
