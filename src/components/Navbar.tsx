import styles from '../../styles/Home.module.css';
import React, {CSSProperties} from "react";
import {useRouter} from "next/router";
import {selectCart, toggle} from "../../slices/sidebarSlice";
import {useDispatch, useSelector} from "react-redux";
import GButton, {ButtonType} from "./Utils/GButton";
import {toggleNavMenu} from "../../slices/navMenuSlice";
import GTitle, {GTitleSize} from "./Utils/GTitle";
import {GColors} from "../utils/GColors";
import Image from "next/image";
import {useConfig} from "../hooks/useConfig";

export default function Navbar() {
    const cart = useSelector(selectCart);
    const {config} = useConfig();
    const router = useRouter();
    const dispatch = useDispatch()

    const numberCartStyle: CSSProperties = {
        fontSize: 12,
        width: "20px",
        height: "20px",
        background: "var(--col-secondary)",
        padding: "3px",
        margin: "0",
        position: "absolute",
        top: 36,
        right: 14,
        justifyContent: "center",
        display: "flex",
        borderRadius: "50%",
        alignItems: "center"
    }

    const openNavMenu = () => {
        dispatch(toggleNavMenu())
    }

    return <>
        <nav className={`${styles.navbar} ${router.pathname.includes("admin") ? "flex-start" : ""} `}>
            <GButton icon={"bars"} onClick={openNavMenu} size={"massive"} type={ButtonType.TRANSPARENT}
                     className={styles.cartButton}>
            </GButton>
            {!router.pathname.includes("admin") ? <>
                    {cart?.length > 0 && <div style={numberCartStyle}>{cart.length}</div>}
                    <span>
                        <Image src={config.logo || "..."} width={60}
                               layout={"intrinsic"} alt={"logo"}
                               objectFit={"cover"}
                               height={60} objectPosition={"center"}/>
                    </span>
                    <div className={styles.cartContainer}>
                        <GButton icon={"cart"} onClick={() => dispatch(toggle())} size={"massive"}
                                 type={ButtonType.TRANSPARENT}
                                 className={styles.cartButton}>
                            {cart?.length > 0 && <div style={numberCartStyle}>{cart.length}</div>}
                        </GButton>
                    </div>
                </> :
                <GTitle size={GTitleSize.MEDIUM} title={"Tu tienda"} color={GColors.WHITE_COLOR}/>}
        </nav>
    </>;
}