// src/App.tsx
import { MantineProvider, Box } from '@mantine/core';
import { LocationImport } from './features/LocationImport/LocationImport';

function App() {
  return (
    <MantineProvider>
      <LocationImport />
    </MantineProvider>
  );
}

export default App;