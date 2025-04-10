import ReactDOM from "react-dom/client";
import App from "@app/App";
import "@app/styles/index.scss";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "@app/providers/StoreProvider";
import { AlertsSystem } from "@entities/Alerts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StoreProvider>
      <App />
      <AlertsSystem />
    </StoreProvider>
  </BrowserRouter>,
);
