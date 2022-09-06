import {Icon} from "semantic-ui-react";
import GTitle, {GTitleSize} from "./GTitle";

interface Props {
    onClick: () => void,
    label: string
}

export default function AddDashedButton(props: Props) {
    return <div style={{
        width: "100%",
        height: "128px",
        border: "2px dashed var(--col-lightgray)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor:"pointer"
    }} onClick={props.onClick}>
        <GTitle size={GTitleSize.SMALL}><Icon name={"plus"} size={"large"}/>{props.label}</GTitle>
    </div>
}