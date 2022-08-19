import React, {ReactNode, useEffect} from "react";
import {Modal} from "semantic-ui-react";
import GButton, {ButtonType} from "./Utils/GButton";
import {useDispatch, useSelector} from "react-redux";
import {selectModal, setVisible} from "../../slices/modalSlice";

interface Props {
    title: string,
    trigger: ReactNode,
    children: ReactNode,
    confirmText?: string,
    handleSubmit?: () => void,
    withoutButtons?: boolean,
    size? : 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen',
    id: string
}

export default function GModal(props: Props) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    const modal = useSelector(selectModal);

    useEffect( () => {
        if(modal.id == props.id) {
            setOpen(modal.visible);
        }
    }, [modal])

    useEffect( () => {
        dispatch(setVisible({open, id: props.id}));
    }, [open])

    return <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={props.trigger}
        size={props.size}
    >
        <Modal.Header>{props.title}</Modal.Header>
        <Modal.Content>
            {
                props.children
            }
        </Modal.Content>
        <Modal.Actions>
            {!props.withoutButtons &&
                <>
                    <GButton type={ButtonType.TERTIARY} onClick={() => setOpen(false)}>
                        Cancelar
                    </GButton>
                    <GButton
                        text={props.confirmText || "Aceptar"}
                        icon='checkmark'
                        onClick={props.handleSubmit}
                        type={ButtonType.PRIMARY}
                    />
                </>
            }
        </Modal.Actions>
    </Modal>
}