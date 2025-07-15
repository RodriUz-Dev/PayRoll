import React, { useState, useEffect } from "react";
import axios from "axios";

const cardBasic = {
    cardClasss: "bg-white border-blue-300 p-4 rounded-xl shadow border-2",
    inputClass:
        "border p-2 rounded w-full border-gray-400 focus:border-blue-600 focus:outline-none focus:border-2",
    buttonClass:
        "bg-indigo-700 text-white px-4 py-2 rounded shadow  hover:bg-indigo-500 hover:shadow",
};

export default function Empleados() {
    const [empleados, setEmpleados] = useState([]);
    const [nuevoEmpleado, setNuevoEmpleado] = useState({
        nombre: "",
        tarifa: 0,
        puesto: "",
    });

    useEffect(() => {
        axios.get("http://localhost:3001/empleados").then((res) => {
            setEmpleados(res.data);
        });
    }, []);

    const agregarEmpleado = async () => {
        if (
            !nuevoEmpleado.nombre ||
            nuevoEmpleado.tarifa <= 0 ||
            !nuevoEmpleado.puesto
        )
            return;
        let idEmp = empleados.length + 1;
        nuevoEmpleado.id = idEmp;
        const res = await axios.post(
            "http://localhost:3001/empleados",
            nuevoEmpleado
        );
        setEmpleados([...empleados, res.data]);
        setNuevoEmpleado({ nombre: "", tarifa: 0, puesto: "" });
    };

    return (
        <div className="div-component">
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-blue-900">
                    Gestión de Empleados
                </h1>

                <div className={cardBasic.cardClasss}>
                    <h2 className="text-xl mb-4 text-blue-950">
                        Agregar nuevo empleado
                    </h2>
                    <div className="flex space-x-4 mb-4">
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={nuevoEmpleado.nombre}
                            onChange={(e) =>
                                setNuevoEmpleado({
                                    ...nuevoEmpleado,
                                    nombre: e.target.value,
                                })
                            }
                            className={cardBasic.inputClass}
                        />
                        <input
                            type="number"
                            placeholder="Sueldo por hora"
                            value={nuevoEmpleado.tarifa}
                            onChange={(e) =>
                                setNuevoEmpleado({
                                    ...nuevoEmpleado,
                                    tarifa: parseFloat(e.target.value),
                                })
                            }
                            className={cardBasic.inputClass}
                        />
                        <input
                            type="text"
                            placeholder="Puesto"
                            value={nuevoEmpleado.puesto}
                            onChange={(e) =>
                                setNuevoEmpleado({
                                    ...nuevoEmpleado,
                                    puesto: e.target.value,
                                })
                            }
                            className={cardBasic.inputClass}
                        />
                        <button
                            onClick={agregarEmpleado}
                            className={cardBasic.buttonClass}
                        >
                            Agregar
                        </button>
                    </div>

                    <table className="w-full text-left text-sm">
                        <thead className="border-b">
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Sueldo/Hora</th>
                                <th>Puesto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empleados.map((e) => (
                                <tr key={e.id} className="border-t">
                                    <td>{e.id}</td>
                                    <td>{e.nombre}</td>
                                    <td>${e.tarifa}</td>
                                    <td>{e.puesto}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
