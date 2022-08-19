import {Button, Icon} from "semantic-ui-react";
import styles from '../../../styles/Utils.module.css';
import {SemanticICONS, SemanticSIZES} from "semantic-ui-react/dist/commonjs/generic";
import {ReactNode} from "react";

export enum ButtonType {
    PRIMARY,
    SECONDARY,
    TERTIARY,
    ORANGE,
    DANGER,
    PRIMARY_BASIC,
    TRANSPARENT
}

interface Props {
    text?: string,
    type: ButtonType,
    onClick?: (e) => void,
    icon?: SemanticICONS,
    basic?: boolean,
    children?: ReactNode,
    fluid?: boolean,
    circular?: boolean,
    size?: SemanticSIZES,
    className?: string
}

export default function GButton(props: Props) {

    const getClass = () => {
        const classes = {
            [ButtonType.PRIMARY]: styles.gButtonPrimary,
            [ButtonType.PRIMARY_BASIC]: styles.gButtonPrimaryBasic,
            [ButtonType.SECONDARY]: styles.gButtonSecondary,
            [ButtonType.TERTIARY]: styles.gButtonTertiary,
            [ButtonType.ORANGE]: styles.gButtonOrange,
            [ButtonType.DANGER]: styles.gButtonDanger,
            [ButtonType.TRANSPARENT]: styles.gButtonTransparent,
        }
        return classes[props.type]
    }
    return <>
        <Button
            className={getClass() + " " + props.className}
            icon={Boolean(props.icon)}
            onClick={props.onClick}
            basic={props.basic}
            fluid={props.fluid}
            circular={props.circular}
            size={props.size}
        >
            {props.icon && <Icon name={props.icon}/>}
            {props.children}
            <span className={props.text && styles.gButtonText}>{props.text}</span>
        </Button>
    </>
}