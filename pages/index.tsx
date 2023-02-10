import type { NextPage } from 'next';
import React, {useEffect} from "react";
import ProductList from '../src/components/ProductList';
import {useDispatch} from 'react-redux'
import {initialState, resetFilter} from "../slices/filterSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchService from "../service/SearchService";

const Home: NextPage = () => {
    const [products, setProducts] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(10);
    const [loading, setLoading] = React.useState(true);
    const dispatch = useDispatch();

    const fetchProducts = () => {
        dispatch(resetFilter())

        setLoading(true);
        const sReq = {
            ...initialState.req,
            page
        }
        SearchService.search(sReq).then( res => {
            setTotalPages(res.totalPages);
            setLoading(false);
            setProducts(products.concat(res));
        });
    }

    useEffect( () => {
        fetchProducts();
    }, [page])

    return (
    <div>
      <main >
          <InfiniteScroll
              style={{width:"100%", overflow: "visible"}}
              dataLength={products.length}
              next={() => setPage(prevState=> prevState + 1)}
              hasMore={totalPages !== page}
              loader={<h4>Cargando mas productos...</h4>}
              endMessage={
                  <p style={{ textAlign: 'center', padding:20 }}>
                      <b>No hay mas productos por aquí</b>
                  </p>
              }
          >
              <ProductList loading={loading} title={"Todos nuestros productos"} products={products} withBackButton={false}/>
          </InfiniteScroll>
      </main>
    </div>
  )
}

export default Home
