import {Divider, Header, Item, Menu, Sidebar} from "semantic-ui-react";
import React, {useEffect} from "react";
import styles from '../../styles/Home.module.css';
import WhatsappService from "../../service/WhatsappService";
import {getConfig} from "../hooks/getConfig";
import {SaleItem, Sale} from "../types";
import {hide, removeFromIndex, selectCart, selectShow, setCart} from "../../slices/sidebarSlice";
import {useDispatch, useSelector} from "react-redux";
import {getCartFromReload, saveCartOnReload} from "../utils/windowUtils";
import GButton, {ButtonType} from "./Utils/GButton";
import GModal from "./GModal";
import ToastUtils from "../utils/toastUtils";
import CartItemComponent from "./CartItemComponent";
import Image from "next/image";
import SalesService from "../../service/SalesService";


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

    const confirmOrder = () => {
        const sale = {
            items: cart
        }
        SalesService.createSale(sale)
            .then(res => {
                WhatsappService.sendMessageToStore(res.message);
            })
    }
    const deleteAll = () => {
        setCart([]);
        dispatch(setCart([]));
        ToastUtils.success("Carrito vacío!");
    }

    const hideSidebar = () => dispatch(hide())

    const emptyCatURL = "https://media.istockphoto.com/vectors/cute-black-and-white-cat-is-sitting-in-a-cardboard-box-vector-id1284540470?k=20&m=1284540470&s=170667a&w=0&h=XOT_1QDiE_P0775yyX4ybkwgZ3-SHb_zKTIdwmDoPJg=";

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
                    {cart?.map((i, idx) => <CartItemComponent key={i.product._id} item={i} idx={idx} editMode={editMode} onDelete={deleteItem}/>)}
                    <Item>
                        <GButton type={ButtonType.SECONDARY} fluid onClick={hideSidebar}> Seguir mirando
                            👀 </GButton>
                    </Item>
                    <Item>
                        <GModal trigger={<GButton type={ButtonType.PRIMARY} fluid onClick={confirmOrder}> Finalizar compra 🥳</GButton>}
                                id={"Post buy modal"}
                                title={"¿Pudiste terminar la compra?"}
                                handleSubmit={deleteAll}
                        >
                            Si finalizaste la compra eliminaremos el contenido de tu carrito, si no, lo dejamos como está!
                        </GModal>
                    </Item>
                </Item.Group> :
                <>
                    <Header> Aún no has agregado nada...</Header>
                    <Image
                        alt={"Empty cart"}
                        loader={() => emptyCatURL}
                        src={emptyCatURL}
                        width={300}
                        height={300}
                    />
                    <GButton type={ButtonType.SECONDARY} fluid onClick={hideSidebar}> Seguir mirando
                        👀 </GButton>
                </>
        }
    </Sidebar>
}