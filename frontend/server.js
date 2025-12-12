import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Headers para PWA
app.use((req, res, next) => {
  res.setHeader('Service-Worker-Allowed', '/');
  next();
});

// Servir archivos estáticos desde dist
app.use(express.static(path.join(__dirname, 'dist')));

// Todas las rutas van al index.html - CAMBIO AQUÍ
app.use((req, res) => {  // ← Cambiar app.get('*') por app.use()
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`PWA corriendo en puerto ${PORT}`);
});