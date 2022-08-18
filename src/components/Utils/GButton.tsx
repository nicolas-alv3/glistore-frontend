import {Button, Icon} from "semantic-ui-react";
import styles from '../../../styles/Utils.module.css';
import {SemanticICONS} from "semantic-ui-react/dist/commonjs/generic";
import {ReactNode} from "react";

export enum ButtonType {
    PRIMARY,
    SECONDARY,
    TERTIARY,
    ORANGE,
    DANGER,
    PRIMARY_BASIC,
}

interface Props {
    text?: string,
    type: ButtonType,
    onClick: () => void,
    icon?: SemanticICONS,
    basic?: boolean,
    children?: ReactNode,
    fluid?: boolean,
    circular?: boolean
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
        }
        return classes[props.type]
    }
    return <>
        <Button
            className={getClass()}
            icon={Boolean(props.icon)}
            onClick={props.onClick}
            basic={props.basic}
            fluid={props.fluid}
            circular={props.circular}
        >
            {props.icon && <Icon name={props.icon}/>}
            {props.children}
            <span className={props.text && styles.gButtonText}>{props.text}</span>
        </Button>
    </>
}