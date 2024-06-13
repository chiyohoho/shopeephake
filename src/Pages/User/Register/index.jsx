import { Flex, Spin } from "antd"
import { useForm } from "react-hook-form"
import { FaEye, FaEyeLowVision } from "react-icons/fa6"

import './styles.scss'
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { API, USER_ENDPOINT } from "../../../Constant/API"
import { showToast } from "../../../Components/Toast"

// import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
    const navigate = useNavigate('')
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
    } = useForm()

    const password = watch("password", "")
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const fetchDataRegister = async (email, password) => {
        await axios.post(`${API}/${USER_ENDPOINT.register}`, { email, password })
            .then(res => {
                setIsLoading(false)
                if (res.status == 200) {
                    showToast('success', 'Đăng ký thành công')
                    navigate('/user/login')
                }
            })
            .catch(err => {
                setIsLoading(false)
                if (err.response && err.response.status == 422) {
                    setError('email', {
                        type: 'manual',
                        message: 'Email này đã tồn tại.'
                    });
                } else {
                    console.error('check err:', err)
                }
            })

    }

    const onSubmit = (data) => {
        setIsLoading(true)
        fetchDataRegister(data.email, data.password)
    }

    return (
        <div className="h-full w-full bg-[#fa5030]">
            <div className="max-w-[1400px] h-full mx-auto px-5 ">
                <Flex className="w-full h-full justify-end items-center">
                    <div className="w-[500px] rounded-md bg-white p-10 font-[500]">
                        <p className="text-[24px]">Đăng Ký</p>

                        <form className="flex flex-col gap-5 mt-10" onSubmit={handleSubmit(onSubmit)}>
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

                            <div className="">
                                <input
                                    className="input"
                                    type={'password'}
                                    placeholder="Confirm Password"
                                    {...register("confirmPassword", {
                                        required: "Vui lòng không bỏ trống",
                                        validate: value => value === password || "Mật khẩu không trùng khớp"
                                    })}
                                />
                                {errors.confirmPassword && <div className="text-red-500 h-4">{errors.confirmPassword.message}</div>}
                                {!errors.confirmPassword && <div className="text-red-500 opacity-0 h-4"></div>}
                            </div>

                            <button
                                className="bg-[#fa5030] p-3 rounded-md text-white cursor-pointer"
                                type="submit"
                            >
                                {isLoading ? <Spin /> : 'Đăng Ký'}
                            </button>
                        </form>

                        <div className="text-center mt-6">Bạn đã có tài khoản ?
                            <Link className="text-[#fa5030]" to={'/user/login'}>
                                <p className="inline-block ml-1">Đăng Nhập</p>
                            </Link>
                        </div>
                    </div>
                </Flex>

            </div>
        </div>
    )
}

export default Register
