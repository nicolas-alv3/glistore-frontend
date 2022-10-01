import {Menu, Sidebar} from "semantic-ui-react";
import React, {useEffect} from "react";
import styles from '../../styles/Home.module.css';
import {hideNavMenu, selectShow} from "../../slices/navMenuSlice";
import {useDispatch, useSelector} from "react-redux";
import {getCartFromReload, saveCartOnReload} from "../utils/windowUtils";
import {useRouter} from "next/router";
import {GMenuItem} from "../types";
import DropdownItemMenu from "./Utils/DropdownItemMenu";
import {useConfig} from "../hooks/useConfig";

const adminItems: GMenuItem[] = [
    {
        href: "/",
        icon: "home",
        text: "Ir a la tienda"
    },
    {
        href: "/admin/templates",
        icon: "book",
        text: "Formatos"
    },
    {
        href: "/admin",
        icon: "options",
        text: "Productos",
        subItems: [
            {
                href: "/admin", text: "Sub category",icon:"list"
            }
        ]
    },
    {
        href: "/admin/settings",
        icon: "settings",
        text: "Ajustes"
    }
]

export const userItems: GMenuItem[] = [
    {
        href: "/",
        icon: "home",
        text: "Home"
    },
    {
        onClick: () => console.log("Show search input"),
        icon: "search",
        text: "Buscar"
    }
]


export default function NavMenu() {
    const show = useSelector(selectShow);
    const dispatch = useDispatch();
    const router = useRouter();
    const {config} = useConfig();

    useEffect(() => {
        saveCartOnReload();
        getCartFromReload();
    }, []);

    const hideSidebar = () => dispatch(hideNavMenu());

    const getItems = () => {
        if(router.pathname.includes("admin")){
            return adminItems;
        }
        else return userItems.concat(config.menu);
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
        <div style={{cursor: "pointer"}}>
            {
                getItems().map(i => <DropdownItemMenu item={i} key={i.text} hideSidebar={hideSidebar}/>)
            }
        </div>
    </Sidebar>
}