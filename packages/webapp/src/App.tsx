// packages/webapp/src/App.tsx
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/Layout/AppLayout/AppLayout";
import { LocationImport } from "./features/LocationImport/LocationImport";

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
    <MantineProvider theme={{}}>
      <Notifications position="bottom-center" autoClose={5000} limit={5} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
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
            <Route path="settings/application" element={<AppSettingsPage />} />
            <Route path="locations" element={<ManageLocationsPage />} />
            <Route path="properties" element={<ManagePropertiesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
