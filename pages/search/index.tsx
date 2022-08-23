import React, {useEffect} from "react";
import ProductList from "../../src/components/ProductList";
import SearchService from "../../service/SearchService";
import {Product, SearchRequest, SearchResponse} from "../../src/types";
import SortOrFilter from "../../src/components/SortAndFilter/SortOrFilter";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {selectFilterState, setPagination, setPartialReq} from "../../slices/filterSlice";
import {splitURL} from "../../src/utils/parseUtils";
import GPagination from "../../src/components/Utils/GPagination";



export default function SearchProducts() {
    const [products, setProducts] = React.useState<Product[]>([]);
    const [loading, setLoading] = React.useState(true);

    const router = useRouter();
    const filterState = useSelector(selectFilterState);
    const dispatch = useDispatch();

    const [totalPages, setTotalPages] = React.useState<number>(1);

    useEffect( () => {
        if(router.isReady && filterState.req.name) {
            setLoading(true);
            getProducts();
        }
    }, [filterState.req])


    useEffect( () => {
        if(router.isReady) {
            const name = router.query.name as string;
            const talles = splitURL((router.query.talles || "") as string);
            const categories = splitURL((router.query.categories || "") as string);
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

    const fetchProductsWithPage = (page) => {
        dispatch(setPagination(page));
    }

    const getProducts = () => {
        SearchService.search(filterState.req).then( (res: SearchResponse) => {
            setProducts(res.products);
            setLoading(false);
            setTotalPages(res.totalPages);
        })
    }

    setTimeout( () => {
        // @ts-ignore
        //document.getElementById(filterState?.lastVisitedId)?.scrollIntoView();
    }, 600)

    return <div>
        <SortOrFilter/>
        <ProductList loading={loading} products={products} withBackButton={false}/>
        <GPagination onPageChange={(page) => fetchProductsWithPage(page) } totalPages={totalPages} />
    </div>
}