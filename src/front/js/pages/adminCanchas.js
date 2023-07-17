import React, { useContext } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { Context } from "../store/appContext";

function AdminCancha() {
    const userId = sessionStorage.getItem('id')
    const { actions, store } = useContext(Context)

    useEffect(() => {
        actions.fetchUserCanchas(userId)
    }, [])

    console.log(store.userCanchas)

    return (
        <>
            <section>
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
                            <tbody>
                                {store.userCanchas.map((cancha, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{cancha.name}</td>
                                            <td>{cancha.location}</td>
                                            <td>{cancha.sportType}</td>
                                            <td>$ {cancha.precio}</td>
                                            <td>{cancha.apertura}:00</td>
                                            <td>{cancha.cierre}:00</td>
                                            <td>
                                                <span className='d-flex gap-2'>
                                                    <button className='btn btn-danger'>Delete</button>
                                                    <button className='btn btn-primary'>Edit</button>
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
        </>

    )
}

export default AdminCancha