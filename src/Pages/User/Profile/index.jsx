import { Divider, Flex } from "antd";
import { useEffect, useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import convertUTCtoGMT7 from "../../../Utilities/Format/convertDate";
import { updateUser, uploadNewAvatar } from "../../../Redux/Features/User/userSlice";
import UploadAvatar from "../Components/InputAvatar";

import './styles.scss';

const Profile = () => {
    const dispatch = useDispatch()
    const [avatarFile, setAvatarFile] = useState(null)
    const userData = useSelector(state => state.user.user.data)

    const days = Array.from({ length: 31 }, (_, i) => i + 1)
    const months = Array.from({ length: 12 }, (_, i) => i + 1)
    const years = Array.from({ length: 25 }, (_, i) => 2004 - i)

    const convertedDate = convertUTCtoGMT7(userData?.date_of_birth)
    const getDate = convertedDate ? convertedDate.getDate() : null
    const getMonth = convertedDate ? convertedDate.getMonth() + 1 : null
    const getYear = convertedDate ? convertedDate.getFullYear() : null


    const onSubmit = async (data) => {
        const avatarID = userData && userData.avatar

        if (avatarFile) {
            const newAvatarID = await dispatch(uploadNewAvatar(avatarFile)).unwrap()

            if (newAvatarID) {
                const updatedData = {
                    ...data,
                    avatar: newAvatarID,
                    date_of_birth: new Date(data.birthYear, data.birthMonth - 1, data.birthDay).toISOString(),
                }
                dispatch(updateUser(updatedData))
            }
        } else {
            const updatedData = {
                ...data,
                avatar: avatarID,
                date_of_birth: new Date(data.birthYear, data.birthMonth - 1, data.birthDay).toISOString(),
            }
            dispatch(updateUser(updatedData))
        }
    }

    const methods = useForm({
        defaultValues: {
            name: userData?.name || '',
            phone: userData?.phone || '',
            address: userData?.address || '',
            birthDay: getDate || '',
            birthMonth: getMonth || '',
            birthYear: getYear || '',
        }
    })

    const { control, handleSubmit, formState: { errors }, register, reset } = methods

    useEffect(() => {
        reset({
            name: userData?.name || '',
            phone: userData?.phone || '',
            address: userData?.address || '',
            birthDay: getDate || '',
            birthMonth: getMonth || '',
            birthYear: getYear || '',
        });
    }, [userData, getDate, getMonth, getYear, reset])

    return (
        <div className="w-full">
            <FormProvider {...{ control, handleSubmit, errors, register, reset }}>
                <div className="bg-white w-full h-fit px-8 py-5 rounded-md shadow-detail">
                    <div>
                        <p className="text-[20px] font-[500]">Hồ sơ của tôi</p>
                        <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                    </div>

                    <Divider />

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full">
                            <Flex className="flex max-[1000px]:flex-col w-full items-center">
                                <div className="flex flex-col w-full gap-5 px-5">
                                    <div className="items-center justify-center">
                                        <p className="">Email:</p>
                                        <p className="w-full user_input cursor-not-allowed">{userData?.email}</p>
                                    </div>

                                    <div>
                                        <div className="">
                                            <p className="">Họ và tên:</p>
                                            <input
                                                className="user_input"
                                                defaultValue={userData?.name}
                                                type="text"
                                                placeholder="Tên"
                                                {...register('name', {
                                                    required: 'Tên là bắt buộc',
                                                    maxLength: 50
                                                })}
                                            />
                                        </div>
                                        {errors.name && <p className="error-message text-red-500 ">{errors.name.message}</p>}
                                    </div>

                                    <div>
                                        <div className="">
                                            <p className="">Số điện thoại:</p>
                                            <input
                                                className="user_input"
                                                defaultValue={userData?.phone}
                                                type="number"
                                                placeholder="Số điện thoại"
                                                {...register('phone', {
                                                    required: 'Số điện thoại là bắt buộc',
                                                    maxLength: 20
                                                })}
                                            />
                                        </div>
                                        {errors.phone && <p className="error-message text-red-500 ">{errors.phone.message}</p>}
                                    </div>

                                    <div>
                                        <div className="items-center justify-center">
                                            <p className="">Địa chỉ:</p>
                                            <input
                                                className="user_input"
                                                type="text"
                                                defaultValue={userData?.address}
                                                placeholder="Địa chỉ"
                                                {...register('address', {
                                                    required: 'Địa chỉ là bắt buộc',
                                                    maxLength: 100
                                                })}
                                            />
                                        </div>
                                        {errors.address && <p className="error-message text-red-500">{errors.address.message}</p>}
                                    </div>

                                    <Flex className="birthdate-input flex-wrap items-center w-full">
                                        <p htmlFor="birthdate" className="">Ngày sinh:</p>
                                        <div className="w-full">
                                            <Flex className='gap-1'>
                                                <Controller
                                                    control={control}
                                                    name="birthDay"
                                                    rules={{ required: 'Vui lòng chọn ngày' }}
                                                    render={({ field }) => (
                                                        <select id="birthDay" {...field} className='user_input_birthdate'>
                                                            <option value="">Ngày</option>
                                                            {days.map((day) => (
                                                                <option key={day} value={day}>{day}</option>
                                                            ))}
                                                        </select>
                                                    )}
                                                />

                                                <Controller
                                                    control={control}
                                                    name="birthMonth"
                                                    rules={{ required: 'Vui lòng chọn tháng' }}
                                                    render={({ field }) => (
                                                        <select id="birthMonth" {...field} className='user_input_birthdate'>
                                                            <option value="">Tháng</option>
                                                            {months.map((month) => (
                                                                <option key={month} value={month}>{month}</option>
                                                            ))}
                                                        </select>
                                                    )}
                                                />

                                                <Controller
                                                    control={control}
                                                    name="birthYear"
                                                    rules={{
                                                        required: 'Vui lòng chọn năm',
                                                        validate: value => value >= 1980 && value <= 2004 || 'Năm sinh phải từ 1980 đến 2004'
                                                    }}
                                                    render={({ field }) => (
                                                        <select id="birthYear" {...field}
                                                            className='user_input_birthdate'>
                                                            <option value="">Năm</option>
                                                            {years.map((year) => (
                                                                <option key={year} value={year}>{year}</option>
                                                            ))}
                                                        </select>
                                                    )}
                                                />
                                            </Flex>
                                            {(errors.birthDay || errors.birthMonth || errors.birthYear) && (
                                                <p className="error-message text-red-500">
                                                    {errors.birthDay?.message || errors.birthMonth?.message || errors.birthYear?.message}
                                                </p>
                                            )}
                                        </div>
                                    </Flex>
                                </div>

                                <div className="w-[1px] bg-[#ccc] h-[400px] max-[1000px]:hidden">

                                </div>

                                <div className="w-full bg-[#ccc] h-[1px] min-[1000px]:hidden my-5">

                                </div>

                                <Flex className="flex-col h-full w-full  items-center justify-center gap-5">
                                    <div>
                                        <UploadAvatar setAvatarFile={setAvatarFile} />
                                    </div>

                                    <p className="text-gray-400">
                                        Dụng lượng file tối đa 1 MB
                                        <br />
                                        Định dạng: .JPEG, .PNG
                                    </p>
                                </Flex>
                            </Flex>

                            <button type="submit" className="text-white py-2 px-5 my-10 rounded-sm bg-[#fa5030]">Lưu</button>
                        </div>
                    </form>
                </div>
            </FormProvider>
        </div>
    );
};

export default Profile;
