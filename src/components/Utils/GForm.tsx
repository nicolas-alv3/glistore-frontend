import {Form} from "semantic-ui-react";
import {ReactNode} from "react";

interface Props {
    children: ReactNode,
    onSubmit?: () => void,
}

export default function GForm(props: Props) {
    return <Form onSubmit={props.onSubmit}>
        {props.children}
    </Form>
}
