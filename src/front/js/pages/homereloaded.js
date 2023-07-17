import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/buttonsHome.css";
import "../../styles/home.css";
import { Context } from "../store/appContext";


export const Homereloaded = () => {
    const { store, actions } = useContext(Context);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();
    const [logged, isLoggedIn] = useState(sessionStorage.getItem("isLoggedIn"))

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/homelogin");
    };


    return (
        <><div className="video-wrapper mt-5">
            <video className="bg-video mt-5 " playsinline="playsInline" autoplay="autoPlay" muted="muted" loop="loop"><source src="https://dsqqu7oxq6o1v.cloudfront.net/preview-199424-klguRdqsZU-high.mp4" type="video/mp4" /></video>
        </div>
            <div className="masthead" style={{ paddingBottom: "300px" }}>
                <div className="masthead-content text-white" >
                    <div className="container-fluid px-4 px-lg-0">
                        <h1 className="fst-italic lh-1 mb-4 mt-5">Sport Spot</h1>
                        <p className="mb-5">Spot Sport allows you to easily book courts for your preferred sports at the venue of your choice, ensuring the best prices and ultimate convenience.</p>


                    </div>
                    <div className=" container d-inline pt-5 ">
                        <div className="row gap-4 ">
                            <div className="btnhome">
                                <Link className="btnhome btn-lg btn-dark " to={logged ? "/home" : "/login"}>
                                    <span className="text-center">Rent your spot</span>
                                </Link>
                            </div>
                            <div className="btnhome">
                                <Link className="btnhome btn-lg btn-dark" to={logged ? "/addcanchas" : "/login"}>
                                    <span className="text-center">Add your spot</span>
                                </Link>
                            </div>

                        </div>


                    </div>
                </div>

            </div >


            <div className="social-icons ">
                <div className="d-flex flex-row flex-lg-column justify-content-center align-items-center h-100 mt-3 mt-lg-0 ">
                    <a className="btn btn-dark m-3 " href="#!"><i className="fab fa-twitter "></i></a>
                    <a className="btn btn-dark m-3" href="#!"><i className="fab fa-facebook-f"></i></a>
                    <a className="btn btn-dark m-3" href="#!"><i className="fab fa-instagram"></i></a>
                </div>
            </div>
        </>
    );
};
