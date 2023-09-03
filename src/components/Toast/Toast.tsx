import { ToastContainer, ToastContainerProps, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Toast(props: ToastContainerProps) {
  const {
    position = 'bottom-right',
    theme = 'light',
    autoClose = 3000,
    newestOnTop = false,
    rtl = false,
    pauseOnFocusLoss = false,
    draggable = false,
    pauseOnHover = false,
    closeOnClick = true,
  } = props;

  return (
    <ToastContainer
      position={position}
      theme={theme}
      autoClose={autoClose}
      newestOnTop={newestOnTop}
      rtl={rtl}
      pauseOnFocusLoss={pauseOnFocusLoss}
      draggable={draggable}
      pauseOnHover={pauseOnHover}
      closeOnClick={closeOnClick}
    />
  );
}

export { toast as notify };
