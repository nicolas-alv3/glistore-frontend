import styles from "../../../styles/Utils.module.css";
import {ReactNode} from "react";
import {GColors, isDark} from "../../utils/GColors";

export enum GBadgeType {
    PRIMARY,
    SECONDARY,
    TERTIARY,
    BASIC,
    ORANGE,
}

interface Props {
    type: GBadgeType,
    circular?: boolean,
    text?: string,
    className?: string
    children?: ReactNode
}

export default function GBadge(props: Props) {
    const getClass = () => {
        const classes = {
            [GBadgeType.PRIMARY]: styles.gButtonPrimary,
            [GBadgeType.SECONDARY]: styles.gButtonSecondary,
            [GBadgeType.TERTIARY]: styles.gButtonTertiary,
            [GBadgeType.BASIC]: styles.gBadgeBasic,
        }
        return classes[props.type]
    }

    function getTypeColor() {
        const variables = {
            [GBadgeType.PRIMARY]: GColors.PRIMARY_COLOR,
            [GBadgeType.SECONDARY]: GColors.SECONDARY_COLOR,
            [GBadgeType.TERTIARY]: GColors.TERTIARY_COLOR,
            [GBadgeType.BASIC]: GColors.WHITE_COLOR,
        }
        return variables[props.type];
    }

    function getColor() {
        return isDark(getTypeColor(), true) ? "var(--col-white)": "var(--col-darkgray)";
    }

    return <div className={`${styles.gBadge} ${getClass()} ${props.className} ${props.circular && styles.gBadgeCircular}`}>
        <span style={{color: getColor()}}>{props.text || props.children}</span>
    </div>
}