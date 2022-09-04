import ProductCard from "./ProductCard";
import {Card} from "semantic-ui-react";
import React from "react";
import {Product} from "../types";
import GTitle, {GTitleSize} from "./Utils/GTitle";
import Image from "next/image";

interface Props {
    products: Product[],
    title?: string,
    belowTitle?: any,
    withBackButton: boolean,
    loading: boolean
}

export default function ProductList( props: Props ) {

    const emptyCatURL = "https://media.istockphoto.com/vectors/cute-black-and-white-cat-is-sitting-in-a-cardboard-box-vector-id1284540470?k=20&m=1284540470&s=170667a&w=0&h=XOT_1QDiE_P0775yyX4ybkwgZ3-SHb_zKTIdwmDoPJg=";


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
                        {/* eslint-disable-next-line react/jsx-key */}
                        {getProducts()}
                    </Card.Group>
                </>
                :
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <b> Ooops! Parece que no hay productos aquí... Prueba con otra búsqueda!</b>
                    <Image
                        alt={"Empty cart"}
                        loader={() => emptyCatURL}
                        src={emptyCatURL}
                        width={300}
                        height={300}
                        unoptimized
                    />
                </div>
        }
        </>
}