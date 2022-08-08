import React from "react";
import {Dropdown} from "semantic-ui-react";
import {SortType} from "./SortOrFilter";

export enum SelectFilterType {
    SELECT_CATEGORY,
    SELECT_ORDER
}

interface Props {
    value: any,
    setValue: any,
    type: SelectFilterType,
    multiple: boolean
}

export default function SelectFilter( props: Props ) {
    const [searchQuery, setSearchQuery] = React.useState("");

    const handleSearchChange = (e, { searchQuery }) => setSearchQuery( searchQuery );

    const handleQueryChange = (e, data) => {
        setSearchQuery(data.searchQuery);
        props.setValue(data.value);
    }

    const sortOptions = [{ key:SortType.HIGHER,value: SortType.HIGHER, text:"Más alto primero"}, { key:SortType.LOWER,value: SortType.LOWER, text:"Más bajo primero"}];

    const options = props.type === SelectFilterType.SELECT_ORDER ? sortOptions : [
        { key:"NEW BORN",value: "NEW BORN", text:"New born"},
        { key:"Kid",value: "Kid", text:"Kid"},
        { key:"Baby",value: "Baby", text:"Baby"},
        { key:"Accesorios",value: "Accesorios", text:"Accesorios"},
    ];
    return  <Dropdown
        fluid
        multiple={props.multiple}
        onChange={handleQueryChange}
        onSearchChange={handleSearchChange}
        options={options}
        placeholder='Seleccione una opción'
        search
        searchQuery={searchQuery}
        selection
        value={props.value}
    />;
}