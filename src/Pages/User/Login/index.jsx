import { Flex, Spin } from "antd"
import { useForm } from "react-hook-form"
import { FaEye, FaEyeLowVision } from "react-icons/fa6"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../../../Redux/Features/Auth/authSlice"
import { useEffect, useState } from "react"
import { fetchUserData } from "../../../Redux/Features/User/userSlice"


import './styles.scss'


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, setError, formState: { errors }, } = useForm()
    const { isLoading } = useSelector(state => state.auth)
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (isLoading) {
            dispatch(fetchUserData())
        }
    }, [dispatch, isLoading])

    const onSubmit = (data) => {
        dispatch(loginUser(data)).unwrap()
            .then(() => {
                navigate('/');
            })
            .catch(() => {
                setError('email', {
                    type: 'manual',
                    message: 'Email hoặc mật khẩu không đúng'
                })
            });
    }

    return (
        <div className="h-full w-full bg-[#fa5030]">
            <div className="max-w-[1400px] h-full mx-auto px-5 ">
                <Flex className="w-full h-full justify-end items-center">
                    <div className="w-[500px] rounded-md bg-white p-10 font-[500]">
                        <p className="text-[24px]">Đăng Nhập</p>

                        <form className="flex flex-col gap-6 mt-10" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <input className="input" type="email" placeholder="Email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                                {errors.email && errors.email.type === "required" && <div className="text-red-500 opacity-1 h-4">Vui lòng không bỏ trống</div>}
                                {errors.email && errors.email.type === "pattern" && <div className="text-red-500 opacity-1 h-4">Định dạng email không đúng</div>}
                                {errors.email && errors.email.type === "manual" && <div className="text-red-500 opacity-1 h-4">{errors.email.message}</div>}
                                {!errors.email && <div className="text-red-500 opacity-0 h-4"></div>}
                            </div>

                            <div className="relative">
                                <input className="input" type={show ? 'text' : 'password'} placeholder="Password" {...register("password", { required: true, minLength: 8, maxLength: 24 })} />
                                <div onClick={() => setShow(!show)}
                                    className="absolute top-[10%] right-3 border-[1px] border-[#ccc] p-[6px] rounded-md hover:bg-gray-300 transition-all duration-300 ease-in-out cursor-pointer">
                                    {show ? <FaEye /> : <FaEyeLowVision />}
                                </div>
                                {errors.password && errors.password.type === "required" && <div className="text-red-500 opacity-1 h-4">Vui lòng không bỏ trống</div>}
                                {errors.password && errors.password.type === "minLength" && <div className="text-red-500 opacity-1 h-4">Mật khẩu có tối thiểu 8 ký tự</div>}
                                {errors.password && errors.password.type === "maxLength" && <div className="text-red-500 opacity-1 h-4">Mật khẩu có tối đa 24 ký tự</div>}
                                {!errors.password && <div className="text-red-500 opacity-0 h-4"></div>}
                            </div>

                            <button
                                className="bg-[#fa5030] p-3 rounded-md text-white cursor-pointer"
                                type="submit"
                            >
                                {isLoading ? <Spin /> : 'Đăng Nhập'}
                            </button>
                        </form>

                        <div className="text-center mt-6">Bạn chưa có tài khoản ? <Link className="text-[#dc2626]" to={'/user/register'}>Đăng Ký</Link></div>
                    </div>
                </Flex>

            </div>
        </div>
    )
}

export default Login
