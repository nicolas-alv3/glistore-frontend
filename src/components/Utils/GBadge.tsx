import styles from "../../../styles/Utils.module.css";
import {ReactNode} from "react";

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

    return <div className={`${styles.gBadge} ${getClass()} ${props.className} ${props.circular && styles.gBadgeCircular}`}>
        {props.text || props.children}
    </div>
}