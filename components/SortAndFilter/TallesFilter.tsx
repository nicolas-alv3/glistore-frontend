import {Checkbox} from "semantic-ui-react";
import React from "react";

export default function TallesFilter( { talles, values, setValues }) {
    const updateValue = (idx: number) => () => {
        const newValues = values;
        newValues[idx] = !newValues[idx];
        setValues(newValues);
    }
    return <div>
        {
            talles.map( (talle: any, i :number) => <span key={talle} style={{margin: "8px"}}>
                    <Checkbox label={talle} onClick={updateValue(i)} value={values[i]} />
                </span> )}
    </div>
}