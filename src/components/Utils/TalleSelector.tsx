import styles from "../../../styles/Admin.module.css";
import {Checkbox, Form} from "semantic-ui-react";
import React, {useEffect} from "react";
import ProductService from "../../../service/ProductService";

interface Props {
    talles: string[],
    onSelect: (talles: string[]) => void
}

export default function TalleSelector(props: Props) {
    const [talles, setTalles] = React.useState<string[]>([]);


    useEffect(() => {
        setTalles(ProductService.getTalles());
    }, [])

    const handleToggleTalle = (t: string) => {
        if(props.talles.includes(t)) {
            props.onSelect(props.talles.filter(ta => ta !== t));
        } else {
            props.onSelect(props.talles.concat([t]))
        }
    }

    return <Form.Field>
        <label>Talles disponibles</label>
        <div className={styles.tallesContainer}>
            {talles.map((t) => <Checkbox key={t} label={t} checked={props.talles.includes(t)} onClick={() => handleToggleTalle(t)}/>)}
        </div>
    </Form.Field>
}