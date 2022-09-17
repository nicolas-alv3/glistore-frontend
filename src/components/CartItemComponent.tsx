import styles from "../../styles/Home.module.css";
import {Header, Item} from "semantic-ui-react";
import GButton, {ButtonType} from "./Utils/GButton";
import React from "react";
import {SaleItem} from "../types";

interface Props {
    item: SaleItem,
    editMode: boolean,
    onDelete: (idx: number) => void,
    idx: number
}

export default function CartItemComponent(props: Props) {
    return <Item key={props.item.product._id} className={styles.item}>
        <div style={{marginBottom: 24}}>
            <Item.Image size='small' src={props.item.product.images[0]}/>
        </div>
        <Item.Content>
            <Item.Header as='a'>{props.item.product.name}</Item.Header>
            <Item.Description>
                {props.item.product.description}
            </Item.Description>
            <Item.Meta>{props.item.amount}u.</Item.Meta>
            {props.item.features.map( (f) => <Item.Extra key={f.name}>{`${f.name}: ${f.value}`}</Item.Extra>)}
            <div style={{display: "flex", justifyContent: "flex-end"}}>
                <Item.Header as={Header}>${props.item.product.price}</Item.Header>
            </div>
            {props.editMode && <GButton icon="delete" type={ButtonType.DANGER} onClick={() => props.onDelete(props.idx)}>Eliminar
                item</GButton>}
        </Item.Content>
    </Item>
}