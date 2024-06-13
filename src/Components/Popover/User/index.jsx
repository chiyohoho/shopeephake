import { Link } from 'react-router-dom'
import LogoutButton from '../../Button/Logout'
import './styles.scss'

const UserPopover = () => {
    return (
        <div className="w-[200px]">
            <Link to={'/user/profile'}>
                <div className="user_popover_select text-left w-full rounded-sm hover:bg-gray-300 hover:text-black">
                    Tài khoản của tôi
                </div>
            </Link>

            <Link to={'/user/purchase'}>
                <div className="user_popover_select text-left w-full rounded-sm hover:bg-gray-300 hover:text-black">
                    Đơn mua
                </div>
            </Link>

            <div className="user_popover_select hover:bg-gray-300 rounded-sm">
                <LogoutButton />
            </div>
        </div>
    )
}

export default UserPopover
