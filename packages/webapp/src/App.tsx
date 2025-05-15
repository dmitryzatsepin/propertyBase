// src/App.tsx
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { LocationImport } from './features/LocationImport/LocationImport';

function App() {
  return (
    <MantineProvider>
      <Notifications position="top-right" />
      <LocationImport />
    </MantineProvider>
  );
}

export default App;