import ProductCard from "./ProductCard";
import {Card, Container, Header} from "semantic-ui-react";
import React, {useEffect} from "react";
import {Product} from "../types";
import Title from "./Utils/Title";
import {util} from "protobufjs";
import Array = util.Array;

interface Props {
    products: Product[],
    title: string,
    belowTitle?: any,
    withBackButton: boolean,
    loading: boolean
}

export default function ProductList( props: Props ) {

    const getProducts = () => {
        if(props.loading) {
            return [1,2,3,4,5,6,7,8,9,10].map(i => <ProductCard loading={true} key={i} product={null} /> )
        }
        else {
            return props.products.map( (p :Product) => <ProductCard loading={false} key={p._id} product={p} />)
        }
    }
    return <>
        {
            props.products?.length > 0 || props.loading?
                <>
                    <Title title={props.title} withBackButton={props.withBackButton}/>
                    {props.belowTitle && props.belowTitle}
                    <Card.Group itemsPerRow={5} doubling={true} >
                        {/* eslint-disable-next-line react/jsx-key */}
                        {getProducts()}
                    </Card.Group>
                </>
                :
                <Container text={false} textAlign={"center"}>
                    <Header> Ooops! Parece que no hay productos aquí... Prueba con otra búsqueda!</Header>
                    <img
                        src={"https://media.istockphoto.com/vectors/cute-black-and-white-cat-is-sitting-in-a-cardboard-box-vector-id1284540470?k=20&m=1284540470&s=170667a&w=0&h=XOT_1QDiE_P0775yyX4ybkwgZ3-SHb_zKTIdwmDoPJg="}
                        width={300}
                        height={300}
                    />
                </Container>
        }
        </>
}