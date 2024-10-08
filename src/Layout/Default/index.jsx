import { Outlet } from "react-router-dom"
import HeaderDefault from "../Components/Header/Default"
import Footer from "../Components/Footer"


const DefaultLayout = () => {
    return (
        <div className="bg-[#f5f5f5]">
            <HeaderDefault />

            <div className="">
                <Outlet />
            </div>

            <Footer />
        </div>
    )
}

export default DefaultLayout
