import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import getAvatar from '../../../../Utilities/Format/getAvatar';

const UploadAvatar = ({ setAvatarFile }) => {
    const { register, watch, setError, clearErrors, formState: { errors } } = useForm();
    const userData = useSelector(state => state.user.user.data);

    const [preview, setPreview] = useState(null);

    const avatar = getAvatar(userData);

    const watchFile = watch('image', null);

    useEffect(() => {
        if (watchFile && watchFile.length > 0) {
            const file = watchFile[0];

            if (file?.size > 1048576) {
                setError('image', { type: 'manual', message: 'Ảnh quá kích thước cho phép (1MB)' });
                return
            }

            if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
                setError('image', { type: 'manual', message: 'Định dạng ảnh không hợp lệ (JPEG hoặc PNG)' });
                return;
            }

            clearErrors('image');

            const reader = new FileReader()
            reader.onloadend = () => {
                const base64 = reader.result
                setPreview(base64)
            };
            reader.readAsDataURL(file)
            setAvatarFile(watchFile)


        } else {
            setPreview(null);
            setAvatarFile(null);
        }
    }, [watchFile, setAvatarFile, setError, clearErrors]);

    return (
        <>
            <div className='flex justify-center'>
                <img
                    className='h-[123px] w-[123px] overflow-hidden rounded-full'
                    src={preview || avatar.userAvatar}
                    alt="Avatar Preview"
                    onError={(e) => { e.target.src = avatar.defaultAvatar }}
                />
            </div>

            <label htmlFor="image" className='cursor-pointer flex justify-center mt-5'>
                <div className='border-[1px] border-[#ccc] w-fit px-6 py-2 rounded-sm text-gray-500'>
                    <span>Chọn Ảnh Đại Diện</span>
                    <input
                        type="file"
                        id="image"
                        {...register('image')}
                        accept="image/jpeg, image/png"
                        style={{ display: 'none' }}
                    />
                </div>
            </label>

            {errors.image && (
                <div className='flex justify-center mt-2 text-red-500'>
                    {errors.image.message}
                </div>
            )}
        </>
    );
};

export default UploadAvatar;
