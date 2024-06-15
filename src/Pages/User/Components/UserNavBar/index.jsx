import { Divider, Flex } from "antd"
import { useLayoutEffect, useState } from "react";
import { CiLock, CiShoppingCart, CiUser } from "react-icons/ci";
import { FaPen, } from "react-icons/fa6"
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import getAvatar from "../../../../Utilities/Format/getAvatar";
import { truncatedEmail } from "../../../../Utilities/Format/truncatedEmail";

const UserNavBar = () => {
    const location = useLocation().pathname
    const navigate = useNavigate()
    const [indexSelect, setIndexSelect] = useState(0)
    const userData = useSelector(state => state.user.user.data)

    const avatar = getAvatar(userData)

    useLayoutEffect(() => {
        if (location.includes('profile')) {
            setIndexSelect(1)
        } else if (location.includes('password')) {
            setIndexSelect(2)
        } else if (location.includes('purchase')) {
            setIndexSelect(3)
        } else {
            setIndexSelect(0)
        }
    }, [location])

    const handleRedirect = (page) => {
        if (page === 1) {
            setIndexSelect(1)
            navigate('/user/profile')
        } else if (page === 2) {
            setIndexSelect(1)
            navigate('/user/password')
        } else if (page === 3) {
            setIndexSelect(3)
            navigate('/user/purchase')
        }
    }

    return (
        <div className="max-w-[250px] w-full ">
            <Flex className="items-center gap-2 ">
                <div className="border-[1px] border-[#ccc] rounded-full">
                    <img className="w-[50px] h-[50px] rounded-full overflow-hidden"
                        src={avatar.userAvatar} alt="avatar"
                        onError={(e) => { e.target.onerror = null; e.target.src = avatar.defaultAvatar }}
                    />
                </div>

                <div className="">
                    <div className="font-[500]">
                        {truncatedEmail(userData)}
                    </div>
                    <Flex className="items-center gap-2">
                        <div className="font-[500] text-gray-500 cursor-pointer">
                            <FaPen />
                        </div>
                        <p className="font-[500] text-gray-500 cursor-pointer">Chỉnh sửa</p>
                    </Flex>
                </div>
            </Flex>

            <Divider />

            <Flex className="flex-col gap-3">
                <Flex onClick={() => handleRedirect(1)} className="items-center gap-2 cursor-pointer">
                    <div className={`text-[24px] ${indexSelect === 1 ? 'text-blue-600' : 'text-gray-500'} transition-all duration-300 ease-in-out`}>
                        <CiUser />
                    </div>
                    <p className={`text-[20px] ${indexSelect === 1 ? 'text-[#fa5030]' : 'text-gray-500'} transition-all duration-503000 ease-in-out`}>Thông tin cá nhân</p>
                </Flex>

                <Flex onClick={() => handleRedirect(2)} className="items-center gap-2 cursor-pointer">
                    <div className={`text-[24px] ${indexSelect === 2 ? 'text-blue-600' : 'text-gray-500'} transition-all duration-300 ease-in-out`}>
                        <CiLock />
                    </div>
                    <p className={`text-[20px] ${indexSelect === 2 ? 'text-[#fa5030]' : 'text-gray-500'} transition-all duration-300 ease-in-out`}>Đổi mật khẩu</p>
                </Flex>

                <Flex onClick={() => handleRedirect(3)} className="items-center gap-2 cursor-pointer">
                    <div className={`text-[24px] ${indexSelect === 3 ? 'text-blue-600' : 'text-gray-500'} transition-all duration-300 ease-in-out`}>
                        <CiShoppingCart />
                    </div>
                    <p className={`text-[20px] ${indexSelect === 3 ? 'text-[#fa5030]' : 'text-gray-500'} transition-all duration-300 ease-in-out`}>Đơn hàng của tôi</p>
                </Flex>
            </Flex>
        </div>
    )
}

export default UserNavBar
