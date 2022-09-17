import {Icon} from "semantic-ui-react";
import React from "react";
import GBadge, {GBadgeType} from "./GBadge";
import {SearchRequest} from "../../types";
import {useGRouter} from "../../hooks/useGRouter";

export function FilterBadge(props: { text: string, onDelete?: Function, value: string }) {
    const handleDelete = () => {
        if (props.onDelete) {
            props.onDelete();
        }
    }
    return <GBadge type={GBadgeType.BASIC} circular>{props.text}
        <a onClick={handleDelete}>
            {props.onDelete && <Icon color={"black"} name={"delete"}/>}
        </a>
    </GBadge>;
}

export default function FilterBadges(props: { req: SearchRequest }) {
    const {removeCategory} = useGRouter();
    const handleCategoryDelete = (cat: string) => removeCategory(cat);

    return <div>
        {props.req.filter.categories.map(cat => <FilterBadge key={cat} value={cat} text={cat}
                                                             onDelete={handleCategoryDelete}/>)}
    </div>;
}