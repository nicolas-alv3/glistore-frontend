import React, {useEffect} from "react";
import ProductList from "../../src/components/ProductList";
import SearchService from "../../service/SearchService";
import {Product, SearchResponse} from "../../src/types";
import SortOrFilter from "../../src/components/SortAndFilter/SortOrFilter";
import {useDispatch} from "react-redux";
import {setPagination} from "../../slices/filterSlice";
import GPagination from "../../src/components/Utils/GPagination";
import {useGRouter} from "../../src/hooks/useGRouter";



export default function SearchProducts() {
    const [products, setProducts] = React.useState<Product[]>([]);
    const [loading, setLoading] = React.useState(true);

    const { router, getReq } = useGRouter();
    const dispatch = useDispatch();

    const [totalPages, setTotalPages] = React.useState<number>(1);

    useEffect( () => {
        if(router.isReady) {
            setLoading(true);
            getProducts();
        }
    }, [router.query])

    const fetchProductsWithPage = (page) => {
        dispatch(setPagination(page));
    }

    const getProducts = () => {
        SearchService.search(getReq()).then( (res: SearchResponse) => {
            setProducts(res.products);
            setLoading(false);
            setTotalPages(res.totalPages);
        })
    }

    return <div>
        <SortOrFilter/>
        <ProductList loading={loading} products={products} withBackButton={false}/>
        <GPagination onPageChange={(page) => fetchProductsWithPage(page) } totalPages={totalPages} />
    </div>
}