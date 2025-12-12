import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import pool from './config/db.js';
import routesProductos from './routes/productos.routes.js';
import routesClientes from './routes/clientes.routes.js';

import cors from 'cors';

const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://frontend-sw-sd.azurewebsites.net',
    'https://pwa-frontend-sd.azurewebsites.net' 
  ],
  credentials: true
}));
app.use(express.json());

app.use((req, res, next) => {
    res.on('finish', () => {
        console.log(`${req.method} ${req.originalUrl} [${res.statusCode}]`);
    });
    next();
});


app.use('/api/', routesProductos);
app.use('/api/', routesClientes);

app.get('/', (req, res) => {
    res.send("Backend conectado");
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

