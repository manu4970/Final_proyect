import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";
import { Context } from "../store/appContext";

export const Signup = () => {
    const { actions } = useContext(Context)
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const navigate = useNavigate()
    const [focused, setFocused] = useState(false)
    const [passfocused, setPassFocused] = useState(false)
    const [rePassfocused, setRePassFocused] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("")

    const handleFocusEmail = (e) => {
        setFocused(true)
    }
    const handleFocusPass = (e) => {
        setPassFocused(true)
    }
    const handleFocusRePass = (e) => {
        setRePassFocused(true)
    }

    const handleClick = () => {
        event.preventDefault()
        setIsLoading(true)

        actions.signup(email, pass, name, lastName)
            .then((success) => {
                if (success) {
                    setIsLoading(false)
                    navigate("/login")
                } else {
                    setShowError(true)
                    setIsLoading(false)
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
                                <h4 className="card-title mt-2 text-center">Sign Up</h4>
                                <form className='gap-3'>
                                    <div className="mb-3">
                                        {/* <label for="name" class="form-label">Name</label> */}
                                        <input type="text" className="form-control" id="name" placeholder="Name" aria-label="Name" aria-describedby="basic-addon1" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        {/* <label for="lastname" class="form-label">Name</label> */}
                                        <input type="text" className="form-control" placeholder="Last Name" aria-label="Lastname" htmlFor="lastname" aria-describedby="basic-addon1" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <input type="email" className="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1" value={email} onChange={(e) => setEmail(e.target.value)} required pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$" onBlur={handleFocusEmail} focused={focused.toString()} />
                                        <span className="signUpError alert alert-danger">This is not an email</span>
                                    </div>
                                    <div className="mb-3">
                                        <input type="password" className="form-control" required placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" value={pass} onChange={(e) => setPass(e.target.value)} onBlur={handleFocusPass} focused={passfocused.toString()} />
                                        <span className="signUpError alert alert-danger">Password neet to have minimum an uppercase letter</span>
                                    </div>
                                    <div className="">
                                        <input type="password" className="form-control" placeholder="Repeat Password" aria-label="Username" aria-describedby="basic-addon1" required pattern={pass} onBlur={handleFocusRePass} focused={rePassfocused.toString()} />
                                        <span className="signUpError alert alert-danger">Password dosn't match</span>
                                    </div>
                                    <div className="form-group mb-2">
                                        <button type="submit" className="btn btn-primary btn-block mt-3" onClick={handleClick}> Sign Up </button>
                                    </div>
                                    {showError && <div className="alert alert-danger mt-3 mb-2" role="alert">User already exist</div>}
                                    {isLoading &&
                                        <div className="spinner-border mt-3" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    }
                                    <p className="text-center mt-3 mb-1">If you already have an account
                                        <Link to="/signup"> Log In </Link>
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