import React, {useEffect} from "react";
import {Dropdown} from "semantic-ui-react";
import {SortType} from "../../types";
import CategoryService from "../../../service/CategoryService";
import {DropdownItemProps} from "semantic-ui-react/dist/commonjs/modules/Dropdown/DropdownItem";

export enum SelectFilterType {
    SELECT_CATEGORY,
    SELECT_ORDER_PRICE,
    SELECT_ORDER_RECENT
}

interface Props {
    value: any,
    setValue: any,
    type: SelectFilterType,
    multiple: boolean
}

export default function SelectFilter( props: Props ) {
    const [searchQuery, setSearchQuery] = React.useState("");

    const [allCats, setAllCats] = React.useState<DropdownItemProps[]>([]);

    useEffect(() => {
        CategoryService.getCategories()
            .then( res => setAllCats(res.map(cat => ({ key: cat, value: cat, text: cat}))))
    }, [])

    const handleSearchChange = (e, { searchQuery }) => setSearchQuery( searchQuery );

    const handleQueryChange = (e, data) => {
        setSearchQuery(data.searchQuery);
        props.setValue(data.value);
    }

    const sortOptionsPrice = [{ key:SortType.HIGHEST_PRICE,value: SortType.HIGHEST_PRICE, text:"Más alto primero"}, { key:SortType.LOWEST_PRICE,value: SortType.LOWEST_PRICE, text:"Más bajo primero"}];

    const sortOptionsRecent = [{ key:SortType.NEWEST,value: SortType.NEWEST, text:"Más nuevos primero"}, { key:SortType.OLDEST,value: SortType.OLDEST, text:"Más antiguos primero"}];

    const getOptions = () => {
        const options = {
            [SelectFilterType.SELECT_ORDER_PRICE]: sortOptionsPrice,
            [SelectFilterType.SELECT_CATEGORY]: allCats,
            [SelectFilterType.SELECT_ORDER_RECENT]: sortOptionsRecent
        }
        return options[props.type];
    }
    return  <Dropdown
        fluid
        multiple={props.multiple}
        onChange={handleQueryChange}
        onSearchChange={handleSearchChange}
        options={getOptions()}
        placeholder='Seleccione una opción'
        search
        searchQuery={searchQuery}
        selection
        value={props.value}
    />;
}
