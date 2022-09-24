import {Dropdown, Form, FormField, Input, Menu, Modal} from "semantic-ui-react";
import {FeatureType, GFeature} from "../../types";
import React from "react";
import {FilterBadge} from "./FilterBadges";
import GButton, {ButtonType} from "./GButton";
import GToggle from "./GToggle";
import GInput from "./GInput";
import GForm from "./GForm";
import GPriceInput from "./GPriceInput";

interface Props {
    onChange: (feature: GFeature) => void,
    features: GFeature[],
}


export default function AddEditFeatureModal(props: Props) {
    const [open, setOpen] = React.useState(true);

    const [submitted, setSubmitted] = React.useState(false);
    const [name, setName] = React.useState("");
    const [item, setItem] = React.useState("");
    const [type, setType] = React.useState<FeatureType>(FeatureType.ENUM_SIMPLE);
    const [items, setItems] = React.useState<string[]>([]);
    const [addPrice, setAddPrice] = React.useState<boolean>(false);
    const [price, setPrice] = React.useState<string | number>("");

    const addToItems = () => {
        if(item) {
            setItems(prevState => prevState.concat([item]));
            setItem("");
        }
    }

    const options = [
        {key: FeatureType.ENUM_SIMPLE, value: FeatureType.ENUM_SIMPLE, text: "Selección simple"},
        {key: FeatureType.ENUM_MULT, value: FeatureType.ENUM_MULT, text: "Selección multiple"}
    ]

    const handleDelete = (i) => {
        setItems(prevState => prevState.filter( it => it!== i))
    }

    const resetForm = () => {
        setItem("");
        setItems([]);
        setType(FeatureType.ENUM_SIMPLE);
        setPrice("");
    }

    const isValidForm = () => name && items.length;

    const handleSubmit = () => {
        if(isValidForm()) {
            props.onChange({
                name,
                type,
                options:[],
                enumerable: items,
                required: true,
                priceAdded: parseInt(price.toString()) || 0
            })
            setOpen(false);
            resetForm();
        } else {
            setSubmitted(true);
        }
    }

    const handleItemChange = (e) => {
        if(e.target.value.includes(",")) {
            addToItems();
            setItem("");
        } else {
            setItem(e.target.value)
        }
    }

    return <Modal open={open} onClose={() => setOpen(false)} size={"tiny"}>
        <Modal.Header>Agregar característica </Modal.Header>
        <Modal.Content>
        <GForm onSubmit={addToItems}>
            <GInput label={"Nombre"} value={name} onChange={ value => setName(value)} error={false} errorMessage={""}/>
            <Form.Field>
                <label>Tipo de selección</label>
                <Menu compact>
                    <Dropdown placeholder={"Elige el tipo"} value={type} options={options} onChange={(e,data) => setType(data.value as FeatureType)} item />                </Menu>
            </Form.Field>
            <FormField error={submitted && items.length == 0} >
                <label>Agregar items seleccionables</label>
                <Input action={{icon: 'arrow right'}} placeholder='Ketchup, mayonesa, mostaza...' input={<input value={item} onChange={handleItemChange}/>}/>
            </FormField>
        </GForm>
        {
            items.map(i => <FilterBadge key={i} value={i} text={i} onDelete={() => handleDelete(i)} />)
        }
        <div style={ { display: "flex", justifyContent: "space-between", margin: "16px 0" } }>
            <label><b>Agrega precio</b></label>
            <GToggle checked={addPrice}  onChange={ setAddPrice }/>
        </div>
            {
                addPrice &&
                <GForm>

                    <GPriceInput
                        label={"Precio agregado"}
                        helpBubbleText={"Este precio sera agregado al producto cuando sea seleccionado"}
                        error={!price}
                        errorMessage={"El precio debe ser mayor a cero"} />
                </GForm>
            }
        </Modal.Content>
        <Modal.Actions>
            <GButton type={ButtonType.TERTIARY} text={"Cancelar"} onClick={() => setOpen(false)}/>
            <GButton type={ButtonType.PRIMARY} text={"Agregar"} onClick={handleSubmit}/>
        </Modal.Actions>
    </Modal>
}