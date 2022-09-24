import {Divider} from "semantic-ui-react";
import {CSSProperties, ReactNode} from "react";
import {GColors} from "../../utils/GColors";

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
    color?: GColors,
    style?: CSSProperties
}

export default function GTitle(props: Props) {

    function getStyle(): CSSProperties {
        return  {
            color: props.color || GColors.PRIMARY_FONT
        }
    }

    const getHeader = () => {
        switch (props.size) {
            case GTitleSize.LARGE: return <h1 style={{...getStyle(), ...props.style}} className={props.className}>{props.title || props.children}</h1>;
            case GTitleSize.MEDIUM: return <h2 style={{...getStyle(), ...props.style}} className={props.className}>{props.title || props.children}</h2>
            case GTitleSize.SMALL: return <h4 style={{...getStyle(), ...props.style}} className={props.className}>{props.title || props.children}</h4>
            default: return <h1 style={{...getStyle(), ...props.style}} className={props.className}>{props.title || props.children}</h1>
        }
    }
    return <>
        <div
            style={{display: "flex", alignItems: "flex-end", justifyContent: props.centered ? "center" : "flex-start", margin: "8px 0"}}>
            {/*{props.withBackButton && <Button color={"facebook"} icon onClick={() => router.back()}><Icon name={"chevron left"}/></Button>}*/}
            {getHeader()}
        </div>
        {
            props.withDivider && <Divider/>
        }
    </>
}