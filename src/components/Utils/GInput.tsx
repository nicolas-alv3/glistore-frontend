import {Form} from "semantic-ui-react";
import React, {ReactNode} from "react";

interface Props {
    onChange?: (value: string) => void,
    label: string,
    error: boolean,
    errorMessage: string,
    value?: string,
    placeholder?: string,
    input?: ReactNode,
}

// This component should be always inside a <GForm></GForm>
export default function GInput(props: Props) {
    return <>
        <Form.Group widths={"equal"}>
            <Form.Field error={props.error}>
                <label>{props.label}</label>
                {
                    props.input ||
                    <input value={props.value} onChange={e => props.onChange && props.onChange(e.target.value)}
                           placeholder={props.placeholder}/>
                }
                <label style={{color: "red"}}>{props.errorMessage}</label>
            </Form.Field>
        </Form.Group>
    </>
}