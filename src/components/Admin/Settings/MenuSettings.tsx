import {GMenuItem} from "../../../types";
import {Segment} from "semantic-ui-react";
import GTitle, {GTitleSize} from "../../Utils/GTitle";
import React from "react";
import DropdownItemMenu from "../../Utils/DropdownItemMenu";
import ModalUtils from "../../../utils/ModalUtils";
import AddEditMenuPoint from "./AddEditMenuPoint";
import {userItems} from "../../NavMenu";

interface Props {
    menu: GMenuItem[],
    setMenu: (value: (((prevState: GMenuItem[]) => GMenuItem[]) | GMenuItem[])) => void
}

export default function MenuSettings(props: Props) {
    const handleEditConfirm = (index: number) => (item: Partial<GMenuItem>) => {
        const newItem: GMenuItem = {
            subItems: item.subItems || [],
            text: item.text as string,
            href: item.href,
        }
        props.setMenu(prevState => prevState.map((m, idx) => idx === index? newItem: m));
    }

    const handleEditItem = (item: GMenuItem, index: number) => () => {
        ModalUtils.openModal(<AddEditMenuPoint menuItem={item} onConfirm={handleEditConfirm(index)}/>)
    }

    const handleDeleteItem = (index: number) => () => {
        props.setMenu(prevState => prevState.filter((m, i) => index !== i ));
    }

    const handleAddClick = () => {
        ModalUtils.openModal(<AddEditMenuPoint onConfirm={handleAddConfirm}/>)
    }

    const handleAddConfirm = (item) => {
        props.setMenu(prevState => prevState.concat([{...item, }]))
    }

    return <Segment>
        <GTitle size={GTitleSize.MEDIUM} title={"Items de Menu"} withDivider/>
        <div style={{width: 300, border: "1px solid var(--col-lightgray)", borderRadius: 8, padding: 16}}>
            <div style={{cursor: "pointer"}}>
                {
                    userItems.map((i) =>
                        <DropdownItemMenu
                            item={i}
                            key={i.text}
                            hideSidebar={ () => {}}
                        />)
                }
                {
                    props.menu.map((i, index) =>
                        <DropdownItemMenu
                            item={i}
                            key={i.text}
                            hideSidebar={ () => {}}
                            onEdit={handleEditItem(i, index)}
                            onDelete={handleDeleteItem(index)}
                        />)
                }
                <DropdownItemMenu
                    item={{text: "Agregar item", subItems: [],onClick: handleAddClick, icon: "plus"}}
                    hideSidebar={ () => {}}
                />
            </div>
        </div>
    </Segment>;
}