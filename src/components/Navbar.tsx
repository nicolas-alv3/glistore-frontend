import styles from '../../styles/Home.module.css';
import {Button, Icon, Input} from "semantic-ui-react";
import React, {CSSProperties, useEffect} from "react";
import {useRouter} from "next/router";
import Link from 'next/link';
import {isAdminLogged} from "../utils/loginUtils";
import {selectCart, toggle} from "../../slices/sidebarSlice";
import {useDispatch, useSelector} from "react-redux";
import {setPartialReq} from "../../slices/filterSlice";
import Image from "next/image";
import largeLogo from '../../public/logo_pomelo_largo.png';
import smallLogo from '../../public/logo_pomelo_cuadrado.png';
import GButton, {ButtonType} from "./Utils/GButton";

// @ts-ignore
export default function Navbar() {
    const cart = useSelector(selectCart);
    const [searchInput, setSearchInput] = React.useState("");
    const router = useRouter();
    const [isUserLogged, setIsUserLogged] = React.useState(false);
    const dispatch = useDispatch()


    const handleSearchChange = (e) => setSearchInput(e.target.value);

    useEffect(() => {
        setIsUserLogged(isAdminLogged())
    }, [])

    const submitSearch = (e) => {
        e.preventDefault();
        if (searchInput.length > 0) {
            router.push({pathname: "/search", query: {name: searchInput}})
                .then(() => {
                    dispatch(setPartialReq({name: searchInput}))
                })
        }
    }

    const numberCartStyle: CSSProperties = {
        fontSize:12,
        width: "20px",
        height: "20px",
        background: "var(--col-secondary)",
        padding: "3px",
        margin: "0",
        position:"absolute",
        top:36,
        right:14,
        justifyContent: "center",
        display: "flex",
        borderRadius: "50%",
        alignItems: "center"
    }

    return <>
        <nav className={styles.navbar + ` ${router.pathname.includes("admin") && styles.navbarAdmin}`}>
            <Link href={"/"}>
                <div style={{cursor: "pointer", position: "relative"}}>
                    <span className={styles.largeLogo}>
                        <Image src={largeLogo} width={170} alt={"logo"}
                               style={{marginTop: "-55px !important", marginLeft: "4px !important"}}
                               layout={"intrinsic"}
                               height={170}/>
                    </span>
                    <span  className={styles.smallLogo}>
                        <Image src={smallLogo} width={64} layout={"intrinsic"}
                               height={64} alt={"logo"}/>
                    </span>
                </div>
            </Link>
            <form onSubmit={submitSearch} style={{marginTop:8}}>
                <Input placeholder='Estoy buscando...' className={styles.input}>
                    <input value={searchInput} onChange={handleSearchChange}/>
                    <GButton type={ButtonType.PRIMARY} icon={"search"} />
                </Input>
            </form>
            <div className={styles.cartContainer}>
                <GButton icon={"cart"} onClick={() => dispatch(toggle())} size={"massive"} type={ButtonType.TRANSPARENT} className={styles.cartButton}>
                    { cart?.length > 0  && <div style={numberCartStyle}>{cart.length}</div>}
                </GButton>
            </div>
        </nav>
        {isUserLogged && !router.pathname.includes("admin") &&
            <Button icon circular size={"large"} color={"orange"} className={styles.configButton}
                    onClick={() => router.push({pathname: "/admin"})}><Icon name={"setting"}/></Button>}
    </>;
}