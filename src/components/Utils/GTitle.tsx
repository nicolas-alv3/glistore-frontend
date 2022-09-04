import {Divider, Header} from "semantic-ui-react";
import {ReactNode} from "react";

export enum GTitleSize {
    LARGE = "large",
    MEDIUM = "medium",
    SMALL = "small"
}

interface Props {
    withBackButton?: boolean,
    title?: string,
    size: GTitleSize,
    children?: ReactNode,
    withDivider?: boolean,
    centered?: boolean,
    className?: string,
}

export default function GTitle(props: Props) {
    return <>
        <div style={{display: "flex", alignItems: "flex-end", gap: 16, justifyContent: props.centered ?"center": "flex-start",padding: "16px 0", paddingBottom: props.withDivider ? 0: 16}}>
            {/*{props.withBackButton && <Button color={"facebook"} icon onClick={() => router.back()}><Icon name={"chevron left"}/></Button>}*/}
            <Header className={props.className} size={props.size}>{props.title || props.children}</Header>
        </div>
        {
            props.withDivider && <Divider/>
        }
    </>
}