import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Load the Sass file
require("./style.scss");

import App from "./app";

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
