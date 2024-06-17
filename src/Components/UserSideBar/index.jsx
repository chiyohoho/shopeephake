import { Flex } from "antd"
import { useLayoutEffect, useState } from "react";
import { CiLock, CiShoppingCart, CiUser } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import getAvatar from "../../Utilities/Format/getAvatar";
import { truncatedEmail } from "../../Utilities/Format/truncatedEmail";

import './styles.scss'

const UserSideBar = () => {
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
        <div className="w-full p-2 shadow-detail mb-5 bg-white">
            <Flex className="items-center gap-2 mb-2 ">
                <div className="border-[1px] border-[#ccc] rounded-full">
                    <img className="rounded-full w-10 h-10 overflow-hidden"
                        src={avatar.userAvatar} alt="avatar"
                    />
                </div>

                <div className="">
                    <div className="font-[500]">
                        {truncatedEmail(userData)}
                    </div>
                </div>
            </Flex>

            <Flex className="items-center gap-1 h-[36px] overflow-hidden">
                <Flex onClick={() => handleRedirect(1)} className={`profile_option items-center gap-2 cursor-pointer ${indexSelect === 1 ? 'w-full' : 'w-8'}`}>
                    <div className={`text-[24px] ${indexSelect === 1 ? 'text-blue-600' : 'text-gray-500'} transition-all duration-300 ease-in-out`}>
                        <CiUser />
                    </div>
                    <p className={`text_delay text-[20px] ${indexSelect === 1 ? 'text-[#fa5030] block' : 'text-gray-500 hidden'}`}>{indexSelect === 1 ? 'Thông tin cá nhân' : ''}</p>
                </Flex>

                <Flex onClick={() => handleRedirect(2)} className={`profile_option items-center gap-2 cursor-pointer ${indexSelect === 2 ? 'w-full' : 'w-8'}`}>
                    <div className={`text-[24px] ${indexSelect === 2 ? 'text-blue-600' : 'text-gray-500'} transition-all duration-300 ease-in-out`}>
                        <CiLock />
                    </div>
                    <p className={`text_delay text-[20px] ${indexSelect === 2 ? 'text-[#fa5030] block' : 'text-gray-500 hidden'}`}>{indexSelect === 2 ? 'Đổi mật khẩu' : ''}</p>
                </Flex>

                <Flex onClick={() => handleRedirect(3)} className={`profile_option items-center gap-2 cursor-pointer ${indexSelect === 3 ? 'w-full' : 'w-8'}`}>
                    <div className={`text-[24px] ${indexSelect === 3 ? 'text-blue-600' : 'text-gray-500'} transition-all duration-300 ease-in-out`}>
                        <CiShoppingCart />
                    </div>
                    <p className={`text_delay text-[20px] ${indexSelect === 3 ? 'text-[#fa5030] block' : 'text-gray-500 hidden'}`}>{indexSelect === 3 ? 'Đơn hàng của tôi' : ''}</p>
                </Flex>
            </Flex>
        </div>
    )
}

export default UserSideBar
