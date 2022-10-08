import {Divider, Form} from "semantic-ui-react";
import SelectFilter, {SelectFilterType} from "../SortAndFilter/SelectFilter";
import React from "react";

interface Props {
    onChange: (value: (((prevState: string) => string) | string)) => void,
    category: string,
    error?: boolean
}

export default function CategorySelect(props: Props) {
    return <Form.Field error={props.error}>
        <Divider/>
        <label>Categoría</label>
        <SelectFilter multiple={false} value={props.category} setValue={props.onChange}
                      type={SelectFilterType.SELECT_CATEGORY}/>
    </Form.Field>;
}
