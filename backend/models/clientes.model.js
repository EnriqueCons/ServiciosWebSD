import pool from '../config/db.js';

export const getClientesModel = async () => {
    const result = await pool.query(
        `SELECT * FROM clientes ORDER BY id ASC`
    );
    return result.rows;
}

export const getClienteByIdModel = async (id) => {
    const result = await pool.query(
        `SELECT * FROM clientes WHERE id = $1`, [id]
    );
    return result.rows[0];
}

export const createClienteModel = async ({ nombres, apellidos, correo, id_producto, total }) => {
    const result = await pool.query(
        `INSERT INTO clientes (nombres, apellidos, correo, id_producto, total) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [nombres, apellidos, correo, id_producto, total]
    );
    return result.rows[0];
}

export const updateClienteModel = async (id, { nombres, apellidos, correo, id_producto, total }) => {
    const result = await pool.query(
        `UPDATE clientes SET nombres = $1, apellidos = $2, correo = $3, id_producto = $4, total = $5 WHERE id = $6 RETURNING *`,
        [nombres, apellidos, correo, id_producto, total, id]
    );
    return result.rows[0];
}

export const deleteClienteModel = async (id) => {
    const result = await pool.query(
        `DELETE FROM clientes WHERE id = $1 RETURNING *`,
        [id]
    );
    return result.rows[0];
}