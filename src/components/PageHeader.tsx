import Navbar from "./Navbar";
import CartSidebar from "./CartSidebar";
import React from "react";
import {SidebarContext} from "../context/Contexts";

export default function PageHeader() {
    const [visible, setVisible] = React.useContext(SidebarContext);

    return <>
        <Navbar setVisible={setVisible} />
        <CartSidebar visible={visible} setVisible={setVisible}/>
    </>
}