import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

pool.connect().then(client =>{
    console.log('Conexión a PostgreSQL exitosa');
    client.release();
}).catch(err => {
    console.error('Error al conectar a PostgreSQL', err)
});

export default pool;
