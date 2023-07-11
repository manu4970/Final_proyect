import React, { useContext, useEffect, useState, useSyncExternalStore } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";
import login from "../../styles/login.css";
import { Context } from "../store/appContext";

export const Login2 = () => {
    const { store, actions } = useContext(Context)
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const handleClick = () => {
        event.preventDefault()
        setIsLoading(true)
        actions.login(email, pass).then(() => {
            console.log(this)
            if (store.loginResp === true) {
                setShowError(true)
                setIsLoading(false)
                store.loginResp = false
            } else {
                setShowError(false)
                setShowError(true)
                navigate("/")
            }
        })

    }

    return (
        <section className="pt-5 pb-5 mt-0 align-items-center d-flex">
            <div className='container-fluid' >
                <div className="row  justify-content-center align-items-center d-flex-row text-center h-100">
                    <div className="col-12 col-md-4 col-lg-3 h-50 ">
                        <div className="">
                            <div className="card-body mx-auto text-light mt-4" style={{ background: '#1C2331' }}>
                                <h4 className="card-title mt-2 text-center">Login</h4>
                                <form className='gap-3'>
                                    <div className="input-group  mb-3">
                                        <span className="input-group-text" id="basic-addon1"><i className="fa fa-envelope"></i></span>
                                        <input type="email" className="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="input-group ">
                                        <span className="input-group-text" id="basic-addon1"><i className="fa fa-lock"></i></span>
                                        <input type="password" className="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" value={pass} onChange={(e) => setPass(e.target.value)} />
                                    </div>
                                    {showError && <div className="alert alert-danger mt-3 mb-1" role="alert">Email or password incorrect</div>}
                                    {isLoading &&
                                        <div className="spinner-border mt-3" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    }
                                    {/* {store.loginResp ?  : null} */}
                                    <div className="form-group mb-2">
                                        <button type="submit" className="btn btn-primary btn-block mt-3" onClick={handleClick}> Sign in </button>
                                    </div>
                                    <p className="text-center ">If you don't have an account
                                        <Link to="/signup"> Sign Up </Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


