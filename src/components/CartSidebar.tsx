import {Divider, Item, Menu, Sidebar} from "semantic-ui-react";
import React, {useEffect} from "react";
import styles from '../../styles/Home.module.css';
import WhatsappService from "../../service/WhatsappService";
import {hide, removeFromIndex, selectCart, selectShow, setCart} from "../../slices/sidebarSlice";
import {useDispatch, useSelector} from "react-redux";
import {getCartFromReload, saveCartOnReload} from "../utils/windowUtils";
import GButton, {ButtonType} from "./Utils/GButton";
import GModal from "./Utils/GModal";
import ToastUtils from "../utils/toastUtils";
import CartItemComponent from "./CartItemComponent";
import Image from "next/image";
import SalesService from "../../service/SalesService";
import GTitle, {GTitleSize} from "./Utils/GTitle";
import {useConfig} from "../hooks/useConfig";
import emptyCartURL from '../../public/empty_cart.png';


export default function CartSidebar() {
    const {config} = useConfig();
    const cart = useSelector(selectCart);
    const [editMode, setEditMode] = React.useState(false);
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

    const confirmOrder = () => {
        const sale = {
            items: cart
        }
        SalesService.createSale(sale)
            .then(res => {
                WhatsappService.sendWhatsappMessage(res.message, config.phoneNumber);
            })
    }
    const deleteAll = () => {
        setCart([]);
        dispatch(setCart([]));
        ToastUtils.success("Carrito vacío!");
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
        <div className={"flex-between"}>
            <GTitle size={GTitleSize.MEDIUM}>Tu carrito</GTitle>
            {
                cart?.length > 0 &&
                (<div>
                    {editMode && <GButton type={ButtonType.PRIMARY_BASIC} onClick={deleteAll} text={"Eliminar todos"}
                                          icon={"delete"}/>}
                    <GButton icon={"pencil"} type={ButtonType.TERTIARY} text={"Editar"}
                             onClick={() => setEditMode(prevState => !prevState)}/>
                </div>)
            }
        </div>
        <Divider/>
        {
            cart?.length ? <>
                    <Item.Group className={styles.cartItemContainer}>
                        {cart?.map((i, idx) => <CartItemComponent key={i.product._id} item={i} idx={idx} editMode={editMode}
                                                                  onDelete={deleteItem}/>)}
                    </Item.Group>
                    <Item.Group className={styles.sidebarActions}>
                        <Divider/>
                        <Item>
                            <GButton type={ButtonType.SECONDARY} fluid onClick={hideSidebar}> Seguir mirando
                                👀 </GButton>
                        </Item>
                        <Item>
                            <GModal
                                trigger={<GButton type={ButtonType.PRIMARY} fluid onClick={confirmOrder}> Finalizar compra
                                    🥳</GButton>}
                                id={"Post buy modal"}
                                title={"¿Pudiste terminar la compra?"}
                                handleSubmit={deleteAll}
                            >
                                Si finalizaste la compra eliminaremos el contenido de tu carrito, si no, lo dejamos como
                                está!
                            </GModal>
                        </Item>
                    </Item.Group>
                </> :
                <>
                    <Image
                        alt={"Empty cart"}
                        src={emptyCartURL}
                        width={300}
                        height={250}
                        unoptimized
                    />
                    <GTitle size={GTitleSize.MEDIUM} centered> Tu carrito esta vacío</GTitle>
                    <GTitle size={GTitleSize.SMALL} centered> Parece que no has agregado nada, date una vuelta y explora nuestros productos!</GTitle>
                    <Divider/>
                    <GButton type={ButtonType.SECONDARY} fluid onClick={hideSidebar}> Seguir mirando
                        👀 </GButton>
                </>
        }
    </Sidebar>
}