import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import "../../styles/InformationCard.css";
import { Context } from "../store/appContext";
import "../../styles/date_picker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const RentInformationCard = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [canchaData, setCanchaData] = useState({});
    const [rentaData, setRentaData] = useState([]);
    const [availableHours, setAvailableHours] = useState([]);
    const [allHours, setAllHours] = useState([]);
    const [takenHours, setTakenHours] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [user, setUser] = useState({});
    const { actions } = useContext(Context);
    const user_id = sessionStorage.getItem("id");
    const pathname = window.location.pathname;
    const pathNameDividido = pathname.split("/");
    const cancha_id = pathNameDividido[pathNameDividido.length - 1];
    const navigate = useNavigate();

    const [canchaLoading, setCanchaLoading] = useState(false);
    const [userLoading, setUserLoading] = useState(false);


    useEffect(() => {
        let isMounted = true;

        const fetchCanchaData = async () => {
            try {
                setCanchaLoading(true);
                const data = await actions.getCancha(cancha_id);
                if (isMounted) {
                    setCanchaData(data);
                }
            } catch (error) {
                console.error("Error fetching cancha data:", error);
                setError("Error fetching cancha data");
            } finally {
                setCanchaLoading(false);
            }
        };

        const fetchRentaData = async () => {
            try {
                const data = await actions.getRentas();
                console.log(data, "todas las rentas");
                const cancha_id_selected = parseInt(cancha_id);
                const canchaFiltered = data.filter(
                    (rentas) => rentas.cancha_id === cancha_id_selected
                );
                const filteredRentas = canchaFiltered.filter((rentas) => {
                    const rentasDate = new Date(rentas.date);
                    const selectedDateValue = selectedDate ? selectedDate.getDate() : null;
                    return (
                        selectedDate &&
                        rentasDate.getFullYear() === (selectedDate ? selectedDate.getFullYear() : null) &&
                        rentasDate.getMonth() === (selectedDate ? selectedDate.getMonth() : null) &&
                        rentasDate.getDate() === selectedDateValue
                    );
                });

                const takenHours = filteredRentas.map((entry) => entry.time);
                if (isMounted) {
                    setRentaData(filteredRentas);
                    setTakenHours(takenHours);

                    const allHours = Array.from({ length: 15 }, (_, index) => index + 8);
                    setAllHours(allHours);

                    const availableHours = allHours.filter(
                        (hour) => !takenHours.includes(hour)
                    );
                    setAvailableHours(availableHours);
                    console.log(availableHours, "availableHours");
                }
            } catch (error) {
                console.error("Error fetching cancha data:", error);
                setError("Error fetching renta data");
            }
        };

        const fetchUserData = async () => {
            try {
                setUserLoading(true);
                const data = await actions.getUser(user_id);
                if (isMounted) {
                    setUser(data);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Error fetching user data");
            } finally {
                setUserLoading(false);
            }
        };

        setLoading(true);
        fetchCanchaData()
            .then(() => fetchRentaData())
            .then(() => fetchUserData())
            .catch((error) => setError("An error occurred. Please try again later."))
            .finally(() => setLoading(false));

        return () => {
            isMounted = false;
        };
    }, [selectedDate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted!");
        const date = selectedDate;
        const time = selectedTime;
        const contadorArriendo = null;
        const formData = {
            cancha_id,
            user_id,
            date,
            time,
            contadorArriendo,
        };

        setLoading(true);
        const isSuccess = await actions
            .rentCanchas(cancha_id, user_id, date, time, contadorArriendo)
            .catch((error) => {
                console.error("Rent failed:", error);
                setError("Rent failed. Please try again later.");
            });

        if (isSuccess) {
            console.log("Rent successful!");
            navigate("/success");
        }

        console.log("Form Data:", formData);
        setLoading(false);
    };

    const isHourAvailable = (hour) => {
        const selectedDateTime = new Date(selectedDate);
        selectedDateTime.setHours(hour);

        const isTaken = rentaData.some((renta) => {
            const rentaDateTime = new Date(renta.date);
            rentaDateTime.setHours(parseInt(renta.time));
            return rentaDateTime.getTime() === selectedDateTime.getTime();
        });

        return !isTaken;
    };

    return (
        <>

            {error && <div>Error: {error}</div>}
            {!error && (
                <div className="container">
                    <div className="register-photo">
                        <div className="form-container">
                            <div className="image-holder"></div>
                            <form onSubmit={handleSubmit}>
                                <h2 className="text-center"><strong>Book</strong> it</h2>

                                <div className="form-group input-group input-group-sm mt-2 bg-dark">
                                    <span className="notspan input-group-text text-white border-0" id="inputGroup-sizing-sm">
                                        Spot :
                                    </span>
                                    {canchaLoading ? (
                                        <div className="loading-icon">
                                            <FontAwesomeIcon icon={faSpinner} spin />
                                        </div>

                                    ) : (
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="cancha_name"
                                            value={canchaData.name || ""}
                                            required
                                            disabled={!selectedTime || canchaLoading}
                                            onChange={(e) => setCanchaData({ ...canchaData, name: e.target.value })}
                                        />
                                    )}
                                </div>

                                <div className="form-group input-group input-group-sm mt-2 bg-dark">
                                    <span className="notspan input-group-text text-white border-0" id="inputGroup-sizing-sm">
                                        Name :
                                    </span>
                                    {userLoading ? (
                                        <div className="loading-icon">
                                            <FontAwesomeIcon icon={faSpinner} spin />
                                        </div>
                                    ) : (
                                        <input
                                            className="form-control"
                                            type="name"
                                            name="name"
                                            id="name"
                                            value={user.name || ""}
                                            required
                                            disabled={!selectedTime || userLoading}
                                        />
                                    )}
                                </div>

                                <div className="form-group input-group input-group-sm mt-2 bg-dark">
                                    <span className="notspan input-group-text text-white border-0" id="inputGroup-sizing-sm">
                                        Email:
                                    </span>
                                    {userLoading ? (
                                        <div className="loading-icon">
                                            <FontAwesomeIcon icon={faSpinner} spin />
                                        </div>
                                    ) : (
                                        <input
                                            className="form-control"
                                            type="email"
                                            name="email"
                                            value={user.email || ""}
                                            required
                                            disabled={!selectedTime}
                                        />
                                    )}
                                </div>

                                <div className="form-group mt-2 bg-dark ">

                                    <label htmlFor="date  ">
                                        <span className="notspan input-group-text text-white border-0 justify-content-center bg-dark pb-2 " id="inputGroup-sizing-sm"><i className="fa-regular fa-calendar-days"></i></span>

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
                                        <span className="notspan input-group-text text-white border-0 justify-content-center bg-dark pb-3" id="inputGroup-sizing-sm">
                                            <i className="fa-regular fa-clock pt-1"></i>
                                        </span>
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
                                        {allHours.map((hour) => {
                                            const openingHour = canchaData.apertura;
                                            const closingHour = canchaData.cierre;
                                            const disabled = !isHourAvailable(hour) || hour < openingHour || hour > closingHour;

                                            return (
                                                <option className="option2" key={hour} value={hour} disabled={disabled}>
                                                    {hour} Hrs
                                                </option>
                                            );
                                        })}
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
            )}
        </>
    );
};

export default RentInformationCard;






// import React, { useContext, useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useNavigate, useParams } from "react-router-dom";
// import "../../styles/InformationCard.css";
// import { Context } from "../store/appContext";
// import SuccessComponent from "./Success";
// import "../../styles/date_picker.css";


// const RentInformationCard = () => {
//     const [selectedDate, setSelectedDate] = useState(null);
//     const [selectedTime, setSelectedTime] = useState("");
//     const [canchaData, setCanchaData] = useState({});
//     const [rentaData, setRentaData] = useState([]);
//     const [availableHours, setAvailableHours] = useState([]);
//     const [allHours, setAllHours] = useState([]);
//     const [takenHours, setTakenHours] = useState([]);

//     const [user, setUser] = useState({});
//     const { actions } = useContext(Context);
//     const user_id = sessionStorage.getItem("id");
//     const pathname = window.location.pathname;
//     const pathNameDividido = pathname.split("/");
//     const cancha_id = pathNameDividido[pathNameDividido.length - 1];
//     const navigate = useNavigate();

//     useEffect(() => {
//         let isMounted = true;

//         const fetchCanchaData = async () => {
//             try {
//                 const data = await actions.getCancha(cancha_id);
//                 if (isMounted) {
//                     setCanchaData(data);
//                 }
//             } catch (error) {
//                 console.error("Error fetching cancha data:", error);
//             }
//         };

//         const fetchRentaData = async () => {
//             try {
//                 const data = await actions.getRentas();
//                 console.log(data, "todas las rentas");
//                 const cancha_id_selected = parseInt(cancha_id);
//                 const canchaFiltered = data.filter(rentas => rentas.cancha_id === cancha_id_selected);
//                 const filteredRentas = canchaFiltered.filter(rentas => {
//                     const rentasDate = new Date(rentas.date);
//                     const selectedDateValue = selectedDate ? selectedDate.getDate() : null;
//                     return (
//                         selectedDate &&
//                         rentasDate.getFullYear() === (selectedDate ? selectedDate.getFullYear() : null) &&
//                         rentasDate.getMonth() === (selectedDate ? selectedDate.getMonth() : null) &&
//                         rentasDate.getDate() === selectedDateValue
//                     );
//                 });

//                 const takenHours = filteredRentas.map(entry => entry.time);
//                 if (isMounted) {
//                     setRentaData(filteredRentas);
//                     setTakenHours(takenHours);

//                     const allHours = Array.from({ length: 15 }, (_, index) => index + 8);
//                     setAllHours(allHours);

//                     const availableHours = allHours.filter(hour => !takenHours.includes(hour));
//                     setAvailableHours(availableHours);
//                     console.log(availableHours, "availableHours");
//                 }
//             } catch (error) {
//                 console.error("Error fetching cancha data:", error);
//             }
//         };



//         const fetchUserData = async () => {
//             try {
//                 const data = await actions.getUser(user_id);
//                 if (isMounted) {
//                     setUser(data);
//                 }
//             } catch (error) {
//                 console.error("Error fetching user data:", error);
//             }
//         };

//         fetchCanchaData();
//         fetchRentaData();
//         fetchUserData();

//         return () => {
//             isMounted = false;
//         };
//     }, [selectedDate]);


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log("Form submitted!");
//         const date = selectedDate;
//         const time = selectedTime;
//         const contadorArriendo = null;
//         const formData = {
//             cancha_id,
//             user_id,
//             date,
//             time,
//             contadorArriendo
//         };

//         const isSuccess = await actions.rentCanchas(
//             cancha_id,
//             user_id,
//             date,
//             time,
//             contadorArriendo
//         );

//         if (isSuccess) {
//             console.log("Rent successful!");
//             navigate("/success");

//         } else {
//             console.log("Rent failed!");
//         }
//         console.log("Form Data:", formData);
//     };


//     const isHourAvailable = hour => {
//         const selectedDateTime = new Date(selectedDate);
//         selectedDateTime.setHours(hour);

//         const isTaken = rentaData.some(renta => {
//             const rentaDateTime = new Date(renta.date);
//             rentaDateTime.setHours(parseInt(renta.time));
//             return rentaDateTime.getTime() === selectedDateTime.getTime();
//         });

//         return !isTaken;
//     };

//     return (
//         <>
//             <div className="container">
//                 <div className="register-photo">
//                     <div className="form-container">
//                         <div className="image-holder"></div>
//                         <form onSubmit={handleSubmit}>
//                             <h2 className="text-center"><strong>Book</strong> it</h2>

//                             <div className="form-group input-group input-group-sm mt-2 bg-dark">
//                                 <span className="notspan input-group-text text-white border-0" id="inputGroup-sizing-sm">Spot :</span>
//                                 <input
//                                     className="form-control"
//                                     type="text"
//                                     name="cancha_name"
//                                     value={canchaData.name || ""}
//                                     required
//                                     disabled={!selectedTime}
//                                     onChange={(e) => setCanchaData({ ...canchaData, name: e.target.value })}
//                                 />
//                             </div>

//                             <div className="form-group input-group input-group-sm mt-2 bg-dark">
//                                 <span className="notspan input-group-text text-white border-0" id="inputGroup-sizing-sm">Name :</span>
//                                 <input
//                                     className="form-control"
//                                     type="name"
//                                     name="name"
//                                     id="name"
//                                     value={user.name || ""}
//                                     required
//                                     disabled={!selectedTime} />
//                             </div>

//                             <div className="form-group input-group input-group-sm mt-2 bg-dark">
//                                 <span className="notspan input-group-text text-white border-0" id="inputGroup-sizing-sm">Email :</span>
//                                 <input
//                                     className="form-control"
//                                     type="email"
//                                     name="email"
//                                     value={user.email || ""}
//                                     required
//                                     disabled={!selectedTime} />
//                             </div>
//                             <div className="form-group mt-2 bg-dark ">

//                                 <label htmlFor="date  ">
//                                     <span className="notspan input-group-text text-white border-0 justify-content-center bg-dark pb-2 " id="inputGroup-sizing-sm"><i className="fa-regular fa-calendar-days"></i></span>

//                                 </label>

//                                 <DatePicker
//                                     className="form-control text-white rounded-1 ml-2 bg-dark DatePicker"
//                                     placeholderText="Select a Date"
//                                     id="date"
//                                     selected={selectedDate}
//                                     onChange={(date) => setSelectedDate(date)}
//                                     dateFormat="yyyy-MM-dd"
//                                     required
//                                 />

//                             </div>
//                             <div className="form-group bg-dark notspan2">
//                                 <label htmlFor="time">
//                                     <span className="notspan input-group-text text-white border-0 justify-content-center bg-dark pb-3" id="inputGroup-sizing-sm">
//                                         <i className="fa-regular fa-clock pt-1"></i>
//                                     </span>
//                                 </label>

//                                 <select
//                                     className="form-control text-white"
//                                     id="time"
//                                     value={selectedTime}
//                                     onChange={(e) => setSelectedTime(e.target.value)}
//                                     required
//                                     disabled={!selectedDate}
//                                 >
//                                     <option className="option2" value="">Select a time</option>
//                                     {allHours.map((hour) => {
//                                         const openingHour = canchaData.apertura;
//                                         const closingHour = canchaData.cierre;
//                                         const disabled = !isHourAvailable(hour) || hour < openingHour || hour > closingHour;

//                                         return (
//                                             <option className="option2" key={hour} value={hour} disabled={disabled}>
//                                                 {hour} Hrs
//                                             </option>
//                                         );
//                                     })}
//                                 </select>
//                             </div>

//                             <div className="form-group">
//                                 {/* <div className="form-check"><label className="form-check-label"><input className="form-check-input" type="checkbox" />I agree to the license terms.</label></div> */}
//                             </div>
//                             <div className="form-group">
//                                 <button
//                                     className="btn btn-primary btn-block"
//                                     disabled={!selectedTime}
//                                     type="submit">Rent Now
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>

//         </>
//     );
// };




// export default RentInformationCard
