import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ChessContextProvider } from "./context/ChessContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChessContextProvider>
      <App />
    </ChessContextProvider>
  </StrictMode>
);
