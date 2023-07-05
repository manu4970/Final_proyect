import React, { useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/InformationCard.css";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

const RentInformationCard = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedCantidad, setSelectedCantidad] = useState("");
    const { actions } = useContext(Context);
    const sessionId = sessionStorage.getItem("id");
    const pathname = window.location.pathname;
    const pathNameDividido = pathname.split("/");
    const [canchaData, setCanchaData] = useState({});


    useEffect(() => {
        const fetchCanchaData = async () => {
            try {
                const data = await actions.getCancha(pathNameDividido[pathNameDividido.length - 1]);
                setCanchaData(data);
            } catch (error) {
                console.error("Error fetching cancha data:", error);
            }
        };
        const fetchUserData = async () => {
            try {
                const data = await actions.getUser(sessionId);
                console.log(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        fetchCanchaData();
        fetchUserData();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted!");

        const isSuccess = await actions.rentCanchas("cancha_id", sessionId, selectedDate, selectedTime, selectedCantidad);

        if (isSuccess) {
            console.log("Rent successful!");
        } else {
            console.log("Rent failed!");
        }
    };
    console.log(canchaData, "canchaData");

    return (
        <>
            <div>
                <div className="card bg-dark text-white">
                    <img
                        src="https://uploads-ssl.webflow.com/632871e15b53a0140af28aeb/633b061d864ce251bb36073e_pexels-markus-spiske-1752757.jpg"
                        className="card-img"
                        alt="Stony Beach"
                    />
                    <div className="card-img-overlay d-flex flex-column justify-content-end ">

                        {canchaData.is_available ?
                            <p className="card-text bg-success flex align-items-center">Available</p> :
                            <p className="card-text bg-warning text-dark">Not Available</p>
                        }

                        <div className="row">
                            <div className="col mt-4 pt-4">
                                <h5 className="card-title ">{canchaData.name}</h5>
                                <p className="card-text mt-4 pt-4"> {canchaData.detalle}</p>

                            </div>
                            <div className="col ">
                                <div className="col d-flex justify-content-end ">
                                    <div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group ">
                                                <label htmlFor="name"></label>
                                                <input type="text" className="form-control bg-info " id="name" placeholder="Name" required />
                                            </div>
                                            <div className="form-group ">
                                                <label htmlFor="email"></label>
                                                <input type="email" className="form-control bg-info" id="email" placeholder="Email" required />
                                            </div>
                                            <div className="form-group  mb-4 ">
                                                <label htmlFor="phone"></label>
                                                <input type="tel" className="form-control bg-info" id="phone" placeholder="Phone" required />
                                            </div>
                                            <div className="form-group ">
                                                <label htmlFor="date"></label>
                                                <DatePicker
                                                    className="form-control bg-info text-dark" placeholderText="Select Date"
                                                    id="date"
                                                    selected={selectedDate}
                                                    onChange={(date) => setSelectedDate(date)}
                                                    dateFormat="yyyy-MM-dd"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group text-dark mb-4">
                                                <label htmlFor="time"></label>
                                                <select
                                                    className="form-control bg-info"
                                                    id="time"
                                                    value={selectedTime}
                                                    onChange={(e) => setSelectedTime(e.target.value)}
                                                    required
                                                >
                                                    <option value="">Select a time</option>
                                                    <option value="09:00">9:00 AM</option>
                                                    <option value="11:00">11:00 AM</option>
                                                    <option value="13:00">1:00 PM</option>
                                                    <option value="15:00">3:00 PM</option>
                                                    <option value="17:00">5:00 PM</option>
                                                    <option value="19:00">7:00 PM</option>
                                                    <option value="21:00">9:00 PM</option>
                                                    <option value="23:00">11:00 PM</option>
                                                </select>
                                            </div>

                                            <div className="form-group text-dark mb-4">
                                                <label htmlFor="cantidad"></label>
                                                <select
                                                    className="form-control bg-info"
                                                    id="cantidad"
                                                    value={selectedCantidad}
                                                    onChange={(e) => setSelectedCantidad(e.target.value)}
                                                    required
                                                >
                                                    <option value="">Cantidad de Canchas(1-4)</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                </select>
                                            </div>
                                            <button type="submit" className="button-32">
                                                Rent Now
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
};




export default RentInformationCard