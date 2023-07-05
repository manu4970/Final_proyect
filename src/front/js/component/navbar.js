import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";
import "../../styles/CanchaCard.css";

export function Navbar() {
  const { actions, store } = useContext(Context);
  const logged = sessionStorage.getItem("isLoggedIn");
  const navigate = useNavigate();

  const handleClickLogOut = () => {
    actions.logout();
    navigate("/");
  };

  const handleClickLogIn = () => {
    navigate("/login")
  };

  return (
    <nav className="navbar navbar-dark sticky-top" style={{ backgroundColor: "#1c2331" }} >
      <div className="container-fluid d-flex" style={{ backgroundColor: "#1c2331" }}>
        <Link className="navbar-brand text-uppercase fw-bold" to="/">Sport Spot</Link>
        <div>
          {logged ?
            (<button className="btn ms-auto" type="button" onClick={handleClickLogOut}>Logout</button>)
            :
            (<button className="btn ms-auto " type="button" onClick={handleClickLogIn}>Login</button>)}
        </div>
        <div>
          {!logged ?
            (<div className="row">
              <div className="col">
                <div class="d-flex justify-content-center">
                  <div class="rounded-circle overflow-hidden" style={{ width: "40px", height: "40px" }}>
                    <img src="https://i1.sndcdn.com/avatars-000733526755-v9y8eh-t500x500.jpg" alt="User Picture" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                </div>
              </div>

              <div className="col">
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbaLogged" aria-controls="offcanvasDarkNavbar" >
                  <span className="navbar-toggler-icon"></span> </button>
              </div>  </div>)
            : (
              <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                <span className="navbar-toggler-icon"></span>
              </button>
            )

          }</div>


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
              <div class="rounded-circle overflow-hidden" style={{ width: "140px", height: "140px" }}>
                <img src="https://i1.sndcdn.com/avatars-000733526755-v9y8eh-t500x500.jpg" alt="User Picture" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
