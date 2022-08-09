import React, {Component, ReactNode} from 'react'
import { Button, Confirm } from 'semantic-ui-react'

interface Props {
    title: string,
    message: string,
    onConfirm: () => void,
    trigger: ReactNode
}

class ConfirmComponent extends Component<Props, {open: boolean}> {
    state = { open: false }

    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    confirm = () => {
        this.props.onConfirm();
        this.close();
    }

    render() {
        return (
            <>
                <div style={{display: "inline"}} onClick={this.open}>
                    {this.props.trigger}
                </div>
                <Confirm
                    header={this.props.title}
                    content={this.props.message}
                    open={this.state.open}
                    onCancel={this.close}
                    onConfirm={this.confirm}
                ></Confirm>
            </>
        )
    }
}

export default ConfirmComponent