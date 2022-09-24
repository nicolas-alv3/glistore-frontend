import {Product, SaleItem} from "../types";
import React from "react";
import {Divider} from "semantic-ui-react";
import AmountPicker from "./Utils/AmountPicker";
import ToastUtils from "../utils/toastUtils";
import {addItem, show} from "../../slices/sidebarSlice";
import {useDispatch} from "react-redux";
import GButton, {ButtonType} from "./Utils/GButton";
import {moneyPipe} from "../utils/parseUtils";
import {hideModal} from "../../slices/modalSlice";
import Features from "./Utils/Features";
import GTitle, {GTitleSize} from "./Utils/GTitle";
import {GColors} from "../utils/GColors";

interface Props {
    product: Product;
    onAdd?: () => void
}

export default function AddToCart(props: Props) {
    const [amount, setAmount] = React.useState(1);
    const [formSubmitted, setFormSubmitted] = React.useState(false);
    const [features, setFeatures] = React.useState({});
    const dispatch = useDispatch();

    const addCorrect = () => {
        const cartItem = {
            product: props.product,
            amount,
            features: Object.keys(features).map( k => ({ name: k, value: features[k].toString()}))
        }
        dispatch(addItem(cartItem as unknown as SaleItem));
        props.onAdd && props.onAdd();
        ToastUtils.success("Perfecto!")
        dispatch(show())
        dispatch(hideModal());
    }

    const addToCart = () => {
        if (amount > 0 && props.product.features.every(f => (!f.required || features[f.name]))) {
            addCorrect()
        } else {
            setFormSubmitted(true);
            ToastUtils.error("Debes elegir una cantidad primero!")
        }
    }

    const isInvalidAmount = amount <= 0 && formSubmitted;

    return <div style={{marginBottom: 16}}>
        <GTitle style={{margin: "16px 0"}} size={GTitleSize.LARGE} color={GColors.DARKGRAY_COLOR}>{moneyPipe(props.product?.price as number)}</GTitle>
        <Features setFeatures={setFeatures} productFeatures={props.product?.features || []} formSubmitted={formSubmitted}/>
        <Divider/>
        <AmountPicker onAmountChange={setAmount} isInvalidAmount={isInvalidAmount}/>
        <Divider/>
        <GButton icon={"cart plus"} type={ButtonType.PRIMARY} text={"Agregar al carrito"} onClick={addToCart}/>
    </div>

}