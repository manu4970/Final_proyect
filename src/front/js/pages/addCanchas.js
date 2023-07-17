import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../component/UploadWidget";
import { Context } from "../store/appContext";
import regiones from "../store/regiones";

export const AddCanchas = () => {
    const { store, actions } = useContext(Context)
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate()

    const comunas = regiones

    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [region, setRegion] = useState("")
    const [comuna, setComuna] = useState("")
    const [apertura, setApertura] = useState("")
    const [cierre, setCierre] = useState("")
    const [precio, setPrecio] = useState("")
    const [sportType, setSportType] = useState("")
    const [cantidad, setCantidad] = useState(1)
    const [detalle, setDetalle] = useState("")
    const [is_available, setIs_available] = useState(true)
    const [user_id, setUser_id] = useState("")
    const [comunasRegion, setcomunasRegion] = useState([])
    const sportTypes = ["Tennis", "Football", "Paddle", "Basketball", "Baby Football"]
    const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
    const [horasCierre, setHorasCierre] = useState([])
    const [img, setImg] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [showError, setShowError] = useState(false);


    const handlePictureUpload = (uploadedPicture) => {
        setImg(uploadedPicture);

    };

    useEffect(() => {
        setUser_id(parseInt(sessionStorage.getItem("id")))
    }, []);

    function buscarCierre(e) {
        // console.log(e.target.value)
        setApertura(e.target.value)
        e.preventDefault()
        if (e.target.value == "8") {
            let horasCierre = hours.slice(1, 15)
            setHorasCierre([...horasCierre])
        }
        if (e.target.value == "9") {
            let horasCierre = hours.slice(2, 15)
            setHorasCierre([...horasCierre])
        }
        if (e.target.value == "10") {
            let horasCierre = hours.slice(3, 15)
            setHorasCierre([...horasCierre])
        }
        if (e.target.value == "11") {
            let horasCierre = hours.slice(4, 15)
            setHorasCierre([...horasCierre])
        }
        if (e.target.value == "12") {
            let horasCierre = hours.slice(5, 15)
            setHorasCierre([...horasCierre])
        }
        if (e.target.value == "13") {
            let horasCierre = hours.slice(6, 15)
            setHorasCierre([...horasCierre])
        }
        if (e.target.value == "14") {
            let horasCierre = hours.slice(7, 15)
            setHorasCierre([...horasCierre])
        }
        if (e.target.value == "15") {
            let horasCierre = hours.slice(8, 15)
            setHorasCierre([...horasCierre])
        }
        if (e.target.value == "16") {
            let horasCierre = hours.slice(9, 15)
            setHorasCierre([...horasCierre])
        }
        if (e.target.value == "17") {
            let horasCierre = hours.slice(10, 15)
            setHorasCierre([...horasCierre])
        }
        if (e.target.value == "18") {
            let horasCierre = hours.slice(11, 15)
            setHorasCierre([...horasCierre])
        }
        if (e.target.value == "19") {
            let horasCierre = hours.slice(12, 15)
            setHorasCierre([...horasCierre])
        }
        if (e.target.value == "20") {
            let horasCierre = hours.slice(13, 15)
            setHorasCierre([...horasCierre])
        }
        if (e.target.value == "21") {
            let horasCierre = hours.slice(14, 15)
            setHorasCierre([...horasCierre])
        }
        if (e.target.value == "22") {
            let horasCierre = hours.slice(15, 15)
            setHorasCierre([...horasCierre])
        }

    }

    function buscarComunas(e) {
        e.preventDefault()
        if (e.target.value == "7") {
            let comunasSelect = comunas[6].comunas
            setcomunasRegion([...comunasSelect])
        }

        if (e.target.value == "6") {
            let comunasSelect = comunas[5].comunas
            setcomunasRegion([...comunasSelect])
        }

        if (e.target.value == "1") {
            let comunasSelect = comunas[0].comunas
            setcomunasRegion([...comunasSelect])
        }

        if (e.target.value == "2") {
            let comunasSelect = comunas[1].comunas
            setcomunasRegion([...comunasSelect])
        }

        if (e.target.value == "3") {
            let comunasSelect = comunas[2].comunas
            setcomunasRegion([...comunasSelect])
        }

        if (e.target.value == "4") {
            let comunasSelect = comunas[3].comunas
            setcomunasRegion([...comunasSelect])
        }

        if (e.target.value == "5") {
            let comunasSelect = comunas[4].comunas
            setcomunasRegion([...comunasSelect])
        }

        if (e.target.value == "8") {
            let comunasSelect = comunas[7].comunas
            setcomunasRegion([...comunasSelect])
        }

        if (e.target.value == "9") {
            let comunasSelect = comunas[8].comunas
            setcomunasRegion([...comunasSelect])
        }

        if (e.target.value == "10") {
            let comunasSelect = comunas[9].comunas
            setcomunasRegion([...comunasSelect])
        }

        if (e.target.value == "11") {
            let comunasSelect = comunas[10].comunas
            setcomunasRegion([...comunasSelect])
        }

        if (e.target.value == "12") {
            let comunasSelect = comunas[11].comunas
            setcomunasRegion([...comunasSelect])
        }

        if (e.target.value == "13") {
            let comunasSelect = comunas[12].comunas
            setcomunasRegion([...comunasSelect])
        }

        if (e.target.value == "14") {
            let comunasSelect = comunas[13].comunas
            setcomunasRegion([...comunasSelect])
        }

        if (e.target.value == "15") {
            let comunasSelect = comunas[14].comunas
            setcomunasRegion([...comunasSelect])
        }

        if (e.target.value == "16") {
            let comunasSelect = comunas[15].comunas
            setcomunasRegion([...comunasSelect])
        }

    }



    const handleClick = (e) => {
        e.preventDefault()
        setIsLoading(true)
        console.log(name, location, region, comuna, apertura, cierre, precio, sportType, cantidad, detalle, is_available, user_id, img)
        actions.pushCancha(name, location, region, comuna, apertura, cierre, precio, sportType, cantidad, detalle, is_available, user_id, img).then(() => {
            console.log(this)
            if (store.addCanchaResp === true) {
                setShowError(true)
                setIsLoading(false)
                store.addCanchaResp = false
            } else {
                setShowError(false)
                setShowError(true)
                navigate("/admin")
            }
        })

    }

    return (
        <>
            <h1 className="d-flex align-items-center justify-content-center mt-4">Publish your court</h1>
            <section className="d-flex alaign-items-center justify-content-center gap-5">
                <form className="row g-3" style={{ height: "550px", width: "600px", marginTop: "20px" }}>

                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">Name</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="Introduce the name of your recint" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputPassword4" className="form-label">Region</label>
                        <select id="inputState" className="form-select" value={region} onChange={e => { buscarComunas(e); setRegion(e.target.value); }}>
                            <option value="">Choose...</option>
                            {regiones.map((region, index) => {
                                return <option key={index} value={index + 1}>{region.region}</option>
                            })}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputEmail4" className="form-label" >Comuna</label>
                        <select id="inputState" className="form-select" value={comuna} onChange={e => setComuna(e.target.value)}>
                            <option selected>Choose...</option>
                            {comunasRegion.map((comuna, index) =>
                                <option value={comuna} key={index}>{comuna}</option>
                            )}
                        </select>
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress2" className="form-label" >Address</label>
                        <input type="text" className="form-control" id="inputAddress2" placeholder="Avenida Libertador General Bernardo O'Higgins #1" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputCity" className="form-label" >Sport</label>
                        <select id="inputState" className="form-select" value={sportType} onChange={e => setSportType(e.target.value)}>
                            <option selected>Choose...</option>
                            {sportTypes.map((sport, index) => {
                                return <option key={index} value={sport}>{sport}</option>
                            })}
                        </select>
                    </div>
                    <div class="mb-3 col-md-6">
                        <label htmlFor="inputCity" className="form-label">Cost per hour</label>

                        <div className=" input-group">
                            <span class="input-group-text">$</span>
                            <input type="text" className="form-control" id="inputCity" value={precio} onChange={(e) => setPrecio(parseInt(e.target.value))} />
                        </div>
                    </div>
                    <div className="col-md-6 ">
                        <label htmlFor="inputCity" className="form-label">Disponibility</label>
                        <div className="d-flex gap-1">
                            <div className="col-md-6">
                                <select id="inputState" className="form-select" onChange={e => { buscarCierre(e); setApertura(parseInt(e.target.value)); }}>
                                    <option selected>Opens at</option>
                                    {hours.map((hour, index) => {
                                        return (
                                            <option key={index} value={hour}>{hour}:00</option>
                                        )
                                    }
                                    )}
                                </select>
                            </div>

                            <div className="col-md-6">
                                <select id="inputState" className="form-select" onChange={e => setCierre(parseInt(e.target.value))}>
                                    <option selected>Closes at</option>
                                    {horasCierre.map((hour, index) => {
                                        return (
                                            <option key={index} value={hour}>{hour}:00</option>
                                        )
                                    })}
                                </select>

                            </div>

                        </div>

                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Additional Details</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" placeholder="Enter more information about the location here..." rows="3" value={detalle} onChange={(e) => setDetalle(e.target.value)}></textarea>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary" onClick={handleClick}>
                            Create
                        </button>
                        {isLoading ? <div className="spinner-border mt-3 align-items-center" role="status"></div> : null}
                    </div>
                </form>
                <div className="col-3">
                    <UploadWidget handleUpload={handlePictureUpload} />
                    <div className="col-3">
                        {img && <img src={img} alt="Uploaded Picture" />}
                    </div>

                </div>
            </section>
        </>
    )
}