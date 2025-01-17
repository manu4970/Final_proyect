import React, { useContext, useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import UploadWidget from '../component/UploadWidget';
import { Context } from "../store/appContext";
import regiones from "../store/regiones";

function AdminCancha() {
    const userId = sessionStorage.getItem('id')
    const { actions, store } = useContext(Context)
    const [showModal, setShowModal] = useState(false);
    const [canchaModal, setCanchaModal] = useState({})
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
    const comunas = regiones

    useEffect(() => {
        actions.fetchUserCanchas(userId)
        setUser_id(sessionStorage.getItem('id'))
    }, [])

    const handlePictureUpload = (uploadedPicture) => {
        setImg(uploadedPicture);

    };


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

    const handleDelete = (index) => {
        actions.deleteCancha(index).then(() => {
            window.location.reload(false);
        })
        // window.location.reload(false);
    }

    const handleEdit = (cancha) => {
        setCanchaModal(cancha)
        setShowModal(true)
        console.log(canchaModal)

    }

    const handleClick = (e) => {
        e.preventDefault()
        actions.putCancha(canchaModal.id, name, location, region, comuna, apertura, cierre, precio, sportType, cantidad, detalle, is_available, user_id, img).then(() => {
            window.location.reload(false);
        })
    }

    return (
        <>
            <section className='mt-5'>
                <h1 className='d-flex align-items-center justify-content-center p-4'>Administrate your courts</h1>
            </section>
            <div className='container'>
                <div className='row d-flex align-items-center justify-content-center'>
                    <div className='col-10'>
                        <table className="table table-dark table-striped">
                            <caption>List of courts</caption>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Sport</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Opens at</th>
                                    <th scope="col">Closes at</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody className='align-text-center'>
                                {store.userCanchas.map((cancha, index) => {
                                    return (
                                        <tr key={index} >
                                            <th scope="row">{index + 1}</th>
                                            <td >{cancha.name}</td>
                                            <td>{cancha.location}</td>
                                            <td>{cancha.sportType}</td>
                                            <td>$ {cancha.precio}</td>
                                            <td>{cancha.apertura}:00</td>
                                            <td>{cancha.cierre}:00</td>
                                            <td>
                                                <span className='d-flex gap-2'>
                                                    <button className='btn btn-danger' onClick={() => handleDelete(cancha.id)}>Delete</button>
                                                    <button className='btn btn-primary' onClick={() => handleEdit(cancha)}>Edit</button>
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                    </div>

                </div>
            </div>
            {/* Modal */}
            {showModal && (
                <div className="modal text-light" tabIndex="-1">
                    <div class="modal-dialog modal-lg bg-dark">
                        <div className="modal-content bg-dark">
                            <div class="modal-header">
                                <h5 class="modal-title">Edit</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Name</label>
                                        <input type="email" class="form-control" placeholder={canchaModal.name} id="exampleInputEmail1" aria-describedby="emailHelp" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputPassword4" className="form-label">Region</label>
                                        <select id="inputState" className="form-select" value={region} onChange={e => { buscarComunas(e); setRegion(parseInt(e.target.value)); }}>
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
                                        <input type="text" className="form-control" id="inputAddress2" placeholder={canchaModal.location} value={location} onChange={(e) => setLocation(e.target.value)} />
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
                                            <input type="text" className="form-control" placeholder={canchaModal.precio} id="inputCity" value={precio} onChange={(e) => setPrecio(parseInt(e.target.value))} />
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
                                        <textarea className="form-control" id="exampleFormControlTextarea1" placeholder={canchaModal.detalle} rows="3" value={detalle} onChange={(e) => setDetalle(e.target.value)}></textarea>
                                    </div>
                                </form>
                                <div className="col-3">
                                    <UploadWidget handleUpload={handlePictureUpload} />
                                    <div className="col-3">
                                        {img && <img src={img} alt="Uploaded Picture" />}
                                    </div>

                                </div>


                            </div>
                            <div class="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                                {/* Add your form or other elements for editing the court */}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* CSS Styles */}
            <style jsx>{`
                .modal {
                    position: fixed;
                    z-index: 1;
                    left: 0;
                    top: 0;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.4);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .modal-content {
                    background-color: #fefefe;
                    padding: 20px;
                    width: 100%;
                }

                .close {
                    color: #aaa;
                    float: right;
                    font-size: 28px;
                    font-weight: bold;
                    cursor: pointer;
                }
            `}</style>
        </>

    )
}

export default AdminCancha