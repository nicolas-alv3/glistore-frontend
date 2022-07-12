import React, {useEffect} from "react";
import {Divider, Header} from "semantic-ui-react";
import ProductList from "../../components/ProductList";
import SearchService from "../../service/SearchService";
import {Product, SearchRequest, SearchResponse} from "../../types";
import SortOrFilter from "../../components/SortAndFilter/SortOrFilter";
import {useRouter} from "next/router";
import {parse} from "../../Utils/parseUtils";

export default function SearchProducts() {
    const [products, setProducts] = React.useState<Product[]>([]);
    const router = useRouter();
    const searchInput = router.query.searchInput as string;
    const talles = router.query.talles as string;
    const categories = router.query.categories as string;

    useEffect(() => {
        console.log(router.query)
       const sReq = {
           name: String(searchInput),
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
       getProducts(sReq);
    }, [searchInput]);

    const getProducts = (searchRequest: Partial<SearchRequest>) => {
        const sReq: SearchRequest = {
            ...searchRequest,
            name: searchInput,
            pageSize:10,
            page:1,
        }
        console.log(sReq);
        SearchService.search(sReq).then( (res: SearchResponse) => {
            setProducts(res.products);
        })
    }

    return <div>
        <SortOrFilter products={products} updateProducts={getProducts}/>
        <ProductList title={`Resultados para "${searchInput}"`} products={products}/>
    </div>
}