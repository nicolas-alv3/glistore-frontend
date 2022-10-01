import React, {ReactNode} from "react";
import {Accordion, Icon} from "semantic-ui-react";
import GTitle, {GTitleSize} from "./GTitle";

interface Props {
    title: string,
    children: ReactNode
}

export default function GAccordion(props: Props) {
    const [open, setOpen] = React.useState(false);
    return <Accordion styled>
            <Accordion.Title active={open}>
                <div className={"flex-between align-center"} onClick={() => setOpen(prevState => !prevState)}>
                    <GTitle size={GTitleSize.SMALL}>{props.title}</GTitle>
                    <Icon name={`chevron ${open ? "up": "down"}`}/>
                </div>
            </Accordion.Title>
            <Accordion.Content active={open}>
                {props.children}
            </Accordion.Content>
        </Accordion>
}