import {MenuItem} from "../NavMenu";
import {Divider, Icon} from "semantic-ui-react";
import React, {CSSProperties} from "react";
import {useRouter} from "next/router";

interface Props {
    item: MenuItem,
    hideSidebar: () => void,
    marginLeft?: number
}

export default function DropdownItemMenu (props: Props) {
    const [toggle, setToggle] = React.useState(false);
    const router = useRouter();

    const itemStyle: CSSProperties = {display: "flex", justifyContent: "flex-start", gap: 8, padding: "16px 0", height: "50px", transition: "all ease 1s", marginLeft: props.marginLeft || 0};

    const handleItemClick = () => {
        if(props.item.subItems) {
            setToggle(prevState => !prevState);
        } else {
            props.item.href ? router.push(props.item.href).then(props.hideSidebar) : props.item.onClick && props.item.onClick();
        }
    }
    return <>
            <div style={itemStyle} onClick={handleItemClick}>
                <Icon name={props.item.icon}/>
                <p>{props.item.text}</p>
                {
                    props.item.subItems &&
                    <div style={{marginLeft: "auto", marginRight: "8px"}}>
                        <Icon name={"chevron down"}/>
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
