import React, {ReactNode} from "react";
import {Modal} from "semantic-ui-react";
import GButton, {ButtonType} from "./GButton";

interface Props {
    title: string,
    children: ReactNode,
    confirmText?: string,
    handleSubmit?: (closeModal : () => void) => void,
    withoutButtons?: boolean,
    size? : 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen',
}

export default function GModal2(props: Props) {
    const [open, setOpen] = React.useState(true);

    return <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
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
                            onClick={() => {
                                props.handleSubmit && props.handleSubmit(() => setOpen(false));
                            }}
                            type={ButtonType.PRIMARY}
                        />
                    </>
                }
            </Modal.Actions>
        </Modal>
}