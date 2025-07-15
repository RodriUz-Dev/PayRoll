import React from "react";

export const Busqueda = () => {
    return (
        <div className="search">
            <form className="search">
                <input
                    type="text"
                    id="search_field"
                    placeholder="Buscar en Payroll ..."
                ></input>
                <button className="button-search" id="search">
                    Buscar
                </button>
            </form>
        </div>
    );
};
