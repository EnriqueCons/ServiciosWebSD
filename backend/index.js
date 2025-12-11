import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import getPool from './config/db.js';

// Importar las rutas
import clientesRoutes from './routes/clientes.routes.js';
import productosRoutes from './routes/productos.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Verificar conexión al iniciar
getPool()
  .then(() => console.log('Base de datos conectada'))
  .catch(err => console.error('Error de conexión:', err));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando correctamente' });
});

// Registrar las rutas - IMPORTANTE: agregar /api como prefijo
app.use('/api', clientesRoutes);
app.use('/api', productosRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});