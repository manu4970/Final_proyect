import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";
import { Context } from "../store/appContext";

export const Login = () => {
    const { store, actions } = useContext(Context)
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const navigate = useNavigate()

    const handleClick = () => {
        event.preventDefault()
        actions.login(email, pass).then(() => {
            navigate("/profile")
        })
    }

    return (
        <>
            <h1>Login</h1>
            <div className="d-flex justify-content-center mt-5">
                <form className="">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={pass} onChange={(e) => setPass(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
                </form>
            </div>
        </>
    )
}