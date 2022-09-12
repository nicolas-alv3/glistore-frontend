import React from "react";
import {Popup} from "semantic-ui-react";

export default function GHelpBubble(props: { text: string }) {
    return <>
        <Popup trigger={<span
            style={{
                width: "20px",
                height: "20px",
                background: "var(--col-darkgray)",
                color: "var(--col-lightgray)",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
        <p>?</p>
                </span>}>
            {props.text}
        </Popup>
    </>;
}