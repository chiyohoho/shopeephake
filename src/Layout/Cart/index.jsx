import { Outlet } from "react-router-dom"
import Footer from "../Components/Footer"
import { Flex } from "antd"
import HeaderCart from "../Components/Header/Cart"

const CartLayout = () => {

    return (
        <div className="bg-[#f5f5f5]">
            <HeaderCart />

            <Flex className="max-w-[1400px] mx-auto px-5 gap-5 my-16">
                <Outlet />
            </Flex>

            <Footer />
        </div>
    )
}

export default CartLayout
