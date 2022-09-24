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

    const hideSidebar = () => dispatch(hideNavMenu());

    const itemStyle = {display: "flex", justifyContent: "flex-start", gap: 8, padding: "16px 0"};

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
        <div onClick={hideSidebar} style={{cursor: "pointer"}}>
            <Link href={"/"}>
                <div style={itemStyle}>
                    <Icon name={"home"}/>
                    <p>Home</p>
                </div>
            </Link>
            <Divider fitted/>

            <Link href={"/admin/templates"}>
                <div style={itemStyle}>
                    <Icon name={"book"}/>
                    <p>Formatos</p>
                </div>
            </Link>
            <Divider fitted/>

            <Link href={"/admin"}>
                <div style={itemStyle}>
                    <Icon name={"user"}/>
                    <p>Admin</p>
                </div>
            </Link>
            <Divider fitted/>

            <Link href={"/admin/settings"}>
                <div style={itemStyle}>
                    <Icon name={"setting"}/>
                    <p>Ajustes</p>
                </div>
            </Link>
            <Divider fitted/>
        </div>
    </Sidebar>
}