import {toast} from "react-hot-toast";

class ToastUtils {
    success(message: string) {
        toast.success(message, {
            duration: 4000,
            position: 'top-center',

            // Styling
            style: { border: "1px solid green", background: "#D5F5E3"},
            className: '',

            // Custom Icon
            icon: '👏',

            // Change colors of success/error/loading icon
            iconTheme: {
                primary: '#000',
                secondary: '#fff',
            },
        });
    }

    error(message: string) {
        toast.error(message, {
            duration: 4000,
            position: 'top-center',

            // Styling
            style: { border: "1px solid orange", background: "#FFEBE6"},
            className: '',

            // Custom Icon
            icon: '😢',

            // Change colors of success/error/loading icon
            iconTheme: {
                primary: '#000',
                secondary: '#fff',
            },
        });
    }
}

export default new ToastUtils();