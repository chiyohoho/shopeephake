import { Outlet } from "react-router-dom"
import HeaderDefault from "../Components/Header/Default"
import Footer from "../Components/Footer"
import { Flex } from "antd"
import UserNavBar from "../../Pages/User/Components/UserNavBar"

const UserLayout = () => {

    return (
        <div className="bg-[#f5f5f5]">
            <HeaderDefault />

            <Flex className="max-w-[1400px] min-h-[600px] mx-auto px-5 gap-5 my-16">
                <UserNavBar />
                <Outlet />
            </Flex>

            <Footer />
        </div>
    )
}

export default UserLayout
