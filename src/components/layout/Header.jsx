import React from "react";
import { Busqueda } from "../pages/Busqueda";
import BuscadorRedireccion from "../pages/BuscadorRedireccion";

export const Header = () => {
    return (
        <section className="header w-[100%] px-20">
            <div className="search">
                <BuscadorRedireccion />
            </div>
        </section>
    );
};
