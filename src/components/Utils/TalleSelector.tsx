import styles from "../../../styles/Admin.module.css";
import {Form, Header} from "semantic-ui-react";
import React from "react";
import ProductService from "../../../service/ProductService";
import GButton, {ButtonType} from "./GButton";
import stylesHome from "../../../styles/Home.module.css";

interface Props {
    talles: string[],
    onSelect: (talles: string[]) => void,
    showLabel?: boolean,
    error?: boolean,
    multiple?: boolean,
    tallesToSelect?: string[]
}

export default function TalleSelector(props: Props) {
    const toggleMultiple = (t) => {
        if (props.talles.includes(t)) {
            props.onSelect(props.talles.filter(ta => ta !== t));
        } else {
            props.onSelect(props.talles.concat([t]))
        }
    }

    const handleToggleTalle = (t: string) => {
        if(props.multiple) {
            toggleMultiple(t)
        } else {
            props.onSelect([t])
        }
    }

    const getTalles = () => props.tallesToSelect || ProductService.getTalles();


    return <Form.Field error={props.error}>
        { props.showLabel &&
            <Header className={stylesHome.font} size={"tiny"}>Disponible en talles:</Header>
        }
        <div className={styles.optionsContainer}>
            {getTalles().map((t) => <>
                <GButton
                    key={t}
                    basic={!props.talles.includes(t)}
                    onClick={() => handleToggleTalle(t)}
                    type={ButtonType.ORANGE}
                >{t}
                </GButton>
            </>)}
        </div>
        {props.error && <label style={{color:"red"}}>Debes elegir un talle</label>}
    </Form.Field>
}