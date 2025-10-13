import React, { useState, useEffect } from "react";
import { createProducto, updateProducto } from "../services/api";

const ProductoForm = ({ selectedProducto, onSaved }) => {
  const [producto, setProducto] = useState({ nombre: "", precio: 0 });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (selectedProducto) setProducto({ nombre: selectedProducto.nombre, precio: selectedProducto.precio, id: selectedProducto.id });
    else setProducto({ nombre: "", precio: 0 });
  }, [selectedProducto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto(s => ({ ...s, [name]: name === "precio" ? Number(value) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      if (!producto.nombre || producto.precio == null) { setError("Completa los campos"); setSaving(false); return; }
      if (producto.id) {
        const res = await updateProducto(producto.id, producto);
        if (res?.error) setError(res.error); else onSaved();
      } else {
        const res = await createProducto(producto);
        if (res?.error) setError(res.error); else onSaved();
      }
    } catch (err) {
      console.error("Error guardando producto:", err);
      setError("Error del servidor");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
      <input name="nombre" placeholder="Nombre" value={producto.nombre} onChange={handleChange} required />
      <input name="precio" type="number" placeholder="Precio" value={producto.precio} onChange={handleChange} required />
      <button type="submit" disabled={saving}>{producto.id ? "Actualizar" : "Crear"}</button>
      {error && <div style={{ color: "red", width: "100%" }}>{error}</div>}
    </form>
  );
};

export default ProductoForm;
