import React, { useState, useEffect } from "react";
import axios from "axios";

const cardBasic = {
    cardClasss: "bg-white border-blue-300 p-4 rounded-xl shadow border-2",
    inputClass:
        "border p-2 rounded w-full border-gray-400 focus:border-blue-600 focus:outline-none focus:border-2",
    buttonClass:
        "bg-indigo-700 text-white px-4 py-2 rounded shadow  hover:bg-indigo-500 hover:shadow",
};

export const PeriodosPago = () => {
    const [periodos, setPeriodos] = useState([]);
    const [nuevoPeriodo, setNuevoPeriodo] = useState({ inicio: "", fin: "" });

    useEffect(() => {
        axios.get("http://localhost:3001/periodos").then((res) => {
            setPeriodos(res.data);
        });
    }, []);

    const agregarPeriodo = async () => {
        if (!nuevoPeriodo.inicio || !nuevoPeriodo.fin) return;

        let id = periodos.length + 1;
        nuevoPeriodo.id = id;

        const res = await axios.post(
            "http://localhost:3001/periodos",
            nuevoPeriodo
        );
        setPeriodos([...periodos, res.data]);
        setNuevoPeriodo({ inicio: "", fin: "" });
    };

    return (
        <div className="div-component">
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-blue-900">
                    Gestión de Periodos de Pago
                </h1>

                <div className={cardBasic.cardClasss}>
                    <h2 className="text-xl mb-4 text-blue-950">
                        Agregar nuevo periodo
                    </h2>
                    <div className="flex space-x-4 mb-4">
                        <input
                            type="date"
                            value={nuevoPeriodo.inicio}
                            onChange={(e) =>
                                setNuevoPeriodo({
                                    ...nuevoPeriodo,
                                    inicio: e.target.value,
                                })
                            }
                            className={cardBasic.inputClass}
                        />
                        <input
                            type="date"
                            value={nuevoPeriodo.fin}
                            onChange={(e) =>
                                setNuevoPeriodo({
                                    ...nuevoPeriodo,
                                    fin: e.target.value,
                                })
                            }
                            className={cardBasic.inputClass}
                        />
                        <button
                            onClick={agregarPeriodo}
                            className={cardBasic.buttonClass}
                        >
                            Agregar
                        </button>
                    </div>

                    <table className="w-full text-left text-sm">
                        <thead className="border-b">
                            <tr>
                                <th>ID</th>
                                <th>Inicio</th>
                                <th>Fin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {periodos.map((p) => (
                                <tr key={p.id} className="border-t">
                                    <td>{p.id}</td>
                                    <td>{p.inicio}</td>
                                    <td>{p.fin}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
