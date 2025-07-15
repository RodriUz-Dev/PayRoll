import React from "react";
import { Link } from "react-router-dom";

export const Contacto = () => {
    return (
        <>
            <div className="div-component">
                <div className="text-2xl font-black text-indigo-950">
                    <h1>Página de Contacto</h1>
                    <p>Esta es la página de contacto</p>
                    <hr />
                    <br></br>
                    <Link className="enlace text-lg font-light" to="/dashboard">
                        Ir al dashboard
                    </Link>
                </div>
            </div>
        </>
    );
};
