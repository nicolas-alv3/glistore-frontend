import {Divider, Header, Item, Menu, Sidebar} from "semantic-ui-react";
import React, {useEffect} from "react";
import styles from '../../styles/Home.module.css';
import WhatsappService from "../../service/WhatsappService";
import {getConfig} from "../hooks/getConfig";
import {CartItem} from "../types";
import {hide, removeFromIndex, resetCart, selectCart, selectShow, setCart} from "../../slices/sidebarSlice";
import {useDispatch, useSelector} from "react-redux";
import {getCartFromReload, saveCartOnReload} from "../utils/windowUtils";
import GButton, {ButtonType} from "./Utils/GButton";
import Image from "next/image";


// @ts-ignore
export default function CartSidebar() {
    const cart = useSelector(selectCart);
    const [editMode, setEditMode] = React.useState(false);
    const config = getConfig();
    const show = useSelector(selectShow);
    const dispatch = useDispatch();

    useEffect(() => {
        saveCartOnReload();
        getCartFromReload();
    }, [])


    const deleteItem = (idx: number) => {
        dispatch(removeFromIndex(idx));
        setEditMode(false);
    }

    function itemPriceRaw(item: CartItem) {
        return item.product.price * item.amount;
    }

    function itemPrice(item: CartItem) {
        return (item.product.price * item.amount) - (item.product.price * item.amount) * item.product.discount / 100;
    }


    function itemsText() {
        let text = "";
        cart.forEach((i, index) => text = text + `${index + 1}. ${i.product.name} |${i.talle}| (_${i.amount}u._) ${i.product.discount ? `~${itemPriceRaw(i)}~` : ""} *${itemPrice(i)}* \n `)
        return text;
    }

    const confirmOrder = () => {
        const msg = `
        Hola ${config.companyName}!, quisiera hacer una compra:\n ${itemsText()}
        *Total:*$ ${cart.reduce((acc, i) => acc + i.amount * i.product.price, 0)}
    `
        dispatch(resetCart());
        console.log(msg);
        WhatsappService.sendMessageToStore(msg);
    }
    const deleteAll = () => {
        setCart([]);
        dispatch(setCart([]))
    }

    const hideSidebar = () => dispatch(hide())

    return <Sidebar
        as={Menu}
        animation='overlay'
        icon='labeled'
        className={styles.sidebar}
        direction={"right"}
        onHide={() => dispatch(hide())}
        vertical
        visible={show}
    >
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <Header>Tu carrito</Header>
            {
                cart?.length > 0 &&
                (<div>
                    {editMode && <GButton type={ButtonType.PRIMARY_BASIC} onClick={deleteAll} text={"Eliminar todos"} icon={"delete"}/>}
                    <GButton icon={"pencil"} type={ButtonType.TERTIARY} text={"Editar"}
                             onClick={() => setEditMode(prevState => !prevState)}/>
                </div>)
            }
        </div>
        <Divider/>
        {
            cart?.length ? <Item.Group>
                    {cart?.map((i, idx) => <Item key={i.product._id} className={styles.item}>
                        <div style={{marginBottom: 24}}>
                            <Item.Image size='small' src={i.product.images[0]}/>
                        </div>
                        <Item.Content>
                            <Item.Header as='a'>{i.product.name}</Item.Header>
                            <Item.Description>
                                {i.product.description}
                            </Item.Description>
                            <Item.Meta>{i.amount}u.</Item.Meta>
                            <Item.Extra>{`Talle ${i.talle}`}</Item.Extra>
                            <div style={{display: "flex", justifyContent: "flex-end"}}>
                                <Item.Header as={Header}>${i.product.price}</Item.Header>
                            </div>
                            {editMode && <GButton icon="delete" type={ButtonType.DANGER} onClick={() => deleteItem(idx)}>Eliminar
                                item</GButton>}
                        </Item.Content>
                    </Item>)}
                    <Item>
                        <GButton type={ButtonType.SECONDARY} fluid onClick={hideSidebar}> Seguir mirando
                            👀 </GButton>
                    </Item>
                    <Item>
                        <GButton type={ButtonType.PRIMARY} fluid onClick={confirmOrder}> Finalizar compra 🥳</GButton>
                    </Item>
                </Item.Group> :
                <>
                    <Header> Aún no has agregado nada...</Header>
                    <img
                        src={"https://media.istockphoto.com/vectors/cute-black-and-white-cat-is-sitting-in-a-cardboard-box-vector-id1284540470?k=20&m=1284540470&s=170667a&w=0&h=XOT_1QDiE_P0775yyX4ybkwgZ3-SHb_zKTIdwmDoPJg="}
                        width={300}
                        height={300}
                    />
                    <GButton type={ButtonType.SECONDARY} fluid onClick={hideSidebar}> Seguir mirando
                        👀 </GButton>
                </>
        }
    </Sidebar>
}