import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/InformationCard.css";
import { Context } from "../store/appContext";
import SuccessComponent from "./Success";
import "../../styles/date_picker.css";


const RentInformationCard = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [canchaData, setCanchaData] = useState({});
    const [rentaData, setRentaData] = useState({});
    const [availableHours, setAvailableHours] = useState([]);
    const [allHours, setAllHours] = useState([]);
    const [takenHours, setTakenHours] = useState([]);

    const [user, setUser] = useState({});
    const { actions } = useContext(Context);
    const user_id = sessionStorage.getItem("id");
    const pathname = window.location.pathname;
    const pathNameDividido = pathname.split("/");
    const cancha_id = pathNameDividido[pathNameDividido.length - 1];
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCanchaData = async () => {
            try {
                const data = await actions.getCancha(cancha_id);
                setCanchaData(data);
            } catch (error) {
                console.error("Error fetching cancha data:", error);
            }
        };
        const fetchRentaData = async () => {
            try {
                const data = await actions.getRentas();
                console.log(data, "todas las rentas")
                const cancha_id_selected = parseInt(cancha_id);
                const canchaFiltered = data.filter(rentas => rentas.cancha_id === cancha_id_selected);
                const filteredRentas = canchaFiltered.filter(rentas => {
                    const rentasDate = new Date(rentas.date);
                    const selectedDateValue = selectedDate ? selectedDate.getDate() : null;
                    return (
                        selectedDate &&
                        rentasDate.getFullYear() === (selectedDate ? selectedDate.getFullYear() : null) &&
                        rentasDate.getMonth() === (selectedDate ? selectedDate.getMonth() : null) &&
                        rentasDate.getDate() === selectedDateValue
                    );
                });

                const takenHours = filteredRentas.map(entry => entry.time);
                setRentaData(filteredRentas);
                setTakenHours(takenHours);
                console.log(takenHours, "bookedTimeArray");

                const allHours = Array.from({ length: 15 }, (_, index) => index + 8);
                setAllHours(allHours);

                const availableHours = allHours.filter(hour => isHourAvailable(hour));
                setAvailableHours(availableHours);

                console.log(availableHours, "availableHours");

            } catch (error) {
                console.error("Error fetching cancha data:", error);
            }
        }
        let isMounted = true
        const fetchUserData = async () => {
            try {
                const data = await actions.getUser(user_id);
                setUser(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        fetchCanchaData();
        fetchRentaData();
        fetchUserData();
        return () => {
            isMounted = false;
        }

    }, [selectedDate]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted!");
        const date = selectedDate
        const time = selectedTime
        const contadorArriendo = null
        // para checkear el form enviado
        const formData = {
            cancha_id,
            user_id,
            date,
            time,
            contadorArriendo
        };

        const isSuccess = await actions.rentCanchas(
            cancha_id,
            user_id,
            date,
            time,
            contadorArriendo
        );

        if (isSuccess) {
            console.log("Rent successful!");
            navigate("/success");
        } else {
            console.log("Rent failed!");
        }
        console.log("Form Data:", formData);
    };


    const isHourAvailable = hour => !takenHours.includes(hour);


    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src="https://uploads-ssl.webflow.com/632871e15b53a0140af28aeb/633b061d864ce251bb36073e_pexels-markus-spiske-1752757.jpg" className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h1 className="card-title">{canchaData.name}</h1>
                                    <h2 className="card-text">{canchaData.detalle}</h2>
                                    <p className="card-text"><small className="text-body-secondary"></small></p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group mt-4">
                                    <label htmlFor="date"></label>
                                    <DatePicker
                                        className="form-control bg-dark text-white"
                                        placeholderText="Select Date"
                                        id="date"
                                        selected={selectedDate}
                                        onChange={(date) => setSelectedDate(date)}
                                        dateFormat="yyyy-MM-dd"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <div className="form-group text-white mb-4">
                                        <label htmlFor="time"></label>
                                        <select
                                            className="form-control bg-dark text-white"
                                            id="time"
                                            value={selectedTime}
                                            onChange={(e) => setSelectedTime(e.target.value)}
                                            required
                                            disabled={!selectedDate} // Disable the select until a date is selected
                                        >
                                            <option value="">Select a time</option>
                                            {allHours.map(hour => (
                                                <option
                                                    key={hour}
                                                    value={hour}
                                                    disabled={!isHourAvailable(hour)} // Disable the option if hour is not available
                                                >
                                                    {hour}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="name"></label>
                                    <input
                                        type="text"
                                        className="form-control bg-dark text-white"
                                        id="name"
                                        value={user.name || ""}
                                        required
                                        disabled={!selectedTime} // Disable the inputs until a time is selected
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email"></label>
                                    <input
                                        type="email"
                                        className="form-control bg-dark text-white"
                                        id="email"
                                        value={user.email || ""}
                                        required
                                        disabled={!selectedTime} // Disable the inputs until a time is selected
                                    />
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-primary mt-4" disabled={!selectedTime}>
                                        Rent Now
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div>

                    </div>
                </form>
            </div>
        </>
    );
};




export default RentInformationCard


