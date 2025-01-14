import React, { useContext, useEffect, useState } from 'react';
import "../../styles/profile.css";
import FindCanchaButton from "../component/FindCanchaButton";
import RentButton from '../component/RentButton';
import UploadWidget from '../component/UploadWidget';
import { Context } from "../store/appContext";


const Profile = () => {
    const [profilePicture, setProfilePicture] = useState('https://i1.sndcdn.com/avatars-000733526755-v9y8eh-t500x500.jpg');
    const { store, actions } = useContext(Context);
    const sessionId = sessionStorage.getItem('id')
    // const handleChangePicture = () => {
    //     const randomImageURL = 'https://source.unsplash.com/random';
    //     setProfilePicture(randomImageURL);
    // };

    useEffect(() => {
        actions.getUser(sessionId).then(() => {
        })
    }, []);


    return (
        <section className='bg-dark'>
            <div className="container py-5">
                <div className="row">
                    <div className="col">

                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-4">
                        <div className="card mb-4">
                            <div className="card-body text-center">
                                <img src={profilePicture} alt="avatar" className="rounded-circle img-fluid" style={{ width: '150px' }} />
                                <div>
                                    <UploadWidget />
                                </div>
                                <h5 className="my-3">{store.user.lastname} {store.user.name}</h5>
                                <p className="text-muted mb-1">Full Stack Prisoner</p>
                                <p className="text-muted mb-4">New york, USA</p>
                                <div className="d-flex justify-content-center mb-2">
                                    <button type="button" className="btn btn-primary">Follow</button>
                                    <button type="button" className="btn btn-outline-primary ms-1">Message</button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-lg-8">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Full Name</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{store.user.lastname} {store.user.name}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Email</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{store.user.email}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Sport Interest</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">Basquetball</p>
                                    </div>
                                </div>
                                <hr />
                            </div>
                            <div className="card mb-4 mb-lg-0">
                                <div className="card-body p-0 ">
                                    <ul className="list-group list-group-flush rounded-3">

                                        <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="list-group-item d-flex justify-content-between align-items-center p-3 bg-dark">
                                            <i className="fab fa-whatsapp fa-lg " style={{ color: '#00CC66' }}></i>
                                            <p className="mb-0  text-white">Whatsapp</p>
                                        </a>

                                        <a href="https://twitter.com/home" target="_blank" rel="noopener noreferrer" className="list-group-item d-flex justify-content-between align-items-center p-3 bg-dark">
                                            <i className="fab fa-twitter fa-lg" style={{ color: '#55acee' }}></i>
                                            <p className="mb-0 text-white">Twitter</p>
                                        </a>
                                        <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="list-group-item d-flex justify-content-between align-items-center p-3 bg-dark">
                                            <i className="fab fa-instagram fa-lg" style={{ color: '#ac2bac' }}></i>
                                            <p className="mb-0  text-white ">Instagram</p>
                                        </a>
                                        <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="list-group-item d-flex justify-content-between align-items-center p-3 bg-dark">
                                            <i className="fab fa-facebook-f fa-lg" style={{ color: '#3b5998' }}></i>
                                            <p className="mb-0  text-white ">Facebook</p>
                                        </a>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                        </div>
                        <div className="row">
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );

};

export default Profile;
