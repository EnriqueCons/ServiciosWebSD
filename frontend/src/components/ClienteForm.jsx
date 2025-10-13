import React, { useState, useEffect } from "react";
import { createCliente, updateCliente, getProductos } from "../services/api";

const ClienteForm = ({ selectedCliente, onSaved }) => {
  const [cliente, setCliente] = useState({ nombres: "", apellidos: "", correo: "", id_producto: "", total: 0 });
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      const prods = await getProductos();
      setProductos(prods);
    };
    load();
    if (selectedCliente) setCliente(selectedCliente);
  }, [selectedCliente]);

  const handleChange = e => setCliente({ ...cliente, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      if (cliente.id) {
        await updateCliente(cliente.id, cliente);
      } else {
        const res = await createCliente(cliente);
        // si el backend devuelve error con status 400, fetch no lanza, debes revisar respuesta:
        if (res && res.error) { setError(res.error); return; }
      }
      setCliente({ nombres: "", apellidos: "", correo: "", id_producto: "", total: 0 });
      onSaved();
    } catch (err) {
      console.error(err);
      setError('Error del servidor');
    }
  };

  return (
    <>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input name="nombres" placeholder="Nombres" value={cliente.nombres} onChange={handleChange} required />
        <input name="apellidos" placeholder="Apellidos" value={cliente.apellidos} onChange={handleChange} required />
        <input name="correo" placeholder="Correo" value={cliente.correo} onChange={handleChange} required />
        <select name="id_producto" value={cliente.id_producto} onChange={handleChange} required>
          <option value="">-- Selecciona producto --</option>
          {productos.map(p => (
            <option key={p.id} value={p.id}>{p.nombre} — ${p.precio}</option>
          ))}
        </select>
        <input name="total" type="number" placeholder="Total" value={cliente.total} onChange={handleChange} required />
        <button type="submit">{cliente.id ? 'Actualizar' : 'Crear'}</button>
      </form>
    </>
  );
};

export default ClienteForm;
