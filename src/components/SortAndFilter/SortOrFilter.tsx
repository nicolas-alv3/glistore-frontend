import React from "react";
import {SortType} from "../../types";
import {Button, Container, Icon, Menu, Segment, Sidebar} from "semantic-ui-react";
import SelectFilter, {SelectFilterType} from "./SelectFilter";
import FilterBadges from "../Utils/FilterBadges";
import GButton, {ButtonType} from "../Utils/GButton";
import styles from '../../../styles/Home.module.css';
import {useGRouter} from "../../hooks/useGRouter";
import GTitle, {GTitleSize} from "../Utils/GTitle";

export default function SortOrFilter() {
    const [visible, setVisible] = React.useState(false);
    const [categories, setCategories] = React.useState([]);
    const [filter, setFilter] = React.useState(false);
    const [sortPrice, setSortPrice] = React.useState(SortType.LOWEST_PRICE);
    const [sortRecent, setSortRecent] = React.useState(SortType.OLDEST);
    const [activeItems, setActiveItems] = React.useState<string[]>([]);
    const {resetFilter, navigate, getReq} = useGRouter();


    const filterItems = [
        {
            name: "Categoría",
            children: <SelectFilter value={categories} setValue={setCategories} type={SelectFilterType.SELECT_CATEGORY}
                                    multiple={true}/>
        }
    ]

    const sortItems = [
        {
            name: "Por precio",
            children: <SelectFilter value={sortPrice} setValue={setSortPrice} type={SelectFilterType.SELECT_ORDER_PRICE}
                                    multiple={false}/>
        },
        {
            name: "Recientes",
            children: <SelectFilter value={sortRecent} setValue={setSortRecent} type={SelectFilterType.SELECT_ORDER_RECENT}
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
                    categories: categories,
                },
                sort: {
                    ...req.sort,
                    date: sortRecent,
                    price: sortPrice
                }
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
        setSortPrice(SortType.NONE);
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
                    <GTitle centered size={GTitleSize.MEDIUM}>{filter ? "Filtrar" : "Ordenar"} por</GTitle>
                    {items.map((i) => <Menu.Item key={i.name}
                                                 onClick={() => setActiveItems(activeItems.concat([i.name]))}>
                        <GTitle centered size={GTitleSize.SMALL}>{i.name}</GTitle>
                        {i.children}
                    </Menu.Item>)}
                    <Button onClick={apply} color={"brown"} fluid content={"Aplicar"}/>
                </Segment>
            </Container>
        </Sidebar>
    </div>;
}
