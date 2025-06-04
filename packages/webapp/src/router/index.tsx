// packages/webapp/src/router/index.tsx
import { Routes, Route, Outlet } from "react-router-dom";
import { AppLayout } from "../components/Layout/AppLayout/AppLayout";
import PropertiesPage from "../pages/PropertiesPage";
import PropertyDetailsPage from "../pages/PropertyDetailsPage";
import { LocationImport } from "../features/LocationImport";


const DashboardPage = () => <div>Dashboard Page Content</div>;
const AnalyticsReportsPage = () => <div>Analytics Reports Page Content</div>;
const ReleasesPage = () => <div>Releases Page Content</div>;
const AccountSettingsPage = () => <div>Account Settings Page Content</div>;
const AppSettingsPage = () => <div>Application Settings Page Content</div>;
const ManageLocationsPage = () => <div>Manage Locations Page Content</div>;
const ManagePropertiesPage = () => <div>Manage Properties Page Content</div>;
const NotFoundPage = () => <div>404 - Page Not Found</div>;

// Обертка для страниц, которые должны использовать AppLayout
const LayoutWrapper = () => (
  <AppLayout>
    <Outlet />
  </AppLayout>
);

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutWrapper />}>
        <Route index element={<DashboardPage />} />
        <Route path="analytics/reports" element={<AnalyticsReportsPage />} />
        <Route path="releases" element={<ReleasesPage />} />
        <Route path="locations/import" element={<LocationImport />} />
        <Route path="locations/manage" element={<ManageLocationsPage />} />{" "}
        <Route path="properties" element={<PropertiesPage />} />
        <Route
          path="properties/:propertyId"
          element={<PropertyDetailsPage />}
        />
        {/* Закомментируем старую ManagePropertiesPage, если PropertiesPage ее заменяет для списка */}
        {/* <Route path="properties/manage" element={<ManagePropertiesPage />} />  */}
        {/* <Route path="settings/account" element={<AccountSettingsPage />} /> */}
        {/* <Route path="settings/security" element={<div>Security Settings Placeholder</div>} /> */}
        {/* <Route path="settings/application" element={<AppSettingsPage />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      {/* Сюда можно добавить роуты, которые не используют AppLayout (например, страница логина) */}
      {/* <Route path="/login" element={<LoginPage />} /> */}
    </Routes>
  );
};
