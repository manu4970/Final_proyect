import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../img/logo.png";
import "../../styles/CanchaCard.css";
import "../../styles/InformationCard.css";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";

export function Navbar() {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const handleClickLogOut = () => {
    // window.location.reload(false)
    sessionStorage.removeItem("auth_token")
    sessionStorage.removeItem("id")
    sessionStorage.removeItem("isLoggedIn")
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
        <img src={logo} alt="Logo" style={{ width: "50px", height: "50px", marginLeft: "10px", marginRight: "5px" }} />
        <Link className="navbar-brand text-uppercase fw-bold" to="/" >Sport Spot</Link>
        <div className="Foo d-flex ms-auto" style={{ paddingRight: "10px" }}>
          <div>
            {store.isLoggedIn ?
              (<button className="btn ms-auto text-light" style={{ paddingRight: "10px" }} type="button" onClick={handleClickLogOut}>Logout</button>)
              :
              (<button className="btn ms-auto text-light" style={{ paddingRight: "10px" }} type="button" onClick={handleClickLogIn}>Login</button>)}
          </div>
          {store.isLoggedIn ?
            (
              <div className="row">
                <div className="col">
                  <div className="d-flex justify-content-center">
                    <div class="dropdown">
                      <div className="rounded-circle overflow-hidden dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ width: "40px", height: "40px", marginLeft: "10px" }}>
                        <Link to="/profile">
                          <img src="https://i1.sndcdn.com/avatars-000733526755-v9y8eh-t500x500.jpg" alt="User Picture" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </Link>
                      </div>
                      <ul class="dropdown-menu dropdown-menu-end text-light" style={{ background: "#1C2331" }}>
                        <span className="d-flex text-light p-2">
                          <span className="rounded-circle overflow-hidden dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ width: "40px", height: "40px", marginLeft: "10px" }}>
                            <img src="https://i1.sndcdn.com/avatars-000733526755-v9y8eh-t500x500.jpg" alt="User Picture" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </span>
                          <li><p>Manuel Perez</p></li>
                          <li><p>manu@admin.com</p></li>

                        </span>
                        <li><a class="dropdown-item text-white" href="/homelogin">Rent a spot</a></li>
                        <li><a class="dropdown-item text-white" href="/admin">Admin your spot</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )
            :
            (
              <></>
            )}
        </div>
      </div>
    </nav>
  );
}