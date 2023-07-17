import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BackendURL } from "./component/backendURL";
import { Navbar } from "./component/navbar";
import ScrollToTop from "./component/scrollToTop";


import RentInformationCard from "./component/RentCardInformation";
import SuccessComponent from "./component/Success";
import { Footer } from "./component/footer";
import { AddCanchas } from "./pages/addCanchas";
import AdminCancha from "./pages/adminCanchas";
import { CanchaDetails } from "./pages/canchaDetail";
import RenderCanchas from "./pages/canchas";
import { Demo } from "./pages/demo";
import ForTesting from "./pages/forTesting";
import { Home } from "./pages/home";
import { HomeLogin } from "./pages/homelogin";
import { Login2 } from "./pages/login2";
import Profile2 from "./pages/profile2";
import { Signup } from "./pages/signup";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { Homereloaded } from "./pages/homereloaded";



//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    const logged = sessionStorage.getItem("isLoggedIn");
    // const { store, actions } = useContext(Context)

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <Navbar />
                <ScrollToTop>
                    <Routes>
                        <Route element={<Homereloaded />} path="/" />
                        <Route element={<AdminCancha />} path="/admin" />
                        <Route element={<HomeLogin />} path="/home" />
                        <Route element={<Login2 />} path="/login" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Profile2 />} path="/profile" />
                        <Route element={<RenderCanchas />} path="/canchas" />
                        <Route element={<Homereloaded />} path="/test" />
                        {/* <Route element={<RentInformationCard />} path="/rent/:id" /> */}
                        <Route element={<RentInformationCard />} path="/rent/:id" />
                        <Route element={<HomeLogin />} path="/homelogin" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<AddCanchas />} path="/addcanchas" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<CanchaDetails />} path="detalles" />
                        <Route element={<SuccessComponent />} path="/success" />
                        <Route element={<h1>Not found!</h1>} path="*" />
                    </Routes>
                </ScrollToTop>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
