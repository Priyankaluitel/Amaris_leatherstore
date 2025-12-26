import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const DIST_FOLDER = join(__dirname, 'browser');

// Serve static files first
app.use(express.static(DIST_FOLDER, { maxAge: '1y' }));

// Fallback: serve index.html only if no file matches
app.use((req, res, next) => {
  const requestedFile = join(DIST_FOLDER, req.path);
  if (existsSync(requestedFile)) {
    res.sendFile(requestedFile);
  } else {
    const indexHtml = join(DIST_FOLDER, 'index.html');
    if (existsSync(indexHtml)) {
      res.sendFile(indexHtml);
    } else {
      res.status(404).send('Angular app not built yet. Run `ng build --configuration production`');
    }
  }
});

// Safe PORT access
const PORT = Number(process.env['PORT'] ?? 4200);
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Serving static files from: ${DIST_FOLDER}`);
});

export default app;

