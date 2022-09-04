import Navbar from "./Navbar";
import CartSidebar from "./CartSidebar";
import React from "react";
import NavMenu from "./NavMenu";

export default function PageHeader() {
    return <>
        <Navbar/>
        <CartSidebar/>
        <NavMenu/>
    </>
}