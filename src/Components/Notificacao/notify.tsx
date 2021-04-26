import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Notify(status: any, text: any) {
    switch (status) {
        case 'success':
            toast.success(text, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1800
            });
            break;
        case 'error':
            toast.error(text, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000
            });
            break;
        case 'warn':
            toast.warn(text, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000
            });
            break;
        case 'info':
            toast.info(text, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000
            });
            break;
    }
    return (
        <ToastContainer />
    )
}