import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BuscadorRedireccion() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const manejarBusqueda = (e) => {
        e.preventDefault();

        const ruta = query.trim().toLowerCase();

        switch (ruta) {
            case "empleados":
                navigate("/empleados");
                break;
            case "movimientos":
                navigate("/movimientos");
                break;
            case "periodos":
                navigate("/periodospago");
                break;
            case "nominas":
                navigate("/calculonomina");
                break;
            case "historial":
            case "historial nomina":
                navigate("/historial");
                break;
            case "dashboard":
                navigate("/dashboard");
                break;
            default:
                alert(
                    "Página no encontrada. Intenta con: empleados, nominas, historial..."
                );
        }

        setQuery("");
    };

    return (
        <form onSubmit={manejarBusqueda} className="flex gap-2 items-center">
            <input
                type="text"
                placeholder="Buscar en Payroll..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border p-2 rounded w-64"
            />
            <button
                type="submit"
                className="search button-search text-white px-4 py-1 rounded shadow"
            >
                Buscar
            </button>
        </form>
    );
}
