import ProductCard from "./ProductCard";
import {Card} from "semantic-ui-react";
import React from "react";
import {Product} from "../types";
import GTitle, {GTitleSize} from "./Utils/GTitle";
import Image from "next/image";
import emptyResultsURL from '../../public/empty_results.png';

interface Props {
    products: Product[],
    title?: string,
    belowTitle?: any,
    withBackButton: boolean,
    loading: boolean
}

export default function ProductList( props: Props ) {

    const getProducts = () => {
            return <>
                {props.products.map( (p :Product) => <ProductCard loading={false} key={p._id} product={p} />)}
                {props.loading && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => <ProductCard loading={true} key={i} product={null}/>)}
            </>
    }
    return <>
        {
            props.products?.length > 0 || props.loading?
                <>
                    { props.title && <GTitle withDivider title={props.title} size={GTitleSize.LARGE} withBackButton={props.withBackButton}/>}
                    {props.belowTitle && props.belowTitle}
                    <Card.Group itemsPerRow={5} doubling={true} >
                        {getProducts()}
                    </Card.Group>
                </>
                :
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Image
                        alt={"Empty results"}
                        src={emptyResultsURL}
                        width={300}
                        height={260}
                        unoptimized
                    />
                    <b> Ooops! Parece que no hay productos aquí... Prueba con otra búsqueda!</b>
                </div>
        }
        </>
}