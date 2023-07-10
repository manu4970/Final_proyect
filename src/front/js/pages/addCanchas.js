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
            <section className="d-flex alaign-items-center justify-content-center gap-5">
                <form class="row g-3" style={{ height: "550px", width: "600px", marginTop: "65px" }}>
                    <div class="col-12">
                        <label for="inputAddress" class="form-label">Name</label>
                        <input type="text" class="form-control" id="inputAddress" placeholder="Introduce the name of your recint" />
                    </div>
                    <div class="col-md-6">
                        <label for="inputPassword4" class="form-label">Region</label>
                        <input type="password" class="form-control" id="inputPassword4" />
                    </div>
                    <div class="col-md-6">
                        <label for="inputEmail4" class="form-label">Comuna</label>
                        <input type="email" class="form-control" id="inputEmail4" />
                    </div>
                    <div class="col-12">
                        <label for="inputAddress2" class="form-label">Address</label>
                        <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                    </div>
                    <div class="col-md-6">
                        <label for="inputCity" class="form-label">Sport</label>
                        <select id="inputState" class="form-select">
                            <option selected>Choose...</option>
                            <option>...</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label for="inputState" class="form-label">Number of fields</label>
                        <input type="text" class="form-control" id="inputCity" />

                    </div>
                    <div class="col-md-6">
                        <label for="inputCity" class="form-label">Cost per hour</label>
                        <input type="text" class="form-control" id="inputCity" />
                    </div>
                    <div class="col-md-6">
                        <label for="inputCity" class="form-label">Disponibility</label>
                        <input type="text" class="form-control" id="inputCity" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">More Info</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary">Create</button>
                    </div>
                </form>
                <img className="" style={{ height: "550px", width: "600px", marginTop: "65px" }} src={currentImage} alt="..." />
            </section>
        </>
    )
}