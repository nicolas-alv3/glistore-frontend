import styles from '../../styles/Home.module.css';
import React, {CSSProperties} from "react";
import {useRouter} from "next/router";
import {selectCart, toggle} from "../../slices/sidebarSlice";
import {useDispatch, useSelector} from "react-redux";
import {Input} from "semantic-ui-react";
import GButton, {ButtonType} from "./Utils/GButton";
import {toggleNavMenu} from "../../slices/navMenuSlice";
import GTitle, {GTitleSize} from "./Utils/GTitle";
import {GColors} from "../utils/GColors";

// @ts-ignore
export default function Navbar() {
    const cart = useSelector(selectCart);
    const [searchInput, setSearchInput] = React.useState("");
    const router = useRouter();
    const dispatch = useDispatch()


    const handleSearchChange = (e) => setSearchInput(e.target.value);

    const submitSearch = (e) => {
        e.preventDefault();
        if (searchInput.length > 0) {
            router.push({pathname: "/search", query: {name: searchInput}})
        }
    }

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
                    <form onSubmit={submitSearch} style={{marginTop: 8}}>
                        <Input placeholder='Estoy buscando...' className={styles.input}>
                            <input value={searchInput} onChange={handleSearchChange}/>
                            <GButton type={ButtonType.PRIMARY} icon={"search"}/>
                        </Input>
                    </form>
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