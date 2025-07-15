import React from "react";
import { Routes, Route, Link, BrowserRouter, Navigate } from "react-router-dom";
import { Dashboard } from "../components/pages/Dashboard/Dashboard";
import { Inicio } from "../components/pages/Inicio";
import { Contacto } from "../components/pages/Contacto";
import { createContext } from "react";
import { Header } from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import { Footer } from "../components/layout/Footer";
import { Busqueda } from "../components/pages/Busqueda";
import { PeriodosPago } from "../components/pages/nomina/PeriodosPago";
import Empleados from "../components/pages/empleados/Empleados";
import Movimientos from "../components/pages/empleados/Movimientos";
import CalculoNomina from "../components/pages/nomina/CalculoNomina";
import HistorialNomina from "../components/pages/nomina/HistorialNomina";

const MyContext = createContext();

export const RouterPrincipal = () => {
    const values = {};

    return (
        <BrowserRouter>
            <MyContext.Provider value={values}>
                <Header />
                <section className="main flex">
                    <div className="sidebarWrapper ">
                        <Sidebar />
                    </div>

                    <div className="content_Right " id="content_Right">
                        <Routes>
                            <Route
                                path="/"
                                exact={true}
                                element={<Dashboard />}
                            />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/inicio" element={<Inicio />} />

                            <Route path="/contacto" element={<Contacto />} />

                            <Route path="/busqueda" element={<Busqueda />} />
                            <Route
                                path="/periodospago"
                                element={<PeriodosPago />}
                            />
                            <Route path="/empleados/" element={<Empleados />} />
                            <Route
                                path="/movimientos/"
                                element={<Movimientos />}
                            />
                            <Route
                                path="/calculonomina"
                                element={<CalculoNomina />}
                            />
                            <Route
                                path="/historialnomina"
                                element={<HistorialNomina />}
                            />
                            <Route path="*" element={<Dashboard />} />

                            <Route
                                path={"redirigir"}
                                element={
                                    <Navigate
                                        to={"/persona/Rodrigo/Uzcanga"}
                                    ></Navigate>
                                }
                            />
                        </Routes>
                    </div>
                </section>
                <Footer />
                {/* <section className="footer w-[100%]">
                        <div className="text-2xl font-black text-indigo-950">
                            <h2>Pie de página</h2>
                        </div>
                    </section> */}
            </MyContext.Provider>
        </BrowserRouter>
    );
};
