import React, {Component} from 'react'
import {Confirm} from 'semantic-ui-react'
import GButton, {ButtonType} from "./GButton";

interface Props {
    title: string,
    message: string,
    onConfirm: () => void,
}

class ConfirmComponent extends Component<Props, {open: boolean}> {
    state = { open: true }

    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    confirm = () => {
        this.props.onConfirm();
        this.close();
    }

    render() {
        return (
            <>
                <Confirm
                    header={this.props.title}
                    content={this.props.message}
                    open={this.state.open}
                    confirmButton={<GButton type={ButtonType.PRIMARY} text={"Aceptar"}/>}
                    onCancel={this.close}
                    onConfirm={this.confirm}
                ></Confirm>
            </>
        )
    }
}

export default ConfirmComponent