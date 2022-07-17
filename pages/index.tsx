import type { NextPage } from 'next';
import React, {useEffect} from "react";
import ProductService from "../service/ProductService";
import ProductList from '../components/ProductList';
import {FilterStateContext} from "./_app";

const Home: NextPage = () => {
    const [filterState, setFilterState] = React.useContext(FilterStateContext);
    const [products, setProducts] = React.useState([]);

    useEffect( () => {
        ProductService.getVisibleProducts().then( res => {
            setProducts(res);
        });
        setFilterState(null);
    }, []);

    return (
    <div>
      <main>
          <ProductList title={"Todos nuestros productos"} products={products} />
      </main>
    </div>
  )
}

export default Home
