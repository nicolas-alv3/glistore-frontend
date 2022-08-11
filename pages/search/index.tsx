import React, {useEffect} from "react";
import ProductList from "../../src/components/ProductList";
import SearchService from "../../service/SearchService";
import {Product, SearchRequest, SearchResponse} from "../../src/types";
import SortOrFilter from "../../src/components/SortAndFilter/SortOrFilter";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {selectFilterState, setPartialReq} from "../../slices/filterSlice";
import { parse } from "../../src/utils/parseUtils";
import FilterBadges from "../../src/components/Utils/FilterBadges";



export default function SearchProducts() {
    const [products, setProducts] = React.useState<Product[]>([]);
    const router = useRouter();
    const filterState = useSelector(selectFilterState);
    const dispatch = useDispatch();

    useEffect( () => {
        if(router.isReady && filterState.req.name) {
            getProducts();        }
    }, [filterState.req])


    useEffect( () => {
        if(router.isReady) {
            const name = router.query.name as string;
            const talles = parse(router.query.talles);
            const categories = parse(router.query.categories);
            const partialReq :Partial<SearchRequest> = {
                name,
                filter: {
                    talles: talles || filterState.req.filter.talles,
                    categories: categories || filterState.req.filter.categories
                }
            }
            dispatch(setPartialReq(partialReq));
        }
    }, [router.isReady])

    const getProducts = () => {
        SearchService.search(filterState.req).then( (res: SearchResponse) => {
            setProducts(res.products);
        })
    }

    setTimeout( () => {
        // @ts-ignore
        document.getElementById(filterState?.lastVisitedId)?.scrollIntoView();
    }, 600)

    return <div>
        <SortOrFilter/>
        <ProductList title={`Resultados para "${filterState.req.name}"`} products={products} withBackButton belowTitle={<FilterBadges filterState={ filterState } />}/>
    </div>
}