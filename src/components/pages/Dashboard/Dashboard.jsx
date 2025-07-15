import React, { useEffect, useState } from "react";
import axios from "axios";
import { DollarSign, Users, FileText, Search } from "lucide-react";

const metrics = [
    {
        title: "Empleados Activos",
        icon: <Users className="h-6 w-6 text-blue-600" />,
        value: 128,
        cardclass:
            "shadow-sm border border-gray-300 rounded-2xl p-4 flex items-center space-x-4 bg-blue-300",
        titleClass: "text-sm text-blue-950",
        valueClass: "text-xl font-semibold text-blue-800",
    },
    {
        title: "Nóminas Procesadas",
        icon: <FileText className="h-6 w-6 text-green-600" />,
        value: 45,
        cardclass:
            "shadow-sm border border-gray-300 rounded-2xl p-4 flex items-center space-x-4 bg-slate-700",
        titleClass: "text-sm text-amber-100",
        valueClass: "text-xl font-semibold text-amber-300",
    },
    {
        title: "Total Pagado (MXN)",
        icon: <DollarSign className="h-6 w-6 text-emerald-600" />,
        value: "$1,250,000",
        cardclass:
            "shadow-sm border border-gray-300 rounded-2xl p-4 flex items-center space-x-4 bg-purple-800",
        titleClass: "text-sm text-violet-50",
        valueClass: "text-xl font-semibold text-violet-200",
    },
];

export const Dashboard = () => {
    const [payrolls, setPayrolls] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3001/payrolls").then((res) => {
            setPayrolls(res.data);
        });
    }, []);

    const filteredPayrolls = payrolls.filter((p) =>
        p.empleado.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div className="div-component">
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold text-blue-950">
                        Dashboard de Nóminas
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {metrics.map((metric, idx) => (
                            <div key={idx} className={metric.cardclass}>
                                {metric.icon}
                                <div>
                                    <p className={metric.titleClass}>
                                        {metric.title}
                                    </p>
                                    <p className={metric.valueClass}>
                                        {metric.value}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar empleado..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 pr-4 py-2 border rounded-xl w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="bg-sky-100 rounded-2xl shadow border p-4">
                        <h2 className="text-xl font-semibold mb-4 text-blue-600">
                            Últimas Nóminas
                        </h2>
                        <table className="w-full text-left text-sm">
                            <thead className="border-b text-blue-900">
                                <tr>
                                    <th>ID</th>
                                    <th>Empleado</th>
                                    <th>Fecha</th>
                                    <th>Monto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPayrolls.map((p) => (
                                    <tr key={p.id} className="border-t">
                                        <td>{p.id}</td>
                                        <td>{p.empleado}</td>
                                        <td>{p.fecha}</td>
                                        <td>{p.monto}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredPayrolls.length === 0 && (
                            <p className="text-center text-gray-700 mt-4">
                                No se encontraron resultados.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
