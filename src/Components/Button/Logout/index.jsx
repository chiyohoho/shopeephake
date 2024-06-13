import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../Redux/Features/Auth/authSlice';

const LogoutButton = () => {
    const location = useLocation().pathname
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        dispatch(logoutUser())
        if (location.includes('user')) {
            navigate('/')
        }
    }

    return (
        <button onClick={handleLogout} className='w-full text-left'>
            Đăng xuất
        </button>
    );
};

export default LogoutButton