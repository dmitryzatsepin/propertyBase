import express from "express";
// Пример импорта из shared (раскомментируйте, когда типы будут использоваться)
// import { ExampleResponseType } from '@my-org/shared/types';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json()); // Middleware to parse JSON bodies

app.get("/api", (req, res) => {
  res.json({ message: "Hello from Backend API!" });
});

/*
app.get('/api/shared-example', (req, res) => {
  const response: ExampleResponseType = {
    id: 'shared-123',
    value: 'Data using shared type',
    timestamp: Date.now()
  };
  res.json(response);
});
*/

app.listen(port, () => {
  console.log(`Backend server listening on http://localhost:${port}`);
});
