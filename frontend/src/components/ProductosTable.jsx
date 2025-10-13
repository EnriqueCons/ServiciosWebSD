import React, { useEffect, useState } from 'react';
import { getProductos, deleteProducto } from '../services/api';

const ProductosTable = ({ onEdit }) => {
  const [productos, setProductos] = useState([]);

  const fetchProductos = async () => {
    const data = await getProductos();
    setProductos(data);
  };

  useEffect(() => { fetchProductos(); }, []);

  const handleDelete = async (id) => {
    const ok = await deleteProducto(id);
    if (ok) fetchProductos();
    else alert('No se pudo eliminar (referenciado o error)');
  };

  return (
    <table border="1" cellPadding="8">
      <thead><tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Acciones</th></tr></thead>
      <tbody>
        {productos.map(p => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.nombre}</td>
            <td>{p.precio}</td>
            <td>
              <button onClick={() => onEdit(p)}>Editar</button>
              <button onClick={() => handleDelete(p.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductosTable;
