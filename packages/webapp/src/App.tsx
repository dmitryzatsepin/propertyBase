// packages/webapp/src/App.tsx
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Добавил Navigate
import { AppLayout } from "./components/Layout/AppLayout/AppLayout"; // Наш основной Layout
import { LocationImport } from "./features/LocationImport/LocationImport"; // Страница импорта Excel

// Заглушки для других страниц (создай простые компоненты для них)
const DashboardPage = () => <div>Dashboard Page Content</div>;
const AnalyticsReportsPage = () => <div>Analytics Reports Page Content</div>;
const ReleasesPage = () => <div>Releases Page Content</div>;
const AccountSettingsPage = () => <div>Account Settings Page Content</div>;
const AppSettingsPage = () => <div>Application Settings Page Content</div>;
const ManageLocationsPage = () => <div>Manage Locations Page Content</div>;
const ManagePropertiesPage = () => <div>Manage Properties Page Content</div>;
const NotFoundPage = () => <div>404 - Page Not Found</div>;

function App() {
  return (
    <MantineProvider
      theme={
        {
          // Твоя тема Mantine
        }
      }
    >
      <Notifications position="top-right" />
      <BrowserRouter>
        <Routes>
          {/* AppLayout является родительским маршрутом для всех страниц с навбаром */}
          <Route path="/" element={<AppLayout />}>
            {/* Дочерние маршруты, которые будут рендериться в <Outlet /> внутри AppLayout */}
            {/* Главная страница (Dashboard) */}
            <Route index element={<DashboardPage />} />
            {/* 'index' означает, что этот компонент будет рендериться, когда путь совпадает с родительским ('/') */}
            {/* Маршруты на основе navigation.config.ts */}
            {/* Для раздела 'Home' (был 'Dashboard' с icon: IconGauge) -> path: '/' - уже покрыто index */}
            <Route
              path="analytics/reports"
              element={<AnalyticsReportsPage />}
            />
            <Route path="releases" element={<ReleasesPage />} />
            <Route path="import/locations-excel" element={<LocationImport />} />
            <Route path="settings/account" element={<AccountSettingsPage />} />
            <Route
              path="settings/security"
              element={<div>Security Settings Placeholder</div>}
            />{" "}
            {/* Пример для новой ссылки */}
            <Route path="settings/application" element={<AppSettingsPage />} />
            <Route path="locations" element={<ManageLocationsPage />} />
            <Route path="properties" element={<ManagePropertiesPage />} />
            {/* Маршрут для 404 страницы внутри AppLayout */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Здесь могут быть маршруты, не использующие AppLayout, например, страница логина */}
          {/* <Route path="/login" element={<LoginPage />} /> */}
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
