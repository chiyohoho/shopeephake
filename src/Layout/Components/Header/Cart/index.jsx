import { Divider, Dropdown, Flex, Popover, Space, Typography } from 'antd';
import { CiGlobe, CiSearch, CiUser } from "react-icons/ci";
import { TfiAngleDown } from "react-icons/tfi";
import { Link } from 'react-router-dom';
import UserPopover from '../../../../Components/Popover/User';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../../../Redux/Features/User/userSlice';
import { useEffect } from 'react';
import { fetchUserCart } from '../../../../Redux/Features/Purchase/purchaseSlice';

const HeaderCart = () => {
    const dispatch = useDispatch()
    const accessToken = useSelector(state => state.auth.accessToken)
    const userData = useSelector(state => state.user.user.data)

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
        <div className="header text-white bg-[#ffffff] shadow-detail">
            <div className='container bg-[#fa5030] px-5 py-2'>
                <Flex className='header_nav gap-5 justify-end max-w-[1400px] mx-auto px-5'>
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
            </div>

            <div className='container max-w-[1400px] mx-auto px-5 pt-3 pb-5'>
                <Flex className='header_search items-end justify-between gap-10'>
                    <Link to={'/'} className='header_logo flex items-end gap-5'>
                        <img className='w-[200px]' src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Shopee.svg/1200px-Shopee.svg.png' alt='shopeelogo' />
                        <div className='w-[1px] h-9 bg-[#fa5030]'></div>
                        <p className='text-[#fa5030] text-[20px] leading-10'>Giỏ hàng</p>
                    </Link>

                    <div className='header_searchbar max-w-[500px] w-full'>
                        <input className='search_input p-3 rounded-lg w-[100%] border-[#fa5030] border-2 focus:outline-none ' placeholder='Free Ship đơn từ 0 đồng...' />
                        <button className='search_btn px-5 py-2 rounded-md'><CiSearch /></button>
                    </div>
                </Flex>
            </div>
        </div>
    )
}


export default HeaderCart
