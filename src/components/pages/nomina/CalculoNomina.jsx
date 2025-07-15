// Nominas.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

export default function CalculoNomina() {
    const [empleados, setEmpleados] = useState([]);
    const [movimientos, setMovimientos] = useState([]);
    const [periodos, setPeriodos] = useState([]);
    const [periodoSeleccionado, setPeriodoSeleccionado] = useState("");
    const [resultado, setResultado] = useState([]);
    const [historial, setHistorial] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/empleados")
            .then((res) => setEmpleados(res.data));
        axios
            .get("http://localhost:3001/movimientos")
            .then((res) => setMovimientos(res.data));
        axios
            .get("http://localhost:3001/periodos")
            .then((res) => setPeriodos(res.data));
        axios
            .get("http://localhost:3001/historialNomina")
            .then((res) => setHistorial(res.data));
    }, []);

    const calcularNomina = async () => {
        const periodo = periodos.find(
            (p) => p.id === parseInt(periodoSeleccionado)
        );
        if (!periodo) return;

        let idHistorial = historial.length + 1;

        const pagos = empleados.map((emp) => {
            const movs = movimientos.filter(
                (m) =>
                    m.empleadoId === emp.id &&
                    m.fecha >= periodo.inicio &&
                    m.fecha <= periodo.fin
            );

            let total = 0;
            movs.forEach((m) => {
                if (m.tipo === "normal") total += m.horas * emp.tarifa;
                if (m.tipo === "extra") total += m.horas * emp.tarifa * 1.5;
                if (m.tipo === "ausencia") total -= m.horas * emp.tarifa;
            });

            const registro = {
                id: idHistorial,
                empleadoId: emp.id,
                nombre: emp.nombre,
                total,
                periodoId: periodo.id,
                periodoInicio: periodo.inicio,
                periodoFin: periodo.fin,
                fechaRegistro: new Date().toISOString(),
            };

            idHistorial = idHistorial + 1;

            axios.post("http://localhost:3001/historialNomina", registro);
            return registro;
        });

        setResultado(pagos);
    };

    const exportarExcel = () => {
        const data = resultado.map((r) => ({
            Empleado: r.nombre,
            Total: r.total,
            Periodo: `${r.periodoInicio} - ${r.periodoFin}`,
            Fecha: new Date(r.fechaRegistro).toLocaleString(),
        }));
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Nomina");
        XLSX.writeFile(workbook, "nomina_resultado.xlsx");
    };

    return (
        <div className="div-component">
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">Cálculo de Nómina</h1>
                <div className="bg-white p-4 rounded shadow border space-y-4">
                    <select
                        value={periodoSeleccionado}
                        onChange={(e) => setPeriodoSeleccionado(e.target.value)}
                        className="border p-2 rounded w-full"
                    >
                        <option value="">Seleccione un periodo</option>
                        {periodos.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.inicio} - {p.fin}
                            </option>
                        ))}
                    </select>
                    <div className="flex gap-4">
                        <button
                            onClick={calcularNomina}
                            className="bg-blue-600 text-white px-4 py-2 rounded shadow"
                        >
                            Calcular Nómina
                        </button>
                        {resultado.length > 0 && (
                            <button
                                onClick={exportarExcel}
                                className="bg-green-600 text-white px-4 py-2 rounded shadow"
                            >
                                Exportar Excel
                            </button>
                        )}
                    </div>
                </div>

                {resultado.length > 0 && (
                    <div className="bg-white p-4 rounded shadow border">
                        <h2 className="text-xl mb-4">Resultados</h2>
                        <table className="w-full text-left text-sm">
                            <thead className="border-b">
                                <tr>
                                    <th>Empleado</th>
                                    <th>Total (MXN)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultado.map((r, i) => (
                                    <tr key={i} className="border-t">
                                        <td>{r.nombre}</td>
                                        <td>${r.total.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
