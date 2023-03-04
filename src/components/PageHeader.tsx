import Navbar from "./Navbar";
import CartSidebar from "./CartSidebar";
import React, {useEffect} from "react";
import NavMenu from "./NavMenu";
import {useDispatch} from "react-redux";
import {setUsername} from "../../slices/storeSlice";

export default function PageHeader() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setUsername(window.location.pathname));
    }, [])
    return <>
        <Navbar/>
        <CartSidebar/>
        <NavMenu/>
    </>
}
