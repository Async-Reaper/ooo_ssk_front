import App from "@app/App";
import { StoreProvider } from "@app/providers/StoreProvider";
import "@app/styles/index.scss";
import { AlertsSystem } from "@entities/Alerts";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StoreProvider>
      <App />
      <AlertsSystem />
    </StoreProvider>
  </BrowserRouter>,
);
