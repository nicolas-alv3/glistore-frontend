import {Divider} from "semantic-ui-react";
import React, {ReactNode} from "react";
import GTitle, {GTitleSize} from "./GTitle";

interface Props {
    title: string,
    addButton: ReactNode,
    table: ReactNode
}

export default function CRUDPage(props: Props) {
    return <div>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <GTitle size={GTitleSize.SMALL}>{props.title}</GTitle>
            {props.addButton}
        </div>
        <Divider/>
        {props.table}
    </div>;
}