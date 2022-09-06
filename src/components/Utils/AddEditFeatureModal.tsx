import {Dropdown, Form, FormField, Input, Menu, Modal} from "semantic-ui-react";
import {FeatureType, GFeature} from "../../types";
import React from "react";
import GTitle, {GTitleSize} from "./GTitle";
import {FilterBadge} from "./FilterBadges";
import GButton, {ButtonType} from "./GButton";

interface Props {
    onChange: (feature: GFeature) => void,
    features: GFeature[],
    formSubmitted: boolean
}


export default function AddEditFeatureModal(props: Props) {
    const [open, setOpen] = React.useState(true);

    const [name, setName] = React.useState("");
    const [item, setItem] = React.useState("");
    const [type, setType] = React.useState<FeatureType>(FeatureType.ENUM_SIMPLE);
    const [items, setItems] = React.useState<string[]>([]);

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
    }

    const handleSubmit = () => {
        props.onChange({
            name,
            type,
            options:[],
            enumerable: items,
            required: true
        })
        setOpen(false);
        resetForm();
    }

    return <Modal open={open} onClose={() => setOpen(false)}>
        <Modal.Header>Agregar característica </Modal.Header>
        <Modal.Content>
        <Form onSubmit={addToItems}>
            <GTitle size={GTitleSize.SMALL}>Características</GTitle>
            <Form.Field error={props.formSubmitted && props.features.length == 0}>
                <label>Nombre</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder='Ingresar nombre'/>
            </Form.Field>
            <Form.Field>
                <label>Tipo de selección</label>
                <Menu compact>
                    <Dropdown placeholder={"Elige el tipo"} value={type} options={options} onChange={(e,data) => setType(data.value as FeatureType)} simple item />
                </Menu>
            </Form.Field>
            <FormField error={props.formSubmitted && props.features.length == 0}>
                <label>Agregar items seleccionables</label>
                <Input action={{icon: 'arrow right'}} placeholder='Talles, tamaños o características...' input={<input value={item} onChange={(e) => setItem(e.target.value)}/>}/>
            </FormField>
        </Form>
        {
            items.map(i => <FilterBadge key={i} value={i} text={i} onDelete={() => handleDelete(i)} />)
        }
            </Modal.Content>
        <Modal.Actions>
            <GButton type={ButtonType.TERTIARY} text={"Cancelar"} onClick={() => setOpen(false)}/>
            <GButton type={ButtonType.PRIMARY} text={"Agregar"} onClick={handleSubmit}/>
        </Modal.Actions>
    </Modal>
}