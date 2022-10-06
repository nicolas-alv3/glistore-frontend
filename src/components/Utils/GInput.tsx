import {Form} from "semantic-ui-react";
import React, {ReactNode} from "react";
import GHelpBubble from "../../utils/HelpBubble";

interface Props {
    onChange?: (value: string) => void,
    label: string,
    error: boolean,
    errorMessage?: string,
    value?: string,
    placeholder?: string,
    input?: ReactNode,
    helpBubbleText?: string,
    disabled?: boolean
}

// This component should be always inside a <GForm></GForm>
export default function GInput(props: Props) {
    return <>
        <Form.Group widths={"equal"}>
            <Form.Field error={props.error} disabled={props.disabled}>
                <label style={{display: "flex", justifyContent: "flex-start", gap: 8, fontWeight: 500, color: "var(--col-secondary-font)"}}>
                    {props.label}
                    {props.helpBubbleText && <GHelpBubble text={props.helpBubbleText} />}
                </label>
                {
                    props.input ||
                    <input value={props.value} onChange={e => props.onChange && props.onChange(e.target.value)}
                           placeholder={props.placeholder}/>
                }
                {
                    props.error &&
                    <label style={{color: "red"}}>{props.errorMessage || "Este campo es requerido"}</label>
                }
            </Form.Field>
        </Form.Group>
    </>
}