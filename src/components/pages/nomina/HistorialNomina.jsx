// HistorialNomina.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function HistorialNomina() {
    const [historial, setHistorial] = useState([]);
    const [empleados, setEmpleados] = useState([]);
    const [periodos, setPeriodos] = useState([]);
    const [filtroEmpleado, setFiltroEmpleado] = useState("");
    const [filtroPeriodo, setFiltroPeriodo] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:3001/historialNomina")
            .then((res) => setHistorial(res.data));
        axios
            .get("http://localhost:3001/empleados")
            .then((res) => setEmpleados(res.data));
        axios
            .get("http://localhost:3001/periodos")
            .then((res) => setPeriodos(res.data));
    }, []);

    const historialFiltrado = historial.filter((item) => {
        const coincideEmpleado = filtroEmpleado
            ? item.empleadoId === parseInt(filtroEmpleado)
            : true;
        const coincidePeriodo = filtroPeriodo
            ? item.periodoId === parseInt(filtroPeriodo)
            : true;
        return coincideEmpleado && coincidePeriodo;
    });

    const exportarExcel = () => {
        const data = historialFiltrado.map((item) => ({
            Empleado: item.nombre,
            Total: item.total,
            Periodo: `${item.periodoInicio} a ${item.periodoFin}`,
            Fecha: new Date(item.fechaRegistro).toLocaleString(),
        }));
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Historial");
        XLSX.writeFile(workbook, "historial_nomina.xlsx");
    };

    const exportarPDF = () => {
        const doc = new jsPDF();
        doc.text("Historial de Nómina", 14, 16);
        autoTable(doc, {
            startY: 20,
            head: [["Empleado", "Total (MXN)", "Periodo", "Fecha"]],
            body: historialFiltrado.map((item) => [
                item.nombre,
                `$${item.total.toFixed(2)}`,
                `${item.periodoInicio} a ${item.periodoFin}`,
                new Date(item.fechaRegistro).toLocaleString(),
            ]),
        });
        doc.save("historial_nomina.pdf");
    };

    return (
        <div className="div-component">
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">Historial de Nómina</h1>

                <div className="bg-white p-4 rounded-xl shadow border space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select
                            value={filtroEmpleado}
                            onChange={(e) => setFiltroEmpleado(e.target.value)}
                            className="border p-2 rounded w-full"
                        >
                            <option value="">Todos los empleados</option>
                            {empleados.map((e) => (
                                <option key={e.id} value={e.id}>
                                    {e.nombre}
                                </option>
                            ))}
                        </select>

                        <select
                            value={filtroPeriodo}
                            onChange={(e) => setFiltroPeriodo(e.target.value)}
                            className="border p-2 rounded w-full"
                        >
                            <option value="">Todos los periodos</option>
                            {periodos.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.inicio} - {p.fin}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={exportarPDF}
                            className="bg-red-600 text-white px-4 py-2 rounded shadow"
                        >
                            Exportar PDF
                        </button>
                        <button
                            onClick={exportarExcel}
                            className="bg-green-600 text-white px-4 py-2 rounded shadow"
                        >
                            Exportar Excel
                        </button>
                    </div>

                    <table className="w-full text-left text-sm mt-4">
                        <thead className="border-b">
                            <tr>
                                <th>Empleado</th>
                                <th>Total (MXN)</th>
                                <th>Periodo</th>
                                <th>Fecha de Registro</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historialFiltrado.map((item) => (
                                <tr key={item.id} className="border-t">
                                    <td>{item.nombre}</td>
                                    <td>${item.total}</td>
                                    <td>
                                        {item.periodoInicio} a {item.periodoFin}
                                    </td>
                                    <td>
                                        {new Date(
                                            item.fechaRegistro
                                        ).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
