import React from "react";
import {SortType} from "../../types";
import {Button, Container, Header, Icon, Menu, Segment, Sidebar} from "semantic-ui-react";
import TallesFilter from "./TallesFilter";
import SelectFilter, {SelectFilterType} from "./SelectFilter";
import FilterBadges from "../Utils/FilterBadges";
import GButton, {ButtonType} from "../Utils/GButton";
import styles from '../../../styles/Home.module.css';
import {useGRouter} from "../../hooks/useGRouter";

export default function SortOrFilter() {
    const [visible, setVisible] = React.useState(false);
    const [categories, setCategories] = React.useState([]);
    const [filter, setFilter] = React.useState(false);
    const [sort, setSort] = React.useState(SortType.NONE);
    const [activeItems, setActiveItems] = React.useState<string[]>([]);
    const {resetFilter, navigate, getReq} = useGRouter();


    const [talles, setTalles] = React.useState([]);

    const filterItems = [
        {
            name: "Talle",
            children: <TallesFilter onChange={setTalles}/>
        },
        {
            name: "Categoría",
            children: <SelectFilter value={categories} setValue={setCategories} type={SelectFilterType.SELECT_CATEGORY}
                                    multiple={true}/>
        }
    ]

    const sortItems = [
        {
            name: "Por precio",
            children: <SelectFilter value={sort} setValue={setSort} type={SelectFilterType.SELECT_ORDER}
                                    multiple={false}/>
        }
    ]

    const show = (isFilter: boolean) => () => {
        setFilter(isFilter);
        setVisible(true);
    }

    const apply = () => {
        navigate((req) => {
            return ({
                filter: {
                    ...req.filter,
                    talles: talles,
                    categories: categories,
                },
            })
        })
        setVisible(false);
    }

    const items = filter ? filterItems : sortItems;

    const someFilterIsApplied = getReq().filter.talles.length > 0 || getReq().filter.categories.length > 0

    const cleanFilters = () => {
        resetFilter();
        setCategories([]);
        setActiveItems([]);
        setTalles([]);
        setSort(SortType.NONE);
    }

    return <div style={{marginBottom: 16}}>
        <Button.Group fluid basic color={"brown"}>
            <Button onClick={show(false)}><Icon name={"sort"}/> Ordenar </Button>
            <Button onClick={show(true)}><Icon name={"filter"}/>Filtrar</Button>
        </Button.Group>
        <div style={{display: "flex", justifyContent: "space-between", marginTop: 8}}>
            <div style={{width: "60%"}}>
                <FilterBadges req={getReq()}/>
            </div>
            {someFilterIsApplied &&
                <GButton icon={"delete"} size={"small"} type={ButtonType.TERTIARY} className={styles.cleanFilterButton}
                         circular onClick={cleanFilters}>Limpiar filtros</GButton>}
        </div>
        <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            onHide={() => setVisible(false)}
            vertical
            direction={"bottom"}
            visible={visible}
        >
            <Container>
                <Segment>
                    <Header>{filter ? "Filtrar" : "Ordenar"} por</Header>
                    {items.map((i) => <Menu.Item key={i.name}
                                                 onClick={() => setActiveItems(activeItems.concat([i.name]))}>
                        <Header>{i.name}</Header>
                        {i.children}
                    </Menu.Item>)}
                    <Button onClick={apply} color={"brown"} fluid content={"Aplicar"}/>
                </Segment>
            </Container>
        </Sidebar>
    </div>;
}
