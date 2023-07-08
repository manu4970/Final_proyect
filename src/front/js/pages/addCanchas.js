import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const AddCanchas = () => {
    const { store, actions } = useContext(Context)
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        "https://uploads-ssl.webflow.com/632871e15b53a0140af28aeb/633b061d864ce251bb36073e_pexels-markus-spiske-1752757.jpg",
        "https://journey.app/blog/wp-content/uploads/2021/11/reglas-deportivas_Tenis_.jpg",
        "https://thephysiocompany.co.uk/wp-content/uploads/football.jpg",
    ];
    const currentImage = images[currentImageIndex];
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [sportType, setSportType] = useState("")
    const [cantidad, setCantidad] = useState("")
    const [detalle, setDetalle] = useState("")
    const [is_available, setIs_available] = useState(true)
    const [user_id, setUser_id] = useState("")


    useEffect(() => {
        setUser_id(sessionStorage.getItem("id"))
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    // console.log(user_id, name, location, sportType, cantidad, detalle, is_avaible)
    const handleClick = (e) => {
        e.preventDefault()
        actions.pushCancha(name, location, user_id, sportType, cantidad, detalle, is_available)
        navigate("/profile")
    }

    return (
        <>
            <div className="p-4 text-center mb-2">
                <h1>Agrega tu Cancha</h1>
            </div>
            <div className="container">
                <div className="row d-flex gap-4">
                    <div className="col" style={{ padding: "20px", marginLeft: "150px", marginTop: "20px" }}>
                        <form >
                            <div className="mb-3">
                                <div style={{ width: "300px", height: "50px", marginLeft: "25px" }}>
                                    {/* <label for="nombreCancha" className="form-label">Nombre del club</label> */}
                                    <input type="nombre" placeholder="Nombre del club" className="form-control" id="nombreCancha" aria-describedby="emailHelp" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                            </div>
                            <div className="mb-3">
                                <div style={{ width: "300px", height: "50px", marginLeft: "25px", marginTop: "30px" }}>
                                    {/* <label for="direccionCancha" className="form-label">Ubicación del club</label> */}
                                    <input type="location" className="form-control" placeholder="Ubicación del club" id="locationCancha" value={location} onChange={(e) => setLocation(e.target.value)} />
                                </div>
                            </div>
                            <div className="mb-3 form-check">
                                <div style={{ width: "300px", height: "50px", marginLeft: "0px", marginTop: "35px" }}>
                                    <select className="form-select" aria-label="Default select example" value={sportType} onChange={(e) => setSportType(e.target.value)}>
                                        <option selected>Deporte</option>
                                        <option value="Tenis">Tenis</option>
                                        <option value="Paddle">Paddle</option>
                                        <option value="Futbol">Futbol</option>
                                        <option value="Basketbol">Basketbol</option>
                                        <option value="BabyFutbol">BabyFutbol</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3 form-check">
                                <div style={{ width: "300px", height: "50px", marginLeft: "0px" }}>
                                    <select className="form-select" aria-label="Default select example" value={cantidad} onChange={(e) => setCantidad(e.target.value)}>
                                        <option selected>Cantidad de Canchas</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="form-floating" style={{ width: "300px", height: "50px", marginLeft: "24px", color: "black" }}>
                                    <textarea className="form-control" placeholder="Detalles" id="floatingTextarea2" value={detalle} onChange={(e) => setDetalle(e.target.value)}></textarea>
                                    <label for="floatingTextarea2">Detalles</label>
                                </div>
                            </div>
                            <div className="boton">
                                <div className="" style={{ width: "300px", height: "100px", marginLeft: "24px", }}>
                                    <button type="submit" className="btn btn-primary " onClick={handleClick}>Agregar Cancha</button>
                                </div>
                            </div>
                        </form >
                    </div>
                    <div className="col">
                        <img src={currentImage} className="rounded float-end" alt="..." style={{ alignItems: "center", height: "500px", width: "650px" }} />
                    </div>
                </div>
            </div>

        </>
    );
};