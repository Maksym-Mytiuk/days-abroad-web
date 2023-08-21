import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Toast() {
  return (
    <ToastContainer
      position="bottom-right"
      theme="light"
      autoClose={3000}
      newestOnTop={false}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      closeOnClick
    />
  );
}

export { toast as notify };
