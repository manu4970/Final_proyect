import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/buttonsHome.css";
import "../../styles/home.css";
import { Context } from "../store/appContext";


export const Home = () => {
	const { store, actions } = useContext(Context);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const navigate = useNavigate();
	const [logged, isLoggedIn] = useState(sessionStorage.getItem("isLoggedIn"))
	const handleLogout = () => {
		sessionStorage.removeItem("token");
		navigate("/homelogin");
	};

	const images = [
		"https://uploads-ssl.webflow.com/632871e15b53a0140af28aeb/633b061d864ce251bb36073e_pexels-markus-spiske-1752757.jpg",
		"https://journey.app/blog/wp-content/uploads/2021/11/reglas-deportivas_Tenis_.jpg",
		"https://mundoentrenamiento.com/wp-content/uploads/2015/04/causas-de-la-fatiga-en-el-futbol.webp"
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
		}, 5000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	const currentImage = images[currentImageIndex];

	return (
		<div>
			<div
				className="home"
				style={{
					backgroundImage: `url(${currentImage})`,
					backgroundPosition: "center",
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					backgroundAttachment: "fixed",
					height: "100vh",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					textAlign: "center"
				}}
			>
				<p className="text-uppercase fw-bold float-right text-white">
					"Spot Sport allows you to easily book courts for your preferred sports at the venue of your choice, ensuring the best prices and ultimate convenience."
				</p>
				<div className="d-flex justify-content-between ">
					<div className="btnhome">
						<Link className="btnhome btn-lg btn-dark" to={logged ? "/home" : "/login"}>
							<span>Reserva tu Cancha</span>
						</Link>
					</div>
					<div className="btnhome">
						<Link className="btnhome btn-lg btn-dark" to="/addcanchas">
							<span>Administra tus Canchas</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
