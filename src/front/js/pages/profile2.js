import React from 'react';
import avatar from "../../img/avatar.png";
import AdminCancha from './adminCanchas';

function Profile2() {
    return (
        <section>
            <div className="container py-5">
                <div className="row">
                    <div className="col-4 mr-4" style={{ background: "#1C2331" }}>
                        <div className='d-flex align-items-center justify-content-center pt-4'>
                            <img src="https://i1.sndcdn.com/avatars-000733526755-v9y8eh-t500x500.jpg" alt="avatar"
                                className="rounded-circle img-fluid"
                                style={{ height: "100px", width: "100px" }}
                            />
                        </div>
                        <div>
                            <h5 className="my-3 text-center">Name LastName</h5>
                            <p className="text-center mb-1">manu@admin.com</p>
                        </div>
                    </div>
                    <div className="col-8 bg-secondary">
                        <AdminCancha />
                        <AdminCancha />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile2