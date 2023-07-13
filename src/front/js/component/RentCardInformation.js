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
                <div className="register-photo">
                    <div className="form-container">
                        <div className="image-holder"></div>
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-center"><strong>Book</strong> it</h2>

                            <div className="form-group input-group input-group-sm mt-2 bg-dark">
                                <span class="notspan input-group-text text-white border-0" id="inputGroup-sizing-sm">Spot :</span>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="cancha_name"
                                    value={canchaData.name || ""}
                                    required
                                    disabled={!selectedTime}
                                    onChange={(e) => setCanchaData({ ...canchaData, name: e.target.value })}
                                />
                            </div>

                            <div className="form-group input-group input-group-sm mt-2 bg-dark">
                                <span class="notspan input-group-text text-white border-0" id="inputGroup-sizing-sm">Name :</span>
                                <input
                                    className="form-control"
                                    type="name"
                                    name="name"
                                    id="name"
                                    value={user.name || ""}
                                    required
                                    disabled={!selectedTime} />
                            </div>

                            <div className="form-group input-group input-group-sm mt-2 bg-dark">
                                <span class="notspan input-group-text text-white border-0" id="inputGroup-sizing-sm">Email :</span>
                                <input
                                    className="form-control"
                                    type="email"
                                    name="email"
                                    value={user.email || ""}
                                    required
                                    disabled={!selectedTime} />
                            </div>
                            <div className="form-group mt-2 bg-dark ">

                                <label htmlFor="date  ">
                                    <span class="notspan input-group-text text-white border-0 justify-content-center bg-dark pb-2 " id="inputGroup-sizing-sm"><i class="fa-regular fa-calendar-days"></i></span>

                                </label>

                                <DatePicker
                                    className="form-control text-white rounded-1 ml-2 bg-dark DatePicker"
                                    placeholderText="Select a Date"
                                    id="date"
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    dateFormat="yyyy-MM-dd"
                                    required
                                />

                            </div>
                            <div className="form-group bg-dark notspan2">
                                <label htmlFor="time">
                                    <span class=" notspan input-group-text text-white border-0 justify-content-center bg-dark pb-3" id="inputGroup-sizing-sm"><i class="fa-regular fa-clock pt-1"></i></span>
                                </label>

                                <select
                                    className="form-control text-white"
                                    id="time"
                                    value={selectedTime}
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                    required
                                    disabled={!selectedDate}
                                >
                                    <option className="option2" value="">Select a time</option>
                                    {allHours.map((hour) => (
                                        <option className="option2"
                                            key={hour}
                                            value={hour}
                                            disabled={!isHourAvailable(hour)}
                                        >
                                            {hour} Hrs
                                        </option>
                                    ))}
                                </select>

                            </div>

                            <div className="form-group">
                                {/* <div className="form-check"><label className="form-check-label"><input className="form-check-input" type="checkbox" />I agree to the license terms.</label></div> */}
                            </div>
                            <div className="form-group">
                                <button
                                    className="btn btn-primary btn-block"
                                    disabled={!selectedTime}
                                    type="submit">Rent Now
                                </button>
                            </div>
                        </form>
                    </div>
                </div>


            </div>

        </>
    );
};




export default RentInformationCard


{/* <form onSubmit={handleSubmit}>
<div className="card mb-3">
    <div className="row">
        <div className="col-md-4">
            <img
                src="https://uploads-ssl.webflow.com/632871e15b53a0140af28aeb/633b061d864ce251bb36073e_pexels-markus-spiske-1752757.jpg"
                className="img-fluid rounded-start"
                alt="..."
            />
        </div>
        <div className="col-md-8">
            <div className="card-body">
                <h1 className="card-title">{canchaData.name}</h1>
                <h2 className="card-text">{canchaData.detalle}</h2>
                <p className="card-text">
                    <small className="text-body-secondary"></small>
                </p>
            </div>
        </div>
    </div>
    <div className="row">
        <div className="col">
            <div className="form-group mt-4 ml-4">
                <label htmlFor="date">Select Date:</label>
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
                    <label htmlFor="time">Select Time:</label>
                    <select
                        className="form-control bg-dark text-white"
                        id="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        required
                        disabled={!selectedDate} // Disable the select until a date is selected
                    >
                        <option value="">Select a time</option>
                        {allHours.map((hour) => (
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
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    className="form-control bg-dark text-white"
                    id="name"
                    value={user.name || ""}
                    required
                    disabled={!selectedTime}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    className="form-control bg-dark text-white"
                    id="email"
                    value={user.email || ""}
                    required
                    disabled={!selectedTime}
                />
            </div>
            <div>
                <button
                    type="submit"
                    className="btn btn-primary mt-4"
                    disabled={!selectedTime}
                >
                    Rent Now
                </button>
            </div>
        </div>
    </div>
</div>
</form>

 */}
