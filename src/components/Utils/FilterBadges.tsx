import {Icon} from "semantic-ui-react";
import React from "react";
import GBadge, {GBadgeType} from "./GBadge";
import {SearchRequest} from "../../types";
import {useGRouter} from "../../hooks/useGRouter";

function FilterBadge(props: { text: string, onDelete: Function, value: string}) {
    return <GBadge type={GBadgeType.BASIC} circular>{props.text} <a onClick={() => props.onDelete(props.value)}><Icon color={"black"} name={"delete"}/></a></GBadge>;
}

export default function FilterBadges(props: { req: SearchRequest}) {
    const { removeTalle, removeCategory } = useGRouter();
    const handleCategoryDelete = (cat: string) => removeCategory(cat);
    const handleTalleDelete = (t: string) => removeTalle(t);

    return <div>
        {props.req.filter.categories.map(cat => <FilterBadge key={cat}  value={cat} text={cat} onDelete={ handleCategoryDelete } />)}
        {props.req.filter.talles.map(t => <FilterBadge key={t} value={t} text={"Talle " + t} onDelete={ handleTalleDelete } />)}
    </div>;
}