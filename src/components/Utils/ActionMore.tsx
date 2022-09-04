import {Dropdown, Icon, SemanticICONS} from "semantic-ui-react";
import GButton, {ButtonType} from "./GButton";

export interface ActionOption {
    icon: SemanticICONS,
    text: string,
    onClick: (e: any) => void
}

interface Props {
    options: ActionOption[]
}


export default function ActionMore(props: Props) {
    return <>
        {
            props.options.length > 2 ?
                <Dropdown direction={"left"} icon={"ellipsis vertical"} item={false}>
                    <Dropdown.Menu className='left'>
                        {
                            props.options.map(o => <Dropdown.Item key={o.text} onClick={o.onClick}>
                                <Icon name={o.icon}/>
                                <span>{o.text}</span>
                            </Dropdown.Item>)
                        }
                    </Dropdown.Menu>
                </Dropdown>
                :
                props.options.map(o => <GButton type={o.icon === "delete" ? ButtonType.DANGER : ButtonType.PRIMARY_BASIC} onClick={o.onClick} icon={o.icon} key={o.text}/> )
        }
        </>
}