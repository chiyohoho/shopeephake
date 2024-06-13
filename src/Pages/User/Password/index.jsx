import "./styles.scss";

import { Divider, Flex } from "antd";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { changePassword } from "../../../Redux/Features/User/userSlice";
import { showToast } from "../../../Components/Toast";

const Password = () => {
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
    } = useForm()

    const [newPassword, setNewPassword] = useState("")
    const [showPass1, setShowPass1] = useState(false)
    const [showPass2, setShowPass2] = useState(false)
    const [showPass3, setShowPass3] = useState(false)


    const onSubmit = async (data) => {
        await dispatch(changePassword(data)).unwrap()
            .then(() => {
                reset()
                showToast('success', 'Đã đổi mật khẩu thành công!')
            })
            .catch(() => {
                setError('currentPassword', {
                    type: 'manual',
                    message: 'Mật khẩu cũ không đúng'
                })
            })
    }

    return (
        <div className="bg-white w-full h-fit px-8 py-5 rounded-md shadow-detail">
            <div>
                <p className="text-[20px] font-[500]">Thay đổi mật khẩu</p>
                <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            </div>

            <Divider />

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full gap-10 max-w-[500px]"
            >
                <Flex className="flex-col gap-5 w-full">
                    <div>
                        <Flex className="items-center gap-5 relative">
                            <p className="w-[200px] text-end">Mật khẩu cũ:</p>
                            <input
                                className="user_input"
                                type={showPass1 ? 'text' : 'password'}
                                placeholder="Mật khẩu cũ"
                                {...register("currentPassword", {
                                    required: "Vui lòng không bỏ trống",
                                    minLength: {
                                        value: 8,
                                        message: "Mật khẩu phải có ít nhất 8 ký tự",
                                    },
                                    maxLength: {
                                        value: 24,
                                        message: "Mật khẩu không được quá 24 ký tự",
                                    },
                                })}
                            />
                            <div className="absolute right-3 cursor-pointer" onClick={() => setShowPass1(!showPass1)}>
                                {showPass1 ? <FaEye /> : <FaEyeSlash />}
                            </div>
                        </Flex>
                        {errors.currentPassword && (
                            <p className="error-message text-red-500 ml-[155px]">
                                {errors.currentPassword.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Flex className="items-center gap-5 relative">
                            <p className="w-[200px] text-end">Mật khẩu mới:</p>
                            <input
                                className="user_input"
                                type={showPass2 ? 'text' : 'password'}
                                placeholder="Mật khẩu mới"
                                {...register("newPassword", {
                                    required: "Vui lòng không bỏ trống",
                                    minLength: {
                                        value: 8,
                                        message: "Mật khẩu mới phải có ít nhất 8 ký tự",
                                    },
                                    maxLength: {
                                        value: 24,
                                        message: "Mật khẩu mới không được quá 24 ký tự",
                                    },
                                    onChange: (e) => setNewPassword(e.target.value),
                                })}
                            />
                            <div className="absolute right-3 cursor-pointer" onClick={() => setShowPass2(!setShowPass2)}>
                                {showPass2 ? <FaEye /> : <FaEyeSlash />}
                            </div>
                        </Flex>
                        {errors.newPassword && (
                            <p className="error-message text-red-500 ml-[155px]">
                                {errors.newPassword.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Flex className="items-center gap-5 relative">
                            <p className="w-[200px] text-end">Nhập lại mật khẩu:</p>
                            <input
                                className="user_input"
                                type={showPass3 ? 'text' : 'password'}
                                placeholder="Nhập lại mật khẩu"
                                {...register("confirmPassword", {
                                    required: "Vui lòng không bỏ trống",
                                    validate: (value) =>
                                        value === newPassword || "Mật khẩu không khớp",
                                })}
                            />
                            <div className="absolute right-3 cursor-pointer" onClick={() => setShowPass3(!showPass3)}>
                                {showPass3 ? <FaEye /> : <FaEyeSlash />}
                            </div>
                        </Flex>
                        {errors.confirmPassword && (
                            <p className="error-message text-red-500 ml-[155px]">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>
                </Flex>

                <button
                    type="submit"
                    className="text-white py-2 px-5 rounded-sm bg-[#fa5030] ml-[155px] my-5"
                >
                    Thay đổi
                </button>
            </form>
        </div>
    );
};

export default Password;
