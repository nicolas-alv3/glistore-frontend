import {Input} from "semantic-ui-react";
import styles from "../../../styles/Utils.module.css";
import React from "react";
import GButton, {ButtonType} from "./GButton";
import GTitle, {GTitleSize} from "./GTitle";
import {GColors} from "../../utils/GColors";

interface Props {
    onAmountChange: (n: number) => void,
    isInvalidAmount: boolean
}

export default function AmountPicker(props: Props) {
    const [amount, setAmount] = React.useState(1);

    const handleAmountChangePlus = () => {
        props.onAmountChange(amount + 1)
        setAmount(amount + 1);
    }
    const handleAmountChangeMinus = () => {
        props.onAmountChange(amount - 1)
        setAmount(amount - 1);
    }
    return <div className={styles.amountPicker}>
        <GTitle color={GColors.SECONDARY_FONT} size={GTitleSize.SMALL}>Cantidad:</GTitle>
        <GButton type={ButtonType.TERTIARY} circular icon={"minus"} onClick={handleAmountChangeMinus}/>
        <Input className={styles.numberInput} type={"number"} value={amount} error={amount <= 0}/>
        <GButton type={ButtonType.TERTIARY} circular icon={"plus"} onClick={handleAmountChangePlus}/>
        {
            props.isInvalidAmount &&
            <div style={{color: "red"}}>La cantidad debe ser mayor a cero</div>
        }
    </div>
}