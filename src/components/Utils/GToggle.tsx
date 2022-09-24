import styles from '../../../styles/Utils.module.css'

interface Props {
    onChange: (value: boolean) => void,
    checked: boolean
}

export default function GToggle(props: Props) {
    return <div className={`${styles.switch} ${props.checked && styles.switchChecked}`} onClick={() => props.onChange(!props.checked)}>
            <span className={`${styles.slider} ${props.checked && styles.sliderChecked}`}></span>
    </div>
}