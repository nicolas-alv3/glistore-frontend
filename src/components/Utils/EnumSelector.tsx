import styles from "../../../styles/Admin.module.css";
import {Form} from "semantic-ui-react";
import React from "react";
import GButton, {ButtonType} from "./GButton";
import stylesHome from "../../../styles/Home.module.css";
import GTitle, {GTitleSize} from "./GTitle";

interface Props {
    valueSelected: string | string[],
    onSelect: (values: string | string[]) => void,
    label?: string,
    error?: boolean,
    options: string[],
    multiple?: boolean
}

export default function EnumSelector(props: Props) {

    const toggleMultiple = (o :string) => {
        const currentValues = props.valueSelected as string[];
        if (currentValues.includes(o)) {
            props.onSelect(currentValues.filter(ta => ta !== o));
        } else {
            props.onSelect(currentValues.concat([o]))
        }
    }

    const handleToggleOption = (t: string) => {
        if(props.multiple) {
            toggleMultiple(t)
        } else {
            props.onSelect([t])
        }
    }

    return <Form.Field error={props.error}>
        { props.label &&
            <GTitle className={stylesHome.font} size={GTitleSize.SMALL}>{props.label}</GTitle>
        }
        <div className={styles.optionsContainer}>
            {props.options.map((t) => <>
                <GButton
                    key={t}
                    basic={!props.valueSelected.includes(t)}
                    onClick={() => handleToggleOption(t)}
                    type={ButtonType.ORANGE}
                >{t}
                </GButton>
            </>)}
        </div>
        {props.error && <label style={{color:"red"}}>Debes elegir un talle</label>}
    </Form.Field>
}