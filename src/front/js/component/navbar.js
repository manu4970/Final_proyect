import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/CanchaCard.css";
import "../../styles/InformationCard.css";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";

export function Navbar() {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const handleClickLogOut = () => {
    sessionStorage.removeItem("auth_token")
    sessionStorage.removeItem("id")
    sessionStorage.setItem("isLoggedIn", "false")
    navigate("/");
  };

  if (sessionStorage.getItem("isLoggedIn") === "true") {
    store.isLoggedIn = true
  } else {
    store.isLoggedIn = false
  }

  const handleClickLogIn = () => {
    navigate("/login")
  };

  return (
    <nav className="navbar navbar-dark fixed-top" style={{ backgroundColor: "#1c2331" }} >
      <div className="container-fluid d-flex" style={{ backgroundColor: "#1c2331" }}>
        <Link className="navbar-brand text-uppercase fw-bold" to="/">Sport Spot</Link>
        <div>
          {store.isLoggedIn ?
            (<button className="btn ms-auto" type="button" onClick={handleClickLogOut}>Logout</button>)
            :
            (<button className="btn ms-auto" type="button" onClick={handleClickLogIn}>Login</button>)}
        </div>
        <div>
          {store.isLoggedIn ?
            (<div className="row">
              <div className="d-flex justify-content-center">
                <div className="rounded-circle overflow-hidden" style={{ width: "40px", height: "40px" }}>
                  <Link to="/profile">
                    <img src="https://i1.sndcdn.com/avatars-000733526755-v9y8eh-t500x500.jpg" alt="User Picture" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </Link>
                </div>
                <div className="col">
                  <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbaLogged" aria-controls="offcanvasDarkNavbar">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                </div>
              </div>
            </div>
            )
            :
            (
              <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                <span className="navbar-toggler-icon"></span>
              </button>
            )}
        </div>


        <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
          <div className="offcanvas-header bg-dark">
            <h5 className="offcanvas-title bg-dark text-white" id="offcanvasDarkNavbarLabel">Arrienda tu Cancha</h5>
            <button type="button" className="btn-close btn-close-black" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body text-dark bg-dark" >
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#" >Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Quiénes somos</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Buscar
                </a>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li><a className="dropdown-item" href="#">Deporte</a></li>
                  <li><a className="dropdown-item" href="#">Ubicación</a></li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li><a className="dropdown-item" href="#">Arrienda tu cancha</a></li>
                </ul>
              </li>
            </ul>
            <form className="d-flex mt-3" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-success" type="submit">Search</button>
            </form>
          </div>
        </div>
        <div className="offcanvas offcanvas-end text-bg-dark" style={{ maxWidth: "300px" }} tabIndex="-1" id="offcanvasDarkNavbaLogged" aria-labelledby="offcanvasDarkNavbarLabel">
          <div className="offcanvas-header bg-dark">
            <h5 className="offcanvas-title bg-dark text-white" id="offcanvasDarkNavbarLabel">Welcome!</h5>
            <button type="button" className="btn-close btn-close-black" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body text-dark bg-dark" >
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/profile" >Profile</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/rent">Arrienda tu cancha</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}