import {Divider, Input, Menu, Sidebar} from "semantic-ui-react";
import React, {useEffect} from "react";
import styles from '../../styles/Home.module.css';
import {hideNavMenu, selectShow} from "../../slices/navMenuSlice";
import {useDispatch, useSelector} from "react-redux";
import {getCartFromReload, saveCartOnReload} from "../utils/windowUtils";
import {useRouter} from "next/router";
import {GMenuItem} from "../types";
import DropdownItemMenu from "./Utils/DropdownItemMenu";
import {useConfig} from "../hooks/useConfig";
import {selectStore} from "../../slices/storeSlice";

export default function NavMenu() {
    const show = useSelector(selectShow);
    const {username} = useSelector(selectStore);
    const dispatch = useDispatch();
    const router = useRouter();
    const {config} = useConfig();
    const [searchInput, setSearchInput] = React.useState("");


    useEffect(() => {
        saveCartOnReload();
        getCartFromReload();
    }, []);

    const userItems: GMenuItem[] = [
        {
            href: `/${username}`,
            icon: "home",
            text: "Home"
        }
    ]

    const adminItems: GMenuItem[] = [
        {
            href: `/${username}`,
            icon: "home",
            text: "Ir a la tienda"
        },
        {
            href: `/${username}/admin`,
            icon: "options",
            text: "Administración",
        },
        {
            href: `/${username}/admin/settings`,
            icon: "settings",
            text: "Ajustes"
        }
    ]

    const hideSidebar = () => dispatch(hideNavMenu());

    const getItems = () => {
        if (router.pathname.includes("admin")) {
            return adminItems;
        } else return userItems.concat(config.menu);
    }

    const handleSearchChange = (e) => setSearchInput(e.target.value);

    const submitSearch = (e) => {
        e.preventDefault();
        if (searchInput.length > 0) {
            router.push({pathname: `${router.asPath}/search`, query: {name: searchInput}})
            hideSidebar();
        }
    }

    return <Sidebar
        as={Menu}
        animation='push'
        icon='labeled'
        width={"very thin"}
        className={styles.navMenu}
        direction={"left"}
        onHide={hideSidebar}
        vertical
        visible={show}
    >
        <form onSubmit={submitSearch} style={{margin: "8px 0"}}>
            <Input fluid size='small' icon='search' placeholder='¿Que estas buscando?' onChange={handleSearchChange}/>
        </form>
        <div style={{cursor: "pointer"}}>
            {
                getItems().map(i => <DropdownItemMenu item={i} key={i.text} hideSidebar={hideSidebar}/>)
            }
            <Divider fitted/>
        </div>
    </Sidebar>
}
