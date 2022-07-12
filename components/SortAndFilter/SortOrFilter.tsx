import React from "react";
import {Product, SearchRequest} from "../../types";
import { Button, Container, Header, Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import TallesFilter from "./TallesFilter";
import SelectFilter from "./SelectFilter";

export enum SortType {
    NONE= "NONE",
    HIGHER= "HIGHER",
    LOWER= "LOWER"
}

export default function SortOrFilter( { products, updateProducts }) {
    const [visible, setVisible] = React.useState(false);
    const [categories, setCategories] = React.useState([]);
    const [filter, setFilter] = React.useState(false);
    const [sort, setSort] = React.useState(SortType.NONE);
    const [activeItems, setActiveItems] = React.useState<string[]>([]);
    const getTalles: () => string[] = () => Array.from(new Set(products?.reduce( (acc: string[], p:Product) => acc.concat(p.talles),[])))

    const [values, setValues] = React.useState(new Array(20).fill(null));

    const categoryOptions = [
        { key:"NEW BORN",value: "NEW BORN", text:"New born"},
        { key:"Kid",value: "Kid", text:"Kid"},
        { key:"Baby",value: "Baby", text:"Baby"},
        { key:"Accesorios",value: "Accesorios", text:"Accesorios"},
    ];
    const sortOptions = [{ key:SortType.HIGHER,value: SortType.HIGHER, text:"Más alto primero"}, { key:SortType.LOWER,value: SortType.LOWER, text:"Más bajo primero"}];

    const filterItems = [
        { name: "Talle", children: <TallesFilter talles={getTalles()} values={values} setValues={setValues} />},
        { name: "Categoría", children: <SelectFilter value={categories} setValue={setCategories} options={categoryOptions} multiple={true}/>}
    ]

    const sortItems = [
        { name: "Por precio", children: <SelectFilter value={sort} setValue={setSort} options={sortOptions} multiple={false} />}
    ]

    const show = (isFilter: boolean) => () => {
        setFilter(isFilter);
        setVisible(true);
    }

    const apply = () => {
        const sReq: Partial<SearchRequest> = {
            filter: {
                talles: getTalles().filter( (t, i) => values[i]),
                categories: categories
            },
            sort: {
                price: sort
            }
        }
        updateProducts(sReq);
        setVisible(false);
    }

    const items = filter? filterItems: sortItems;

    return <>
    <Button.Group fluid basic color={"brown"} >
        <Button onClick={ show(false) }><Icon name={"sort"}/> Ordenar </Button>
        <Button onClick={ show(true) }><Icon name={"filter"}/>Filtrar</Button>
    </Button.Group>
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
                    {items.map( (i,idx) => <Menu.Item key={i.name} onClick={() => setActiveItems(activeItems.concat([i.name]))}>
                            <Header>{i.name}</Header>
                            {i.children}
                    </Menu.Item>)}
                <Button onClick={apply} color={"brown"} fluid content={"Aplicar"} />
            </Segment>
        </Container>
    </Sidebar>
</>;
}
