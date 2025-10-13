import { getClientesModel, getClienteByIdModel, createClienteModel, updateClienteModel, deleteClienteModel } from "../models/clientes.model.js";


export const getClientes = async (req, res) => {
    try {
        const clientes = await getClientesModel();
        res.json(clientes);
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getClienteById = async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await getClienteByIdModel(id);
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json(cliente);
    } catch (error) {
        console.error('Error al obtener cliente por ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const createCliente = async (req, res) => {
    const { nombres, apellidos, correo, id_producto, total } = req.body;
    if (!nombres || !apellidos || !correo) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }
    const clienteData = { nombres, apellidos, correo, id_producto: id_producto || null, total: total || 0 };
    
    try {
        const newCliente = await createClienteModel(clienteData);
        res.status(201).json(newCliente);
    } catch (error) {
        console.error('Error al crear cliente:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const updateCliente = async (req, res) => {
    const { id } = req.params;
    const { nombres, apellidos, correo, id_producto, total } = req.body;

    if (!nombres || !apellidos || !correo) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const clienteData = { nombres, apellidos, correo, id_producto: id_producto || null, total: total || 0 };

    try {
        const updatedCliente = await updateClienteModel(id, clienteData);
        if (!updatedCliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json(updatedCliente);
    } catch (error) {
        console.error('Error al actualizar cliente:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const deleteCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await deleteClienteModel(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json({ message: 'Cliente eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}