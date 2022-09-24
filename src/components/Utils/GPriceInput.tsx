import React, {ReactNode} from 'react'
import {Form, Input, Label} from 'semantic-ui-react'

interface Props {
    onChange?: (value: string) => void,
    label: string,
    error: boolean,
    errorMessage: string,
    value?: string,
    placeholder?: string,
    input?: ReactNode,
    helpBubbleText?: string,
}

const GPriceInput = (props: Props) => (
    <Form.Group widths={"equal"}>
        <Form.Field error={props.error}>
            <Input labelPosition='right' type='number' placeholder='Amount'>
                <Label basic>$</Label>
                <input value={props.value} onChange={(e) => props.onChange && props.onChange(e.target.value)}/>
                <Label>.00</Label>
            </Input>
            <label style={{color: "red"}}>{props.errorMessage}</label>

        </Form.Field>
    </Form.Group>
)

export default GPriceInput
