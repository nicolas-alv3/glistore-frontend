import {Menu, SemanticICONS, Sidebar} from "semantic-ui-react";
import React, {useEffect} from "react";
import styles from '../../styles/Home.module.css';
import {hideNavMenu, selectShow} from "../../slices/navMenuSlice";
import {useDispatch, useSelector} from "react-redux";
import {getCartFromReload, saveCartOnReload} from "../utils/windowUtils";
import DropdownItemMenu from "./Utils/DropdownItemMenu";
import {useRouter} from "next/router";

export interface MenuItem {
    href?: string,
    onClick?: () => void,
    icon?: SemanticICONS,
    text: string,
    subItems?: MenuItem[]
}

const adminItems: MenuItem[] = [
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

const userItems: MenuItem[] = [
    {
        href: "/",
        icon: "home",
        text: "Home"
    },
    {
        onClick: () => console.log("Ahre"),
        icon: "search",
        text: "Buscar"
    },
    {
        href: "/admin",
        icon: "options",
        text: "Categorias",
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


export default function NavMenu() {
    const show = useSelector(selectShow);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        saveCartOnReload();
        getCartFromReload();
    }, []);

    const hideSidebar = () => dispatch(hideNavMenu());

    const getItems = () => {
        if(router.pathname.includes("admin")){
            return adminItems;
        }
        else return userItems;
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