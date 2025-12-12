import getPool, { sql } from '../config/db.js';

export const getClientesModel = async () => {
    const pool = await getPool();
    const result = await pool.request()
        .query('SELECT * FROM clientes ORDER BY id ASC');
    return result.recordset;
}

export const getClienteByIdModel = async (id) => {
    const pool = await getPool();
    const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM clientes WHERE id = @id');
    return result.recordset[0];
}

export const createClienteModel = async ({ nombres, apellidos, correo, id_producto, total }) => {
    const pool = await getPool();
    const result = await pool.request()
        .input('nombres', sql.VarChar, nombres)
        .input('apellidos', sql.VarChar, apellidos)
        .input('correo', sql.VarChar, correo)
        .input('id_producto', sql.Int, id_producto)
        .input('total', sql.Decimal(10, 2), total)
        .query(`
            INSERT INTO clientes (nombres, apellidos, correo, id_producto, total) 
            OUTPUT INSERTED.*
            VALUES (@nombres, @apellidos, @correo, @id_producto, @total)
        `);
    return result.recordset[0];
}

export const updateClienteModel = async (id, { nombres, apellidos, correo, id_producto, total }) => {
    const pool = await getPool();
    const result = await pool.request()
        .input('id', sql.Int, id)
        .input('nombres', sql.VarChar, nombres)
        .input('apellidos', sql.VarChar, apellidos)
        .input('correo', sql.VarChar, correo)
        .input('id_producto', sql.Int, id_producto)
        .input('total', sql.Decimal(10, 2), total)
        .query(`
            UPDATE clientes 
            SET nombres = @nombres, 
                apellidos = @apellidos, 
                correo = @correo, 
                id_producto = @id_producto, 
                total = @total 
            OUTPUT INSERTED.*
            WHERE id = @id
        `);
    return result.recordset[0];
}

export const deleteClienteModel = async (id) => {
    const pool = await getPool();
    const result = await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM clientes OUTPUT DELETED.* WHERE id = @id');
    return result.recordset[0];
}