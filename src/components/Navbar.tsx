import styles from '../../styles/Home.module.css';
import {Button, Icon, Input} from "semantic-ui-react";
import {getConfig} from "../hooks/getConfig";
import React, {useEffect} from "react";
import {useRouter} from "next/router";
import Link from 'next/link';
import {isAdminLogged} from "../utils/loginUtils";
import {selectCart, toggle} from "../../slices/sidebarSlice";
import {useDispatch, useSelector} from "react-redux";
import {setPartialReq} from "../../slices/filterSlice";

// @ts-ignore
export default function Navbar() {
    const { companyName } = getConfig();
    const cart = useSelector(selectCart);
    const [searchInput, setSearchInput] = React.useState("");
    const router = useRouter();
    const [isUserLogged, setIsUserLogged] = React.useState(false);
    const dispatch = useDispatch()


    const handleSearchChange = (e) => setSearchInput(e.target.value);

    useEffect( () => {
        setIsUserLogged(isAdminLogged())
    }, [])

    const submitSearch = (e) => {
        e.preventDefault();
        router.push({pathname: "/search", query: { name: searchInput }})
            .then( () => {
                dispatch(setPartialReq({ name: searchInput }))
            })
    }

    return <>
        <nav className={styles.navbar + ` ${router.pathname.includes("admin") && styles.navbarAdmin}`}>
                <Link href={"/"}>
                    <div style={{cursor: "pointer"}}>
                        <img alt={""} src={""} className={styles.logo} />
                        <h3 className={styles.companyText}>{ companyName }</h3>
                    </div>
                </Link>
                <form onSubmit={submitSearch}>
                    <Input placeholder='Estoy buscando...' className={styles.input}>
                        <input value={searchInput} onChange={handleSearchChange}/>
                        <Button icon={"search"} color={"brown"}/>
                    </Input>
                </form>
                <div className={styles.cartContainer}>
                    <Button icon basic onClick={() => dispatch(toggle())}>
                        <Icon name='cart' size={"big"} />
                        <b>{cart.length > 0 && cart.length}</b>
                    </Button>
                </div>
            </nav>
        {isUserLogged && !router.pathname.includes("admin") && <Button icon circular size={"large"} color={"orange"} className={styles.configButton} onClick={() => router.push({pathname: "/admin"})}><Icon name={"setting"} /></Button>}
        </>;
}