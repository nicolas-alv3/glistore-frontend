import React from "react";
import {FilterState} from "../types";

// @ts-ignore
export const FilterStateContext = React.createContext<[FilterState, (f: FilterState) => void]>(null);
export default function Contexts({children}) {
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
                    {children}
    </FilterStateContext.Provider>
}