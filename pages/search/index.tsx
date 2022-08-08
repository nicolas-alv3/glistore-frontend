import React, {useEffect} from "react";
import {Divider, Header} from "semantic-ui-react";
import ProductList from "../../src/components/ProductList";
import SearchService from "../../service/SearchService";
import {Product, SearchRequest, SearchResponse} from "../../src/types";
import SortOrFilter from "../../src/components/SortAndFilter/SortOrFilter";
import {useRouter} from "next/router";
import {parse} from "../../src/utils/parseUtils";
import {FilterStateContext} from "../_app";

export default function SearchProducts() {
    const [products, setProducts] = React.useState<Product[]>([]);
    const router = useRouter();
    const searchInput = router.query.searchInput as string;
    const [filterState, setFilterState] = React.useContext(FilterStateContext);
    const baseReq = filterState?.req || {
        name: searchInput,
        pageSize:10,
        page:1,
        filter: {
            talles: parse(router.query.talles) || [],
            categories: parse(router.query.categories) || []
        },
        sort: {
            price: "NONE"
        }
    }
    const [req, setReq] = React.useState(baseReq);

    useEffect(() => {

    },[])


    useEffect( () => {
        setFilterState( { lastVisitedId:"", req} )
        SearchService.search(req).then( (res: SearchResponse) => {
            setProducts(res.products);
        })
    }, [req])

    const getProducts = (searchRequest: Partial<SearchRequest>) => {
        // @ts-ignore
        const sReq: SearchRequest = {
            ...searchRequest,
            name: searchInput,
            pageSize:10,
            page:1,
        }
        setReq(sReq);
    }

    setTimeout( () => {
        // @ts-ignore
        document.getElementById(filterState?.lastVisitedId)?.scrollIntoView();
    }, 600)

    return <div>
        <SortOrFilter products={products} updateProducts={getProducts}/>
        <ProductList title={`Resultados para "${searchInput}"`} products={products} withBackButton/>
    </div>
}