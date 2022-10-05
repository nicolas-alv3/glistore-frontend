import React, {ReactNode} from 'react'
import {Container, Menu} from 'semantic-ui-react'

export interface MenuTabItem {
    title: string,
    component: ReactNode
}

export interface Props {
    tabs: MenuTabItem[]
}

export default function MenuTabs(props: Props) {
    const [activeItem, setActiveItem] = React.useState(props.tabs[0]);

    return (<>
            <Menu tabular>
                {
                    props.tabs.map(t => <Menu.Item
                        key={t.title}
                        name={t.title}
                        active={activeItem.title === t.title}
                        onClick={() => setActiveItem(t)}
                    />)
                }
            </Menu>
            <Container>
                {activeItem.component}
            </Container>
        </>
    )
}