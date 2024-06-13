import { Button, Divider, Dropdown, Flex, Popover, Space, Typography } from 'antd';
import { CiGlobe, CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import { TfiAngleDown } from "react-icons/tfi";
import { Link } from 'react-router-dom';
import CartPopover from '../../../../Components/Cart/CartPopover';
import UserPopover from '../../../../Components/Popover/User';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../../../Redux/Features/User/userSlice';
import { useEffect } from 'react';

import './styles.scss';
import { fetchUserCart } from '../../../../Redux/Features/Purchase/purchaseSlice';

const HeaderDefault = () => {
    const dispatch = useDispatch()
    const accessToken = useSelector(state => state.auth.accessToken)
    const userData = useSelector(state => state.user.user.data)
    const userDataCart = useSelector(state => state.purchase.userCart.data)

    useEffect(() => {
        if (accessToken && userData === null) {
            dispatch(fetchUserData())
            dispatch(fetchUserCart())
        }
    }, [dispatch, accessToken, userData])


    const items = [
        {
            key: '1',
            label: 'Tiếng Việt',
        },
        {
            key: '2',
            label: 'English',
        },
    ]

    const userName = userData?.name?.split(' ')[0] || 'Guest'

    return (
        <div className="header bg-[#fa5030] py-5 text-white">
            <div className='container max-w-[1400px] mx-auto px-5'>
                <Flex className='header_nav gap-5 justify-end '>
                    <Flex className='gap-1' align='center'>
                        <CiGlobe size={'24px'} />
                        <Dropdown
                            menu={{
                                items,
                                selectable: true,
                                defaultSelectedKeys: ['1'],
                            }}
                        >
                            <Typography.Link>
                                <Space className='text-white text-[16px] hover:text-gray-500'>
                                    Ngôn Ngữ
                                    <TfiAngleDown />
                                </Space>
                            </Typography.Link>
                        </Dropdown>
                    </Flex>

                    {accessToken ? (
                        <Flex className='text-[16px] items-center ' gap={5}>
                            <Popover placement="bottomRight" content={<UserPopover />}>
                                <Link to={'/user/profile'} className='hover:text-white'>
                                    <Flex className='items-center gap-1 cursor-pointer'>
                                        <CiUser className='text-[24px]' />
                                        <p>Hello {userName}!</p>
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

                    <div className='header_searchbar w-[100%]'>
                        <input className='search_input p-3 rounded-lg w-[100%]' placeholder='Search something...' />
                        <Button className='search_btn'><CiSearch /></Button>
                    </div>

                    <div className='header_cart cursor-pointer '>
                        <Popover className='relative' placement="bottomRight" title={<div className='text-2xl font-[500]'>Giỏ hàng</div>} content={<CartPopover />}>
                            <div className='text-[40px]'>
                                <CiShoppingCart />
                            </div>
                            <div className={`absolute min-w-7 text-center font-[500] rounded-lg bg-white text-[#fa5030] text-[12px] top-0 right-[-30%] ${userDataCart ? 'visible' : 'hidden'}`}>
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
