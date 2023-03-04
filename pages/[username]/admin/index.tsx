import React, {useEffect} from "react";
import GTitle, {GTitleSize} from "../../../src/components/Utils/GTitle";
import MenuTabs from "../../../src/components/Utils/MenuTabs";
import ProductsAdmin from "../../../src/components/Admin/AdminPanel/Products/ProductsAdmin";
import Templates from "../../../src/components/Admin/AdminPanel/Templates/Templates";
import Categories from "../../../src/components/Admin/AdminPanel/Categories/Categories";
import {useUser, withPageAuthRequired} from "@auth0/nextjs-auth0";
import {useDispatch} from "react-redux";
import {setUserEmail} from "../../../slices/storeSlice";

function AdminPanel() {
    const dispatch = useDispatch();
    const tabs = [
        {title: "Productos", component: <ProductsAdmin/>},
        {title: "Formatos", component: <Templates/>},
        {title: "Categorías", component: <Categories/>}
    ]
    const {user} = useUser();
    useEffect(() => {
        dispatch(setUserEmail(user?.email as string))
    }, [user?.email])
    return <>
        <GTitle size={GTitleSize.MEDIUM} title={"Administración"}/>
        <MenuTabs tabs={tabs}/>
    </>
}

export default withPageAuthRequired(AdminPanel)
