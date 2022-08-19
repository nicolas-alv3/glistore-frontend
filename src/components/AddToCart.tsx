import {CartItem, Product} from "../types";
import React from "react";
import {Divider, Header} from "semantic-ui-react";
import styles from "../../styles/Home.module.css";
import TalleSelectorDetail from "../utils/TalleSelectorDetail";
import AmountPicker from "./Utils/AmountPicker";
import ToastUtils from "../utils/toastUtils";
import {addItem, show} from "../../slices/sidebarSlice";
import {useDispatch} from "react-redux";
import GButton, {ButtonType} from "./Utils/GButton";

interface Props {
    product?: Product;
    onAdd?: () => void
}

export default function AddToCart(props: Props) {
    const [amount, setAmount] = React.useState(1);
    const [talle, setTalle] = React.useState("");
    const [formSubmitted, setFormSubmitted] = React.useState(false);
    const dispatch = useDispatch();

    const addCorrect = () => {
        const cartItem = {
            product: props.product,
            amount,
            talle
        }
        dispatch(addItem(cartItem as CartItem));
        props.onAdd && props.onAdd();
        ToastUtils.success("Perfecto!")
        dispatch(show());
    }

    const addToCart = () => {
        if (amount > 0 && talle) {
            addCorrect()
        } else {
            setFormSubmitted(true);
            ToastUtils.error("Debes elegir un talle y cantidad primero!")
        }
    }

    const isInvalidTalle = !talle && formSubmitted

    const isInvalidAmount = amount <= 0 && formSubmitted

    return <div style={{marginBottom: 16}}>
        <Header className={styles.font} size={"huge"}>${props.product?.price}</Header>
        <TalleSelectorDetail onTalleSelect={setTalle} product={props.product} invalid={isInvalidTalle}/>
        <Divider/>
        <AmountPicker onAmountChange={setAmount} isInvalidAmount={isInvalidAmount}/>
        <Divider/>
        <GButton icon={"cart plus"} type={ButtonType.PRIMARY} text={"Agregar al carrito"} onClick={addToCart}/>
    </div>

}