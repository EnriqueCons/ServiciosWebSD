import getPool, { sql } from '../config/db.js';

export const getProductosModel = async () => {
    const pool = await getPool();
    const result = await pool.request()
        .query('SELECT * FROM productos ORDER BY id ASC');
    return result.recordset;
}

export const getProductoByIdModel = async (id) => {
    const pool = await getPool();
    const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM productos WHERE id = @id');
    return result.recordset[0];
}

export const createProductoModel = async ({ nombre, precio }) => {
    const pool = await getPool();
    const result = await pool.request()
        .input('nombre', sql.VarChar, nombre)
        .input('precio', sql.Decimal(10, 2), precio)
        .query(`
            INSERT INTO productos (nombre, precio) 
            OUTPUT INSERTED.*
            VALUES (@nombre, @precio)
        `);
    return result.recordset[0];
}

export const updateProductoModel = async (id, nombre, precio) => {
    const pool = await getPool();
    const result = await pool.request()
        .input('id', sql.Int, id)
        .input('nombre', sql.VarChar, nombre)
        .input('precio', sql.Decimal(10, 2), precio)
        .query(`
            UPDATE productos 
            SET nombre = @nombre, 
                precio = @precio 
            OUTPUT INSERTED.*
            WHERE id = @id
        `);
    return result.recordset[0];
}

export const deleteProductoModel = async (id) => {
    const pool = await getPool();
    const result = await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM productos OUTPUT DELETED.* WHERE id = @id');
    return result.recordset[0];
}