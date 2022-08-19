import {Header} from "semantic-ui-react";
import styles from "../../styles/Home.module.css";
import GButton, {ButtonType} from "../components/Utils/GButton";
import React from "react";
import {Product} from "../types";

interface Props {
    product?: Product,
    onTalleSelect: (t: string) => void,
    invalid: boolean
}

export default function TalleSelectorDetail(props: Props) {
    const [talle, setTalle] = React.useState("");

    return <>
        <Header className={styles.font} size={"medium"}>Disponible en talles:</Header>
        {props.product?.talles?.map(t => <GButton
            key={t}
            basic={talle !== t}
            onClick={() => {
                setTalle(t);
                props.onTalleSelect(t)
            }}
            type={ButtonType.ORANGE}
        >{t}
        </GButton>)}
        {props.invalid && <div style={{color: "red"}}>Debes elegir un talle</div>}
    </>
}