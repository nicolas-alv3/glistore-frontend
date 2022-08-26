import styles from "../../../styles/Admin.module.css";
import {Form} from "semantic-ui-react";
import React, {useEffect} from "react";
import ProductService from "../../../service/ProductService";
import GButton, {ButtonType} from "./GButton";

interface Props {
    talles: string[],
    onSelect: (talles: string[]) => void,
    showLabel?: boolean
}

export default function TalleSelector(props: Props) {
    const [talles, setTalles] = React.useState<string[]>([]);


    useEffect(() => {
        setTalles(ProductService.getTalles());
    }, [])

    const handleToggleTalle = (t: string) => {
        if (props.talles.includes(t)) {
            props.onSelect(props.talles.filter(ta => ta !== t));
        } else {
            props.onSelect(props.talles.concat([t]))
        }
    }

    return <Form.Field>
        { props.showLabel &&
            <label>Talles disponibles</label>
        }
        <div className={styles.tallesContainer}>
            {talles.map((t) => <>
                <GButton
                    key={t}
                    basic={!props.talles.includes(t)}
                    onClick={() => handleToggleTalle(t)}
                    type={ButtonType.ORANGE}
                >{t}
                </GButton>
            </>)}
        </div>
    </Form.Field>
}