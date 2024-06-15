import { Button, Divider, Flex, Popover, } from 'antd';
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import CartPopover from '../../../../Components/Cart/CartPopover';
import UserPopover from '../../../../Components/Popover/User';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../../../Redux/Features/User/userSlice';
import { useEffect } from 'react';
import { fetchUserCart } from '../../../../Redux/Features/Purchase/purchaseSlice';

import './styles.scss';
import { showToast } from '../../../../Components/Toast';
import getAvatar from '../../../../Utilities/Format/getAvatar';
import { truncatedEmail } from '../../../../Utilities/Format/truncatedEmail';
import Languages from '../../../../Components/Languages';


const HeaderDefault = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const accessToken = useSelector(state => state.auth.accessToken)
    const userData = useSelector(state => state.user.user.data)
    const userDataCart = useSelector(state => state.purchase.userCart.data)
    const avatar = getAvatar(userData)


    useEffect(() => {
        const fetchData = async () => {
            if (accessToken) {
                await dispatch(fetchUserData()).unwrap()
                await dispatch(fetchUserCart()).unwrap()
            }
        }
        fetchData()
    }, [dispatch, accessToken])

    const handleRedirect = () => {
        if (accessToken) {
            navigate('/cart')
        } else {
            showToast('error', 'Vui lòng đăng nhập')
        }
    }

    return (
        <div className="header bg-[#fa5030] py-5 text-white">
            <div className='container max-w-[1400px] mx-auto px-5'>
                <Flex className='header_nav gap-5 justify-end '>
                    <Flex className='gap-1' align='center'>
                        <Languages />
                    </Flex>

                    {accessToken ? (
                        <Flex className='text-[16px] items-center ' gap={5}>
                            <Popover placement="bottomRight" content={<UserPopover />}>
                                <Link to={'/user/profile'} className='hover:text-white'>
                                    <Flex className='items-center gap-1 cursor-pointer'>
                                        <img className="w-[24px] h-[24px] rounded-full overflow-hidden"
                                            src={avatar.userAvatar} alt="avatar"
                                        />
                                        <p>{truncatedEmail(userData)}</p>
                                    </Flex>
                                </Link>
                            </Popover>
                        </Flex>
                    ) : !accessToken ? (
                        <Flex className='text-[16px] items-center ' gap={5}>
                            <Link className='hover:text-gray-500' to={'/user/register'}>Đăng Ký</Link>
                            <Divider type="vertical" className='bg-gray-300 h-[60%] mt-1' />
                            <Link className='hover:text-gray-500' to={'/user/login'}>Đăng Nhập</Link>
                        </Flex>
                    ) : null}
                </Flex>

                <Flex className='header_search items-center justify-between gap-10 mt-5'>
                    <Link to={'/'} className='header_logo'>
                        <img className='w-[200px]' src='https://freelogopng.com/images/all_img/1656181621shopee-logo-white.png' alt='shopeelogo' />
                    </Link>

                    <div className='header_searchbar w-full'>
                        <input className='search_input p-3 rounded-lg w-full hover:outline-none outline-none' placeholder='Tìm kiếm sản phẩm...' />
                        <Button className='search_btn'><CiSearch /></Button>
                    </div>

                    <div className='header_cart cursor-pointer '>
                        <Popover className='relative' placement="bottomRight" title={<div className='text-2xl font-[500]'>Giỏ hàng</div>} content={<CartPopover />}>
                            <div onClick={handleRedirect} className='text-[40px]'>
                                <CiShoppingCart />
                            </div>
                            <div onClick={handleRedirect} className={`absolute min-w-7 text-center font-[500] rounded-lg bg-white text-[#fa5030] text-[12px] top-0 right-[-30%] ${userDataCart ? 'visible' : 'hidden'}`}>
                                {userDataCart?.length || null}
                            </div>
                        </Popover>
                    </div>
                </Flex>
            </div>
        </div>
    )
}


export default HeaderDefault;
