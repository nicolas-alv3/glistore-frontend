import styles from '../styles/Home.module.css';
import {Button, Header, Icon, Input} from "semantic-ui-react";
import {useConfig} from "../hooks/useConfig";
import React from "react";
import {CartContext} from "../pages/_app";
import {useRouter} from "next/router";
import Link from 'next/link';

// @ts-ignore
export default function Navbar( { setVisible }) {
    const { companyName } = useConfig();
    const [cart] = React.useContext(CartContext);
    const [searchInput, setSearchInput] = React.useState("");
    const router = useRouter();

    const handleSearchChange = (e) => setSearchInput(e.target.value);


    const submitSearch = (e) => {
        e.preventDefault();
        router.push({pathname: "/search", query: { searchInput }})
    }

    const toggleSidebar = () => setVisible( (prevState: any) => !prevState)
    return <nav className={styles.navbar}>
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
                    <Button basic onClick={toggleSidebar}>
                        <Icon name='cart' size={"big"} />
                        <b>{cart.length > 0 && cart.length}</b>
                    </Button>
                </div>
            </nav>;
}