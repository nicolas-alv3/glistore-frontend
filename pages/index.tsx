import type { NextPage } from 'next';
import React, {useEffect} from "react";
import ProductService from "../service/ProductService";
import ProductList from '../src/components/ProductList';
import {FilterStateContext} from "../src/context/Contexts";
import { useSelector, useDispatch } from 'react-redux'
import {decrement, increment, selectValue} from "../slices/counterSlice";

const Home: NextPage = () => {
    const [filterState, setFilterState] = React.useContext(FilterStateContext);
    const [products, setProducts] = React.useState([]);

    const count = useSelector(selectValue);
    const dispatch = useDispatch()


    useEffect( () => {
        ProductService.getVisibleProducts().then( res => {
            setProducts(res);
        });
        setFilterState(null);
    }, []);

    return (
    <div>
      <main>
          <div>
              <button
                  aria-label="Increment value"
                  onClick={() => dispatch(increment())}
              >
                  Increment
              </button>
              <span>{count}</span>
              <button
                  aria-label="Decrement value"
                  onClick={() => dispatch(decrement())}
              >
                  Decrement
              </button>
          </div>
          <ProductList title={"Todos nuestros productos"} products={products} withBackButton={false}/>
      </main>
    </div>
  )
}

export default Home
