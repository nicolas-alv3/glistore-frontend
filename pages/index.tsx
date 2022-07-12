import type { NextPage } from 'next';
import React, {useEffect} from "react";
import ProductService from "../service/ProductService";
import ProductList from '../components/ProductList';

const Home: NextPage = () => {
    const [products, setProducts] = React.useState([]);

    useEffect( () => {
        ProductService.getVisibleProducts().then( res => {
            setProducts(res);
        })
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
