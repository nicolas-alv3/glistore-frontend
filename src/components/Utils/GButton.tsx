import {Button, Icon} from "semantic-ui-react";
import styles from '../../../styles/Utils.module.css';
import {SemanticICONS, SemanticSIZES} from "semantic-ui-react/dist/commonjs/generic";
import {ReactNode} from "react";
import {GColors, isDark} from "../../utils/GColors";

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
    className?: string,
    loading?: boolean
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

    function getColor() {
        const variables = {
            [ButtonType.PRIMARY]: GColors.PRIMARY_COLOR,
            [ButtonType.PRIMARY_BASIC]: GColors.WHITE_COLOR,
            [ButtonType.SECONDARY]: GColors.SECONDARY_COLOR,
            [ButtonType.TERTIARY]: GColors.TERTIARY_COLOR,
            [ButtonType.ORANGE]: GColors.DARKGRAY_COLOR,
            [ButtonType.DANGER]: GColors.DANGER_COLOR,
            [ButtonType.TRANSPARENT]: GColors.PRIMARY_COLOR,
        }
        return variables[props.type];
    }

    const getColorForTextOrIcon = () => {
        if(props.type === ButtonType.TRANSPARENT) {
            return getColor();
        }
        return isDark(getColor(), true) ? "var(--col-white)": "var(--col-darkgray)";
    }

    return <>
        <Button
            className={`${getClass()} ${props.className}`}
            icon={Boolean(props.icon)}
            onClick={props.onClick}
            basic={props.basic}
            fluid={props.fluid}
            circular={props.circular}
            size={props.size}
            loading={props.loading}
        >
            <span style={{color: getColorForTextOrIcon()}}>
                {props.icon && <Icon className={!props.text ? styles.gIcon : ""} name={props.icon} />}
                {props.children || <span className={props.text && styles.gButtonText}>{props.text}</span>}
            </span>

        </Button>
    </>
}