// Toast.js
import { toast } from 'react-toastify';

// Hàm tạo Toast
export const showToast = (type, message) => {
    switch (type) {
        case 'success':
            toast.success(message);
            break;
        case 'error':
            toast.error(message);
            break;
        case 'info':
            toast.info(message);
            break;
        case 'warn':
            toast.warn(message);
            break;
        default:
            toast(message);
            break;
    }
};
