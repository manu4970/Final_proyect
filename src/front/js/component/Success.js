import React from "react";
import { Link } from "react-router-dom";


const SuccessComponent = () => {


    return (
        <>
            <div className="container text-center mt-5 mb-5 p-5 rounded shadow ">
                <div>
                    <h2>Rent Successful!</h2>
                    <p>The sport field has been rented.</p>
                </div>
                <Link
                    type="button"
                    className="button-32"
                    to="/homelogin"
                >
                    Rent for Next Week?
                </Link>
            </div>

        </>
    );
};

export default SuccessComponent;