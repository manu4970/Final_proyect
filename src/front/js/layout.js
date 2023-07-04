import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BackendURL } from "./component/backendURL";
import { Navbar } from "./component/navbar";
import ScrollToTop from "./component/scrollToTop";

import InformationCard from "./component/BigCardInformation";
import Profile from "./pages/Profile-Protected";
import { AddCanchas } from "./pages/addCanchas";
import RenderCanchas from "./pages/canchas";
import { Demo } from "./pages/demo";
import ForTesting from "./pages/forTesting";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import RentInformationCard from "./component/BigCardInformation";
import { Footer } from "./component/footer";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    const logged = sessionStorage.getItem("isLoggedIn");

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <Navbar />
                <ScrollToTop>
                    <Routes>
                        <Route element={logged ? <Profile /> : <Home />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Profile />} path="/profile" />
                        <Route element={<RenderCanchas />} path="/canchas" />
                        <Route element={<ForTesting />} path="/test" />
                        <Route element={<RentInformationCard />} path="/rent" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<AddCanchas />} path="/addcanchas" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                </ScrollToTop>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
