import React from "react";
import {Popup} from "semantic-ui-react";

export default function GHelpBubble(props: { text: string }) {
    return <>
        <Popup trigger={<span
            className={"flex-center"}
            style={{
                width: "20px",
                height: "20px",
                background: "var(--col-darkgray)",
                color: "var(--col-lightgray)",
                borderRadius: "50%",
            }}
        >
        <p>?</p>
                </span>}>
            {props.text}
        </Popup>
    </>;
}