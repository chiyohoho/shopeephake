import { Outlet } from "react-router-dom"
import HeaderDefault from "../Header/Default"
import Footer from "../Footer"

const DefaultLayout = () => {
    return (
        <div className="bg-[#f5f5f5]">
            <HeaderDefault />

            <div className="min-h-[100vh]">
                <Outlet />
            </div>

            <Footer />
        </div>
    )
}

export default DefaultLayout
