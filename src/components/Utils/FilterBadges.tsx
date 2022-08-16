import {FilterState, removeCategory, removeTalle} from "../../../slices/filterSlice";
import {Icon, Label, LabelGroup} from "semantic-ui-react";
import React from "react";
import {useDispatch} from "react-redux";

function FilterBadge(props: { text: string, onDelete: Function, value: string}) {
    return <Label circular>{props.text} <a onClick={() => props.onDelete(props.value)}><Icon name={"delete"}/></a></Label>;
}

export default function FilterBadges(props: { filterState: FilterState}) {
    const dispatch = useDispatch();
    const handleCategoryDelete = (cat: string) => dispatch(removeCategory(cat));
    const handleTalleDelete = (t: string) => dispatch(removeTalle(t));

    return <LabelGroup>
        {props.filterState.req.filter.categories.map(cat => <FilterBadge key={cat}  value={cat} text={cat} onDelete={ handleCategoryDelete } />)}
        {props.filterState.req.filter.talles.map(t => <FilterBadge key={t} value={t} text={"Talle " + t} onDelete={ handleTalleDelete } />)}
    </LabelGroup>;
}