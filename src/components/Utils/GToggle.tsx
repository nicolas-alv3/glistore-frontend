import styles from '../../../styles/Utils.module.css'
import React from "react";

interface Props {
    onChange: (value: boolean) => void,
    checked: boolean,
    label?: string
}

export default function GToggle(props: Props) {
    return <>
        <div style={ { display: "flex", justifyContent: "space-between", margin: "16px 0" } }>
            <label><b>{props.label}</b></label>
            <div className={`${styles.switch} ${props.checked && styles.switchChecked}`}
                 onClick={() => props.onChange(!props.checked)}>
                <span className={`${styles.slider} ${props.checked && styles.sliderChecked}`}></span>
            </div>
        </div>
    </>
}