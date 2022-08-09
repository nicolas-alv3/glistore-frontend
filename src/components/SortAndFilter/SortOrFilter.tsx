import React from "react";
import {Product, SearchRequest, SortType} from "../../types";
import {Button, Container, Header, Icon, Menu, Segment, Sidebar} from "semantic-ui-react";
import TallesFilter from "./TallesFilter";
import SelectFilter, {SelectFilterType} from "./SelectFilter";
import {useDispatch} from "react-redux";
import {setPartialReq} from "../../../slices/filterSlice";
import ProductService from "../../../service/ProductService";

export default function SortOrFilter() {
    const [visible, setVisible] = React.useState(false);
    const [categories, setCategories] = React.useState([]);
    const [filter, setFilter] = React.useState(false);
    const [sort, setSort] = React.useState(SortType.NONE);
    const [activeItems, setActiveItems] = React.useState<string[]>([]);
    const dispatch = useDispatch();

    const [values, setValues] = React.useState(new Array(20).fill(null));

    const filterItems = [
        { name: "Talle", children: <TallesFilter talles={ProductService.getTalles()} values={values} setValues={setValues} />},
        { name: "Categoría", children: <SelectFilter value={categories} setValue={setCategories} type={SelectFilterType.SELECT_CATEGORY} multiple={true}/>}
    ]

    const sortItems = [
        { name: "Por precio", children: <SelectFilter value={sort} setValue={setSort} type={SelectFilterType.SELECT_ORDER} multiple={false} />}
    ]

    const show = (isFilter: boolean) => () => {
        setFilter(isFilter);
        setVisible(true);
    }

    const apply = () => {
        const sReq: Partial<SearchRequest> = {
            filter: {
                talles: ProductService.getTalles().filter( (t, i) => values[i]),
                categories: categories
            },
            sort: {
                price: sort
            }
        }
        dispatch(setPartialReq(sReq))
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
