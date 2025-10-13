const API_BASE = import.meta.env.VITE_API_URL;

export const getProductos = async () => {
  const res = await fetch(`${API_BASE}/productos`);
  return res.json();
};

export const createProducto = async (p) => {
  const res = await fetch(`${API_BASE}/productos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(p)
  });
  return res.json();
};

export const updateProducto = async (id, p) => {
  const res = await fetch(`${API_BASE}/productos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(p)
  });
  return res.json();
};

export const deleteProducto = async (id) => {
  const res = await fetch(`${API_BASE}/productos/${id}`, { method: 'DELETE' });
  return res.ok;
};

export const getClientes = async () => {
    const res = await fetch(`${API_BASE}/clientes`);
    return res.json();
};

export const createCliente = async (cliente) => {
    const res = await fetch(`${API_BASE}/clientes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente),
    });
    return res.json();
};

export const updateCliente = async (id, cliente) => {
    const res = await fetch(`${API_BASE}/clientes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente),
    });
    return res.json();
};

export const deleteCliente = async (id) => {
    const res = await fetch(`${API_BASE}/clientes/${id}`, {
        method: "DELETE",
    });
    return res.ok;
};
