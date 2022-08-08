import styles from '../../styles/Home.module.css';
import {Button, Header, Icon, Input} from "semantic-ui-react";
import {getConfig} from "../hooks/getConfig";
import React, {useEffect} from "react";
import {useRouter} from "next/router";
import Link from 'next/link';
import {isAdminLogged} from "../utils/loginUtils";
import {CartContext} from "../context/Contexts";

// @ts-ignore
export default function Navbar( { setVisible }) {
    const { companyName } = getConfig();
    const [cart] = React.useContext(CartContext);
    const [searchInput, setSearchInput] = React.useState("");
    const router = useRouter();
    const [isUserLogged, setIsUserLogged] = React.useState(false);

    const handleSearchChange = (e) => setSearchInput(e.target.value);

    useEffect( () => {
        setIsUserLogged(isAdminLogged())
    }, [])

    const submitSearch = (e) => {
        e.preventDefault();
        router.push({pathname: "/search", query: { searchInput }})
            .then( () => {
                if(router.pathname.includes("search")) {
                    router.reload();
                }
            })
    }

    const toggleSidebar = () => setVisible( (prevState: any) => !prevState)
    return <>
        <nav className={styles.navbar + ` ${router.pathname.includes("admin") && styles.navbarAdmin}`}>
                <Link href={"/"}>
                    <div style={{cursor: "pointer"}}>
                        <img className={styles.logo} />
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
                    <Button icon basic onClick={toggleSidebar}>
                        <Icon name='cart' size={"big"} />
                        <b>{cart.length > 0 && cart.length}</b>
                    </Button>
                </div>
            </nav>
        {isUserLogged && !router.pathname.includes("admin") && <Button icon circular size={"large"} color={"orange"} className={styles.configButton} onClick={() => router.push({pathname: "/admin"})}><Icon name={"setting"} /></Button>}
        </>;
}