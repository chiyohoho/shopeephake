import { Divider, Flex, Popover } from 'antd';
import { CiSearch } from "react-icons/ci";
import { Link, createSearchParams, useNavigate } from 'react-router-dom';
import UserPopover from '../../../../Components/Popover/User';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../../../Redux/Features/User/userSlice';
import { useEffect } from 'react';
import { fetchUserCart } from '../../../../Redux/Features/Purchase/purchaseSlice';
import getAvatar from '../../../../Utilities/Format/getAvatar';
import { truncatedEmail } from '../../../../Utilities/Format/truncatedEmail';
import Languages from '../../../../Components/Languages';
import { useForm } from 'react-hook-form';
import { omit } from 'lodash';
import useQueryConfig from '../../../../Hooks/useQueryConfig';

const HeaderCart = () => {
    const { register, handleSubmit } = useForm()
    const queryConfig = useQueryConfig()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const accessToken = useSelector(state => state.auth.accessToken)
    const userData = useSelector(state => state.user.user.data)
    const avatar = getAvatar(userData)

    useEffect(() => {
        if (accessToken && userData === null) {
            dispatch(fetchUserData())
            dispatch(fetchUserCart())
        }
    }, [dispatch, accessToken, userData])

    const onSubmit = (data) => {
        if (!data) {
            return
        }
        navigate({
            pathname: '/',
            search: createSearchParams(
                omit(
                    {
                        ...queryConfig,
                        name: data.search
                    },
                    ['order']
                )
            ).toString()
        })
    }

    return (
        <div className="header text-white bg-[#ffffff] shadow-detail">
            <div className=' bg-[#fa5030] px-5 py-2'>
                <Flex className='header_nav flex-wrap gap-5 justify-end max-w-[1400px] mx-auto px-5'>
                    <Flex className='gap-1' align='center'>
                        <Languages />
                    </Flex>

                    {accessToken ? (
                        <Flex className='text-[16px] items-center ' gap={5}>
                            <Popover placement="bottomRight" trigger={'hover'} content={<UserPopover />}>
                                <div className='hover:text-white'>
                                    <Flex className='items-center gap-1 cursor-pointer'>
                                        <img className="min-w-[24px] h-[24px] rounded-full overflow-hidden"
                                            src={avatar.userAvatar} alt="avatar"
                                        />
                                        <p>{truncatedEmail(userData)}</p>
                                    </Flex>
                                </div>
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
                        <div className='w-[1px] h-9 bg-[#fa5030] max-[920px]:hidden'></div>
                        <p className='text-[#fa5030] text-[20px] leading-10 max-[920px]:hidden'>Giỏ hàng</p>
                    </Link>

                    <div className="header_searchbar w-full max-w-[500px]">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input
                                className="search_input p-3 rounded-lg w-full border-2 border-[#fa5030] hover:outline-none outline-none"
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                {...register("search")}
                            />
                            <button type="submit" className="search_btn px-3 py-2 rounded-sm">
                                <CiSearch />
                            </button>
                        </form>
                    </div>
                </Flex>
            </div>
        </div>
    )
}


export default HeaderCart
