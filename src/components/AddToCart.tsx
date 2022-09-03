import {SaleItem, Product} from "../types";
import React from "react";
import {Divider, Header} from "semantic-ui-react";
import styles from "../../styles/Home.module.css";
import AmountPicker from "./Utils/AmountPicker";
import ToastUtils from "../utils/toastUtils";
import {addItem, show} from "../../slices/sidebarSlice";
import {useDispatch} from "react-redux";
import GButton, {ButtonType} from "./Utils/GButton";
import {moneyPipe} from "../utils/parseUtils";
import {hideModal} from "../../slices/modalSlice";
import TalleSelector from "./Utils/TalleSelector";
import Features from "./Utils/Features";

interface Props {
    product?: Product;
    onAdd?: () => void
}

export default function AddToCart(props: Props) {
    const [amount, setAmount] = React.useState(1);
    const [talle, setTalle] = React.useState<string[]>([]);
    const [formSubmitted, setFormSubmitted] = React.useState(false);
    const [features, setFeatures] = React.useState({});
    const dispatch = useDispatch();

    const addCorrect = () => {
        const cartItem = {
            product: props.product,
            amount,
            talle,
            features: Object.keys(features).map( k => ({ name: k, value: features[k]}))
        }
        dispatch(addItem(cartItem as unknown as SaleItem));
        props.onAdd && props.onAdd();
        ToastUtils.success("Perfecto!")
        dispatch(show())
        dispatch(hideModal());
    }

    const addToCart = () => {
        if (amount > 0 && talle.length) {
            addCorrect()
        } else {
            setFormSubmitted(true);
            ToastUtils.error("Debes elegir un talle y cantidad primero!")
        }
    }

    const isInvalidTalle = !talle.length && formSubmitted;
    const isInvalidAmount = amount <= 0 && formSubmitted;

    return <div style={{marginBottom: 16}}>
        <Header className={styles.font} size={"huge"}>{moneyPipe(props.product?.price as number)}</Header>
        <TalleSelector showLabel talles={talle} onSelect={ (t) => setTalle(t)} tallesToSelect={props.product?.talles} multiple={false} error={isInvalidTalle}/>
        <Features setFeatures={setFeatures} productFeatures={props.product?.features || []} />
        <Divider/>
        <AmountPicker onAmountChange={setAmount} isInvalidAmount={isInvalidAmount}/>
        <Divider/>
        <GButton icon={"cart plus"} type={ButtonType.PRIMARY} text={"Agregar al carrito"} onClick={addToCart}/>
    </div>

}