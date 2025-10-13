import React, { useEffect, useState } from "react";
import { getClientes, deleteCliente } from "../services/api";

const ClientesTable = ({ onEdit }) => {
    const [clientes, setClientes] = useState([]);

    const fetchClientes = async () => {
        const data = await getClientes();
        setClientes(data);
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    const handleDelete = async (id) => {
        const ok = await deleteCliente(id);
        if (ok) fetchClientes();
    };

    return (
        <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Correo</th>
                    <th>Artículo</th>
                    <th>Total</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {clientes.map((c) => (
                    <tr key={c.id}>
                        <td>{c.id}</td>
                        <td>{c.nombres}</td>
                        <td>{c.apellidos}</td>
                        <td>{c.correo}</td>
                        <td>{c.id_producto}</td>
                        <td>{c.total}</td>
                        <td>
                            <button onClick={() => onEdit(c)}>Editar</button>{" "}
                            <button onClick={() => handleDelete(c.id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ClientesTable;
