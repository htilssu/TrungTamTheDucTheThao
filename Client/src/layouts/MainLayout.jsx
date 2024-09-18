
import { Outlet } from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Footer from "../modules/core/components/Footer.jsx";
import Navbar from "../modules/core/system-component/Navbar.jsx";

export function MainLayout() {
    return (
        <div className={"w-full"}>

            <div className="fixed top-0 left-0 w-full z-50">
                <Navbar/>
            </div>

            <div className={"mt-24"}>
                <div className={"w-full"}></div>
                <Outlet/>
            </div>
            <ToastContainer/>
            <Footer/>
        </div>
    );
}
