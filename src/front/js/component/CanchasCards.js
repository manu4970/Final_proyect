import React from 'react';
import "../../styles/home.css";

function CanchasCards({ cancha }) {
    return (
        <>
            <div className="child card">
                <img src="https://cdn.versacourt.com/cmss_files/imagelibrary/general-use/thb-court-size.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{cancha.name}</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </>
    )
}

export default CanchasCards