import { StyledEngineProvider } from "@mui/material";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StyledEngineProvider injectFirst>
    <App />
  </StyledEngineProvider>
);
