import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./App.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



// import React from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App";
// import "./App.css";

// const rootElement = document.getElementById("root");

// if (!rootElement) {
//   throw new Error('Root element "#root" not found');
// }

// createRoot(rootElement).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
