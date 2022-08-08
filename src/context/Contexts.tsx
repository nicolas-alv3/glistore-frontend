// @ts-ignore
import React from "react";
import {FilterState} from "../types";

// @ts-ignore
export const DialogContext = React.createContext<[boolean, (message, title) => void]>([false, null]);

// @ts-ignore
export const FilterStateContext = React.createContext<[FilterState, (f: FilterState) => void]>(null);
// @ts-ignore
export const SidebarContext = React.createContext<[boolean, Function]>(null);
// @ts-ignore
export const CartContext = React.createContext<[CartItem[], Function]>([]);

export default function Contexts({children}) {
    const [visible, setVisible] = React.useState(false);
    const [cart, setCart] = React.useState([]);
    const [dialogVisible, setDialogVisible] = React.useState(false);
    const [dialogMessage, setDialogMessage] = React.useState("");
    const [dialogTitle, setDialogTitle] = React.useState("");
    const [filterState, setFilterState] = React.useState<FilterState | null>(null);

    const setDialog = (message?: string, title?: string) => {
        setDialogVisible(!dialogVisible);
        setDialogMessage(message || "");
        setDialogTitle(title || "");
    }

    return <FilterStateContext.Provider value={[filterState, setFilterState]}>
        <DialogContext.Provider value={[dialogVisible, setDialog]}>
            <SidebarContext.Provider value={[visible, setVisible]}>
                <CartContext.Provider value={[cart, setCart]}>
                    {children}
                </CartContext.Provider>
            </SidebarContext.Provider>
        </DialogContext.Provider>
    </FilterStateContext.Provider>
}