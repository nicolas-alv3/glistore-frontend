import React from "react";
import GTitle, {GTitleSize} from "../../src/components/Utils/GTitle";
import MenuTabs from "../../src/components/Utils/MenuTabs";
import ProductsAdmin from "../../src/components/Admin/AdminPanel/Products/ProductsAdmin";
import Templates from "../../src/components/Admin/AdminPanel/Templates/Templates";

export default function AdminPanel() {
    const tabs = [
        {title: "Productos", component: <ProductsAdmin/>},
        {title: "Formatos", component: <Templates/>}
    ]
    return <>
        <GTitle size={GTitleSize.MEDIUM} title={"Administración"}/>
        <MenuTabs tabs={tabs}/>
        </>
}