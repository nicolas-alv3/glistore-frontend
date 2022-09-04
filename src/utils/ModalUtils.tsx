import ReactDOM from 'react-dom';
import {ReactElement} from "react";
import DialogComponent from "../components/Utils/DialogComponent";

class ModalUtils {
    openModal(node: ReactElement) {
        const portalNode= document.createElement('div');
        document.body.appendChild(portalNode);
        ReactDOM.render(node, portalNode, () => portalNode.remove())
    }

    dialog(title: string, message: string, onSuccess: () => void) {
        this.openModal(<DialogComponent  message={message} title={title} onConfirm={onSuccess} />)
    }
}

export default new ModalUtils();