import {FilterState, removeCategory, removeTalle} from "../../../slices/filterSlice";
import {Icon} from "semantic-ui-react";
import React from "react";
import {useDispatch} from "react-redux";
import GBadge, {GBadgeType} from "./GBadge";

function FilterBadge(props: { text: string, onDelete: Function, value: string}) {
    return <GBadge type={GBadgeType.BASIC} circular>{props.text} <a onClick={() => props.onDelete(props.value)}><Icon color={"black"} name={"delete"}/></a></GBadge>;
}

export default function FilterBadges(props: { filterState: FilterState}) {
    const dispatch = useDispatch();
    const handleCategoryDelete = (cat: string) => dispatch(removeCategory(cat));
    const handleTalleDelete = (t: string) => dispatch(removeTalle(t));

    return <div>
        {props.filterState.req.filter.categories.map(cat => <FilterBadge key={cat}  value={cat} text={cat} onDelete={ handleCategoryDelete } />)}
        {props.filterState.req.filter.talles.map(t => <FilterBadge key={t} value={t} text={"Talle " + t} onDelete={ handleTalleDelete } />)}
    </div>;
}