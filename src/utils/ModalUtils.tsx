import * as ReactDOMClient from 'react-dom/client';
import {ReactNode} from "react";
import DialogComponent from "../components/Utils/DialogComponent";

class ModalUtils {
    openModal(node: ReactNode) {
        const div = document.createElement('div');
        const root = ReactDOMClient.createRoot(div);
        root.render(node);
        requestIdleCallback(() => console.log("here"));
    }

    dialog(title: string, message: string, onSuccess: () => void) {
        this.openModal(<DialogComponent  message={message} title={title} onConfirm={onSuccess} />)
    }
}

export default new ModalUtils();