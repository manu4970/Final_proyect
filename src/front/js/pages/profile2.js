import React from 'react';
import avatar from "../../img/avatar.png";

function Profile2() {
    return (
        <section>
            <div className="container py-5">
                <div className="row ">
                    <div className="col-4 bg-secondary">
                        <div className='d-flex align-items-center justify-content-center pt-4'>
                            <img src="https://i1.sndcdn.com/avatars-000733526755-v9y8eh-t500x500.jpg" alt="avatar"
                                className="rounded-circle img-fluid"
                                style={{ height: "100px", width: "100px" }}
                            />
                        </div>
                        <div>
                            <h5 className="my-3">Name LastName</h5>
                            <p className="text-muted mb-1">Full Stack Prisoner</p>
                        </div>
                    </div>
                    <div className="col-8 bg-secondary">Your court</div>

                </div>
            </div>
        </section>
    )
}

export default Profile2