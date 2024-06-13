import { Outlet } from "react-router-dom"
import Footer from "../Components/Footer"
import HeaderNonav from "../Components/Header/NoNav"


const NoNavLayout = () => {
    return (
        <div className="bg-[#f5f5f5]">
            <HeaderNonav />

            <div className="h-[600px]">
                <Outlet />
            </div>

            <Footer />
        </div>
    )
}

export default NoNavLayout
