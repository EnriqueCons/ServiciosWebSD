import { getProductosModel, getProductoByIdModel, createProductoModel, updateProductoModel, deleteProductoModel } from "../models/productos.model.js";

export const getProductos = async (req, res) => {
    try {
        const productos = await getProductosModel();
        res.json(productos);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getProductoById = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await getProductoByIdModel(id);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(producto);
    } catch (error) {
        console.error('Error al obtener producto por ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const createProducto = async (req, res) => {
    const { nombre, precio } = req.body;
    if (!nombre || !precio) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    try {
        const newProducto = await createProductoModel({ nombre, precio });
        res.status(201).json(newProducto);
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const updateProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, precio } = req.body;

    try {
        const updatedProducto = await updateProductoModel(id, nombre, precio);
        if (!updatedProducto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(updatedProducto);
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const deleteProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await deleteProductoModel(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}