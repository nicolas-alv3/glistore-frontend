import {Divider, Icon, Menu, Sidebar} from "semantic-ui-react";
import React, {useEffect} from "react";
import styles from '../../styles/Home.module.css';
import {hideNavMenu, selectShow} from "../../slices/navMenuSlice";
import {useDispatch, useSelector} from "react-redux";
import {getCartFromReload, saveCartOnReload} from "../utils/windowUtils";
import Link from "next/link";


export default function NavMenu() {
    const show = useSelector(selectShow);
    const dispatch = useDispatch();

    useEffect(() => {
        saveCartOnReload();
        getCartFromReload();
    }, [])

    const hideSidebar = () => dispatch(hideNavMenu())

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
        <div onClick={hideSidebar}>
            <Link href={"/"}>
                <div style={{display: "flex", justifyContent: "flex-start", gap: 8}}>
                    <Icon name={"home"}/>
                    <p>Home</p>
                </div>
            </Link>
            <Divider/>

            <Link href={"/admin/templates"}>
                <div style={{display: "flex", justifyContent: "flex-start", gap: 8}}>
                    <Icon name={"book"}/>
                    <p>Templates</p>
                </div>
            </Link>
            <Divider/>

            <Link href={"/admin"}>
                <div style={{display: "flex", justifyContent: "flex-start", gap: 8}}>
                    <Icon name={"configure"}/>
                    <p>Admin</p>
                </div>
            </Link>
            <Divider/>
        </div>
    </Sidebar>
}