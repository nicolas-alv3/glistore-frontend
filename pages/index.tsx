import type { NextPage } from 'next';
import React, {useEffect} from "react";
import ProductService from "../service/ProductService";
import ProductList from '../src/components/ProductList';
import { useDispatch } from 'react-redux'
import {resetFilter} from "../slices/filterSlice";

const Home: NextPage = () => {
    const [products, setProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const dispatch = useDispatch()


    useEffect( () => {
        ProductService.getVisibleProducts().then( res => {
            setLoading(false);
            setProducts(res);
        });
        dispatch(resetFilter())
    }, []);

    return (
    <div>
      <main>
          <ProductList loading={loading} title={"Todos nuestros productos"} products={products} withBackButton={false}/>
      </main>
    </div>
  )
}

export default Home
