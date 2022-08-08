import {Button, Container, Divider, Header, Icon, Image, Item, ItemHeader, Menu, Sidebar} from "semantic-ui-react";
import React from "react";
import styles from '../../styles/Home.module.css';
import WhatsappService from "../../service/WhatsappService";
import {getConfig} from "../hooks/getConfig";
import {CartItem} from "../types";
import {hide, selectCart, selectShow} from "../../slices/sidebarSlice";
import {useDispatch, useSelector} from "react-redux";


// @ts-ignore
export default function CartSidebar () {
    const cart = useSelector(selectCart);
    const [editMode, setEditMode] = React.useState(false);
    const config = getConfig();
    const show = useSelector(selectShow);
    const dispatch = useDispatch()



    const deleteItem = (idx: number) => {
        setCart( cart.filter( (i, index) => index !== idx));
        setEditMode(false);
    }

    function itemPriceRaw(item :CartItem) {
        return item.product.price * item.amount;
    }

    function itemPrice(item: CartItem) {
        return (item.product.price * item.amount) - (item.product.price * item.amount) * item.product.discount / 100;
    }


    function itemsText() {
        let text = "";
        cart.forEach( (i,index) => text = text +  `${index+1}. ${i.product.name} |${i.talle}| (_${i.amount}u._) ${i.product.discount?`~${itemPriceRaw(i)}~`:""} *${itemPrice(i)}* \n ` )
        return text;
    }

    const confirmOrder = () => {
        const msg = `
        Hola ${config.companyName}!, quisiera hacer una compra:\n ${itemsText()}
        *Total:*$ ${cart.reduce( (acc,i) => acc + i.amount * i.product.price,0)}
    `
        setCart([])
        console.log(msg);
        WhatsappService.sendMessageToStore(msg);
    }

    return  <Sidebar
                as={Menu}
                animation='overlay'
                icon='labeled'
                className={styles.sidebar}
                direction={"right"}
                onHide={() => dispatch(hide())}
                vertical
                visible={show}
            >
        <div style={{display:"flex", justifyContent: "space-between", alignItems:"center"}}>
            <Header>Tu carrito</Header>
            {cart.length > 0 && <Button color={"instagram"} icon={"pencil"} onClick={ () => setEditMode(prevState => !prevState)}/>}
        </div>
        <Divider />
        {
            cart.length ? <Item.Group>
                {cart?.map( (i,idx) => <Item key={i.product._id} className={styles.item}>
                    <Item.Image size='tiny' src={i.product.images[0]} />
                    <Item.Content>
                        <Item.Header as='a'>{i.product.name}</Item.Header>
                        <Item.Meta>{i.amount}u.</Item.Meta>
                        <Item.Description>
                            {i.product.description}
                        </Item.Description>
                        <div style={{display:"flex", justifyContent: "space-between"}}>
                            <Item.Extra>{`Talle ${i.talle}`}</Item.Extra>
                            <Item.Header as={Header}>${i.product.price}</Item.Header>
                        </div>
                        {editMode && <Button icon="delete" color={"red"} basic onClick={() => deleteItem(idx)}>Eliminar item</Button>}
                    </Item.Content>
                </Item>)}
                    <Item>
                        <Button color={"brown"} basic fluid onClick={hide}> Seguir mirando 👀 </Button>
                    </Item>
                    <Item>
                        <Button color={"brown"} fluid onClick={confirmOrder}> Finalizar compra 🥳</Button>
                    </Item>
            </Item.Group> :
                <Header> Aún no has comprado nada... 😞</Header>
        }
        </Sidebar>
}