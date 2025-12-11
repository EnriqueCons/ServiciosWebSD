import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: false,
    enableArithAbort: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

let pool = null;

const getPool = async () => {
  try {
    if (!pool) {
      pool = await sql.connect(config);
      console.log('Conectado a SQL Server (Azure)');
    }
    return pool;
  } catch (err) {
    console.error('Error conectando a la base de datos:', err);
    throw err;
  }
};

export default getPool;
export { sql };