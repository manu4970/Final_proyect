import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../img/logo.png";
import "../../styles/CanchaCard.css";
import "../../styles/InformationCard.css";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";

export function Navbar() {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const sessionId = sessionStorage.getItem('id')
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleClickLogOut = () => {
    window.location.reload(false)
    sessionStorage.removeItem("auth_token")
    sessionStorage.removeItem("id")
    sessionStorage.removeItem("isLoggedIn")
    navigate("/");
  };

  useEffect(() => {
    if (isLoggedIn) {
      actions.getUser(sessionId);
    }
  }, [isLoggedIn, sessionId]);

  useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem("isLoggedIn") === "true");
  }, []);

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
            {isLoggedIn ?
              (<button className="btn ms-auto text-light" style={{ paddingRight: "10px" }} type="button" onClick={handleClickLogOut}>Logout</button>)
              :
              (<button className="btn ms-auto text-light" style={{ paddingRight: "10px" }} type="button" onClick={handleClickLogIn}>Login</button>)}
          </div>
          {isLoggedIn ?
            (
              <div className="row">
                <div className="col">
                  <div className="d-flex justify-content-center">
                    <div className="dropdown">
                      <div className="rounded-circle overflow-hidden dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ width: "40px", height: "40px", marginLeft: "10px" }}>
                        <Link to="/profile">
                          <img src="https://i1.sndcdn.com/avatars-000733526755-v9y8eh-t500x500.jpg" alt="User Picture" style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </Link>
                      </div>


                      <ul className="dropdown-menu dropdown-menu-end text-light" style={{ background: "#1C2331", width: "250px" }}>
                        <span className="d-flex text-light align-items-center gap-3">

                          <span className="rounded-circle overflow-hidden dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ width: "40px", height: "40px", marginLeft: "10px" }}>
                            <img src="https://i1.sndcdn.com/avatars-000733526755-v9y8eh-t500x500.jpg" alt="User Picture" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </span>
                          <li>
                            <span className="">
                              <h4 className="mb-0">{store.user.name} {store.user.lastname}</h4>
                              <p className="mb-0">{store.user.email}</p>
                            </span>
                          </li>
                        </span>

                        <li><hr class="dropdown-divider" /></li>
                        <li><a class="dropdown-item text-white" href="/homelogin">Rent a spot</a></li>
                        <li><a class="dropdown-item text-white" href="/admin">Administrate</a></li>

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