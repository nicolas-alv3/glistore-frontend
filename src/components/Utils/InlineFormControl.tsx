import {ReactNode} from "react";

interface Props {
    children: ReactNode,
}

export default function InlineFormControl(props: Props) {
    return <div style={{display: "flex",  width:"100%", flexWrap:"wrap"}}>
        {props.children}
    </div>
}
