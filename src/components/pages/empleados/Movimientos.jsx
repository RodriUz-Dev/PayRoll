// Movimientos.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const cardBasic = {
    cardClasss: "bg-white border-blue-300 p-4 rounded-xl shadow border-2",
    inputClass:
        "border p-2 rounded w-full border-gray-400 focus:border-blue-600 focus:outline-none focus:border-2",
    buttonClass:
        "bg-indigo-700 text-white px-4 py-2 rounded shadow  hover:bg-indigo-500 hover:shadow",
};

export default function Movimientos() {
    const [movimientos, setMovimientos] = useState([]);
    const [empleados, setEmpleados] = useState([]);

    const [nuevo, setNuevo] = useState({
        empleadoId: "",
        fecha: "",
        horas: 0,
        tipo: "normal",
    });

    useEffect(() => {
        axios
            .get("http://localhost:3001/movimientos")
            .then((res) => setMovimientos(res.data));
        axios
            .get("http://localhost:3001/empleados")
            .then((res) => setEmpleados(res.data));
    }, []);

    const agregarMovimiento = async () => {
        if (!nuevo.empleadoId || !nuevo.fecha || nuevo.horas <= 0) return;

        let id = movimientos.length + 1;
        nuevo.id = id;

        const res = await axios.post(
            "http://localhost:3001/movimientos",
            nuevo
        );
        setMovimientos([...movimientos, res.data]);
        setNuevo({ empleadoId: "", fecha: "", horas: 0, tipo: "normal" });
    };

    return (
        <div className="div-component">
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">Registro de Movimientos</h1>

                <div className={cardBasic.cardClasss}>
                    <h2 className="text-xl">Nuevo Movimiento</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <select
                            value={nuevo.empleadoId}
                            onChange={(e) =>
                                setNuevo({
                                    ...nuevo,
                                    empleadoId: e.target.value,
                                })
                            }
                            className="border p-2 rounded"
                        >
                            <option value="">Seleccione empleado</option>
                            {empleados.map((e) => (
                                <option key={e.id} value={e.id}>
                                    {e.nombre}
                                </option>
                            ))}
                        </select>
                        <input
                            type="date"
                            value={nuevo.fecha}
                            onChange={(e) =>
                                setNuevo({ ...nuevo, fecha: e.target.value })
                            }
                            className="border p-2 rounded"
                        />
                        <input
                            type="number"
                            value={nuevo.horas}
                            onChange={(e) =>
                                setNuevo({
                                    ...nuevo,
                                    horas: parseInt(e.target.value),
                                })
                            }
                            className="border p-2 rounded"
                            placeholder="Horas"
                        />
                        <select
                            value={nuevo.tipo}
                            onChange={(e) =>
                                setNuevo({ ...nuevo, tipo: e.target.value })
                            }
                            className="border p-2 rounded"
                        >
                            <option value="normal">Normal</option>
                            <option value="extra">Extra</option>
                            <option value="ausencia">Ausencia</option>
                        </select>
                    </div>
                    <button
                        onClick={agregarMovimiento}
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded shadow"
                    >
                        Agregar Movimiento
                    </button>
                </div>

                <div className="bg-white p-4 rounded shadow border">
                    <h2 className="text-xl mb-4">Historial de Movimientos</h2>
                    <table className="w-full text-left text-sm">
                        <thead className="border-b">
                            <tr>
                                <th>Empleado</th>
                                <th>Fecha</th>
                                <th>Horas</th>
                                <th>Tipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movimientos.map((m) => {
                                const emp = empleados.find(
                                    (e) => e.id === parseInt(m.empleadoId)
                                );
                                return (
                                    <tr key={m.id} className="border-t">
                                        <td>{emp?.nombre || "Desconocido"}</td>
                                        <td>{m.fecha}</td>
                                        <td>{m.horas}</td>
                                        <td>{m.tipo}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
