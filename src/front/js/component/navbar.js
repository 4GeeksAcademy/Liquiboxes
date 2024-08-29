import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link to="/" className="navbar-brand">Mi Aplicación</Link>
                <div className="navbar-nav">
                    <Link to="/signup" className="nav-link">Registro</Link>
                    <Link to="/login" className="nav-link">Iniciar Sesión</Link>
                    <Link to="/private" className="nav-link">Área Privada</Link>
                </div>
            </div>
        </nav>
    );
};