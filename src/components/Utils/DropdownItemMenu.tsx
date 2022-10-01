import {Divider, Icon} from "semantic-ui-react";
import React, {CSSProperties} from "react";
import {useRouter} from "next/router";
import {GMenuItem} from "../../types";
import ActionMore, {ActionOption} from "./ActionMore";

interface Props {
    item: GMenuItem,
    hideSidebar: () => void,
    marginLeft?: number
    onEdit? : () => void
    onDelete? : () => void
}

export default function DropdownItemMenu (props: Props) {
    const [toggle, setToggle] = React.useState(false);
    const router = useRouter();

    const hasSubItems = () => props.item.subItems && props.item.subItems?.length > 0;

    const itemStyle: CSSProperties = {display: "flex", justifyContent: "flex-start", gap: 8, padding: "16px 0", height: "50px", transition: "all ease 1s", marginLeft: props.marginLeft || 0};

    const handleItemClick = () => {
        if(hasSubItems()) {
            setToggle(prevState => !prevState);
        } else {
            props.item.href ? router.push(props.item.href).then(props.hideSidebar) : props.item.onClick && props.item.onClick();
        }
    }

    const handleEdition = () => {
        props.onEdit && props.onEdit();
    }

    const handleDelete = () => {
        props.onDelete && props.onDelete();
    }

    const options: ActionOption[] = [
        { onClick: () => handleEdition(), text: "Editar", icon: "pencil" },
        { onClick: () => handleDelete(), text: "Eliminar", icon: "delete" },
    ]

    const getIcon = () => hasSubItems() ? "chevron right" : "minus"
    return <>
            <div style={itemStyle} onClick={handleItemClick}>
                <Icon name={props.item.icon || getIcon()}/>
                <p>{props.item.text}</p>
                { props.onEdit && props.onDelete &&
                    <div style={{marginLeft: "auto", cursor: "pointer"}} onClick={handleEdition}>
                        <ActionMore options={options} dropdown />
                    </div>
                }
            </div>
        {
            toggle &&
            props.item.subItems?.map( si => <DropdownItemMenu item={si} marginLeft={(props.marginLeft || 0) + 16} hideSidebar={props.hideSidebar} key={si.text} />)
        }
        <Divider fitted/>
    </>
}
