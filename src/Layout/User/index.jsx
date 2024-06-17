import { Outlet } from "react-router-dom"
import Footer from "../Components/Footer"
import { Flex } from "antd"
import UserNavBar from "../../Pages/User/Components/UserNavBar"
import HeaderDefault from "../Components/Header/Default"
import UserSideBar from "../../Components/UserSideBar"

const UserLayout = () => {

    return (
        <div className="bg-[#f5f5f5]">
            <HeaderDefault />

            <Flex className="max-w-[1400px] w-full gap-2 mx-auto px-5 my-5">
                <div className="max-[768px]:hidden">
                    <UserNavBar />
                </div>

                <div className="w-full">
                    <div className="min-[768px]:hidden mb-5">
                        <UserSideBar />
                    </div>

                    <div className="">
                        <Outlet />
                    </div>
                </div>
            </Flex>

            <Footer />
        </div>
    )
}

export default UserLayout
