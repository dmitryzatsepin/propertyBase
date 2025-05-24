// packages/webapp/src/App.tsx
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router"; // Импортируем наш компонент с роутами

function App() {
  return (
    <MantineProvider theme={{}}>
      {" "}
      {/* Передавай свою тему, если есть */}
      <Notifications position="bottom-center" autoClose={5000} limit={5} />
      <BrowserRouter>
        <AppRoutes /> {/* Используем компонент с роутами */}
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
