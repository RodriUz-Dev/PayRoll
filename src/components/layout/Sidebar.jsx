import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/payroll_team_logo.png";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
//import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlineDashboard, MdNotificationsNone } from "react-icons/md";
import { FaAngleRight, FaCartArrowDown, FaProductHunt } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FiUser, FiUserPlus } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { TbBrandProducthunt } from "react-icons/tb";
import { BiMoneyWithdraw } from "react-icons/bi";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { BsPersonVcard } from "react-icons/bs";
import { FaMoneyCheckDollar } from "react-icons/fa6";

const Sidebar = () => {
    //Hooks
    const [activeTab, setActiveTab] = useState(0);
    const [isToggleSubmenu, setIsToogleSubmenu] = useState(false);

    const isOpenSubmenu = (index) => {
        setActiveTab(index);
        setIsToogleSubmenu(!isToggleSubmenu);
    };

    return (
        <>
            <div className="sidebar fixed top-0 left-0 z-[100] ">
                <Link to="/">
                    <div className="logoWrapper py-2 px-8">
                        <img src={Logo} className="w-50"></img>
                    </div>
                </Link>
                <div className="userData">
                    <p>Rodrigo Uzcanga</p>
                    <p className="label-userRol">Administrador</p>
                </div>

                <div className="sidebarTabs px-2 mt-4">
                    <ul className="flex gap-3 flex-col">
                        <li>
                            <Button
                                className={`w-70 ${
                                    activeTab === 0 ? "active" : ""
                                }`}
                                onClick={() => isOpenSubmenu(0)}
                            >
                                <span className="icon w-[30px] h-[30px] flex items-center justify-start rounded-md">
                                    <MdOutlineDashboard />
                                </span>
                                <NavLink to="/dashboard">Dashboard</NavLink>
                            </Button>
                        </li>

                        <li
                            className={`${
                                activeTab === 1 && isToggleSubmenu === true
                                    ? "colapse"
                                    : "colapsed"
                            }`}
                        >
                            <Button
                                className={`w-70 ${
                                    activeTab === 1 ? "active" : ""
                                }`}
                                onClick={() => isOpenSubmenu(1)}
                            >
                                <span className="icon w-[30px] h-[30px] flex items-center justify-start rounded-md">
                                    <BiMoneyWithdraw />
                                </span>
                                Procesos de Nómina
                                <span
                                    className={`arrow ml-auto w-[25px] h-[25px] flex items-center justify-center ${
                                        activeTab === 1 &&
                                        isToggleSubmenu == true
                                            ? "rotate"
                                            : ""
                                    }`}
                                >
                                    <FaAngleRight />
                                </span>
                            </Button>

                            <div
                                className={`submenuWrapper ${
                                    activeTab === 1 && isToggleSubmenu == true
                                        ? "colapse"
                                        : "colapsed"
                                }`}
                            >
                                <div className="submenu flex flex-col">
                                    <Button className="w-70">
                                        <NavLink to="/movimientos">
                                            Movimientos diarios
                                        </NavLink>
                                    </Button>

                                    <Button className="w-70">
                                        <NavLink to="/calculonomina">
                                            Cálculo de Nómina
                                        </NavLink>
                                    </Button>
                                    <Button className="w-70">
                                        <NavLink to="/historialnomina">
                                            Historial Nómina
                                        </NavLink>
                                    </Button>
                                    <Button className="w-70">
                                        <NavLink to="/periodospago">
                                            Periodos de Pago
                                        </NavLink>
                                    </Button>
                                </div>
                            </div>
                        </li>

                        <li
                            className={`${
                                activeTab === 2 && isToggleSubmenu === true
                                    ? "colapse"
                                    : "colapsed"
                            }`}
                        >
                            <Button
                                className={`w-70 ${
                                    activeTab === 2 ? "active" : ""
                                }`}
                                onClick={() => isOpenSubmenu(2)}
                            >
                                <span className="icon w-[30px] h-[30px] flex items-center justify-start rounded-md">
                                    <BsPersonVcard />
                                </span>
                                Empleados
                                <span
                                    className={`arrow ml-auto w-[25px] h-[25px] flex items-center justify-center ${
                                        activeTab === 2 &&
                                        isToggleSubmenu == true
                                            ? "rotate"
                                            : ""
                                    }`}
                                >
                                    <FaAngleRight />
                                </span>
                            </Button>
                            <div
                                className={`submenuWrapper ${
                                    activeTab === 2 && isToggleSubmenu == true
                                        ? "colapse"
                                        : "colapsed"
                                }`}
                            >
                                <div className="submenu flex flex-col">
                                    <Button className="w-70">
                                        <NavLink to="/empleados">
                                            Gestión de Empleados
                                        </NavLink>
                                    </Button>
                                    <Button className="w-70">
                                        <NavLink to="/Articulos">
                                            Reporte de Empleados
                                        </NavLink>
                                    </Button>
                                    <Button className="w-70">
                                        Movimientos de empleados
                                    </Button>
                                </div>
                            </div>
                        </li>

                        <li>
                            <Button
                                className={`w-70 ${
                                    activeTab === 3 ? "active" : ""
                                }`}
                                onClick={() => isOpenSubmenu(3)}
                            >
                                <span className="icon  w-[30px] h-[30px] flex items-center justify-start rounded-md">
                                    <FaMoneyCheckDollar />
                                </span>
                                <NavLink to="/dashboard">Recibos</NavLink>

                                <span className="arrow ml-auto w-[25px] h-[25px] flex items-center justify-center">
                                    <FaAngleRight />
                                </span>
                            </Button>
                        </li>

                        <li>
                            <Button
                                className={`w-70 ${
                                    activeTab === 4 ? "active" : ""
                                }`}
                                onClick={() => isOpenSubmenu(4)}
                            >
                                <span className="icon w-[30px] h-[30px] flex items-center justify-start rounded-md">
                                    <MdNotificationsNone />
                                </span>
                                Notificaciones
                                <span className="arrow ml-auto w-[25px] h-[25px] flex items-center justify-center">
                                    <FaAngleRight />
                                </span>
                            </Button>
                        </li>

                        <li>
                            <Button
                                className={`w-70 ${
                                    activeTab === 5 ? "active" : ""
                                }`}
                                onClick={() => isOpenSubmenu(5)}
                            >
                                <span className="icon w-[30px] h-[30px] flex items-center justify-start rounded-md">
                                    <IoSettingsOutline />
                                </span>
                                Configuracion
                                <span className="arrow ml-auto w-[25px] h-[25px] flex items-center justify-center">
                                    <FaAngleRight />
                                </span>
                            </Button>
                        </li>

                        <li>
                            <Button
                                className={`w-70 ${
                                    activeTab === 6 ? "active" : ""
                                }`}
                                onClick={() => isOpenSubmenu(6)}
                            >
                                <span className="icon w-[30px] h-[30px] flex items-center justify-start rounded-md">
                                    <FiUser />
                                </span>
                                Login
                            </Button>
                        </li>

                        <li>
                            <Button
                                className={`w-70 ${
                                    activeTab === 7 ? "active" : ""
                                }`}
                                onClick={() => isOpenSubmenu(7)}
                            >
                                <span className="icon w-[30px] h-[30px] flex items-center justify-start rounded-md">
                                    <FiUserPlus />
                                </span>
                                Sign Up
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
