import type { NextPage } from 'next';
import React, {useEffect} from "react";
import ProductService from "../service/ProductService";
import ProductList from '../src/components/ProductList';
import {FilterStateContext} from "../src/context/Contexts";

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
          <ProductList title={"Todos nuestros productos"} products={products} withBackButton={false}/>
      </main>
    </div>
  )
}

export default Home
