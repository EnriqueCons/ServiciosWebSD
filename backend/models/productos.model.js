import pool from '../config/db.js';

export const getProductosModel = async () => {
    const result = await pool.query(
        `SELECT * FROM productos ORDER BY id ASC`
    );
    return result.rows;
}

export const getProductoByIdModel = async (id) => {
    const result = await pool.query(
        `SELECT * FROM productos WHERE id = $1`, [id]
    );
    return result.rows[0];
}

export const createProductoModel = async ({ nombre, precio }) => {
    const result = await pool.query(
        `INSERT INTO productos (nombre, precio) VALUES ($1, $2) RETURNING *`,
        [nombre, precio]
    );
    return result.rows[0];
}

export const updateProductoModel = async (id, nombre, precio) => {
    const result = await pool.query(
        `UPDATE productos SET nombre = $1, precio = $2 WHERE id = $3 RETURNING *`,
        [nombre, precio, id]
    );
    return result.rows[0];
}

export const deleteProductoModel = async (id) => {
    const result = await pool.query(
        `DELETE FROM productos WHERE id = $1 RETURNING *`,
        [id]
    );
    return result.rows[0];
}