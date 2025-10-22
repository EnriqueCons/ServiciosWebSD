import React, { useState } from "react";
import ClientesTable from "./components/ClientesTable";
import ClienteForm from "./components/ClienteForm";
import ProductosTable from "./components/ProductosTable";
import ProductoForm from "./components/ProductoForm";

export default function App() {
  const [tab, setTab] = useState("clientes");

  const [selectedCliente, setSelectedCliente] = useState(null);
  const [selectedProducto, setSelectedProducto] = useState(null);

  const [reloadClientes, setReloadClientes] = useState(0);
  const [reloadProductos, setReloadProductos] = useState(0);

  const handleEditCliente = (cliente) => {
    setSelectedCliente(cliente);
    setTab("clientes");
  };

  const handleSavedCliente = () => {
    setSelectedCliente(null);
    setReloadClientes(n => n + 1);
  };

  const handleEditProducto = (producto) => {
    setSelectedProducto(producto);
    setTab("productos");
  };

  const handleSavedProducto = () => {
    setSelectedProducto(null);
    setReloadProductos(n => n + 1);
  };

  return (
    <div style={{ maxWidth: 1000, margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0 }}>CRUD Clientes y Productos</h1>
        <div>
          <button onClick={() => setTab("clientes")} style={{ marginRight: 8, padding: "6px 12px", background: tab === "clientes" ? "#1976d2" : "#eee", color: tab === "clientes" ? "#fff" : "#000", border: "none", borderRadius: 4 }}>
            Clientes
          </button>
          <button onClick={() => setTab("productos")} style={{ padding: "6px 12px", background: tab === "productos" ? "#1976d2" : "#eee", color: tab === "productos" ? "#fff" : "#000", border: "none", borderRadius: 4 }}>
            Productos
          </button>
        </div>
      </header>

      <main style={{ marginTop: 20 }}>
        {tab === "clientes" && (
          <>
            <section style={{ marginBottom: 20 }}>
              <h2 style={{ marginTop: 0 }}>{selectedCliente ? "Editar Cliente" : "Crear Cliente"}</h2>
              <ClienteForm selectedCliente={selectedCliente} onSaved={handleSavedCliente} />
            </section>

            <section>
              <h2 style={{ marginTop: 0 }}>Lista de Clientes</h2>
              {/* ClientesTable debe aceptar props: onEdit y reload (para forzar fetch interno en useEffect) */}
              <ClientesTable onEdit={handleEditCliente} reload={reloadClientes} />
            </section>
          </>
        )}

        {tab === "productos" && (
          <>
            <section style={{ marginBottom: 20 }}>
              <h2 style={{ marginTop: 0 }}>{selectedProducto ? "Editar Producto" : "Crear Producto"}</h2>
              <ProductoForm selectedProducto={selectedProducto} onSaved={handleSavedProducto} />
            </section>

            <section>
              <h2 style={{ marginTop: 0 }}>Lista de Productos</h2>
              <ProductosTable onEdit={handleEditProducto} reload={reloadProductos} />
            </section>
          </>
        )}
      </main>
    </div>
  );
}
