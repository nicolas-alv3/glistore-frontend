import React, {CSSProperties, ReactNode} from "react";
import GTitle, {GTitleSize} from "../components/Utils/GTitle";

interface Props {
    button: ReactNode,
    text: string,
    show: boolean
}

export default function ActionBar(props: Props) {
    const style: CSSProperties = {
        width: "100vw",
        position: "fixed",
        height: 64,
        background: "var(--col-white)",
        borderTop: "1px solid var(--col-lightgray)",
        zIndex: 999999,
        bottom: 0,
        left: 0,
        boxShadow: "var(--col-lightgray) 1px -6px 20px 0px",
        display: props.show ? "flex": "none",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16
    }
    return <div style={style}>
        <GTitle size={GTitleSize.SMALL}>{props.text}</GTitle>
        {props.button}
    </div>;
}