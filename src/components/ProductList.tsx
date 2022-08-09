import ProductCard from "./ProductCard";
import {Card, Container, Divider, Header} from "semantic-ui-react";
import React, {ReactElement, ReactNode} from "react";
import {Product} from "../types";
import {JSXElement} from "@typescript-eslint/types/dist/generated/ast-spec";
import Title from "./Utils/Title";
import Image from "next/image";

interface Props {
    products: Product[],
    title: string,
    belowTitle?: any,
    withBackButton: boolean
}

export default function ProductList( props: Props ) {
    return <>
        {
            props.products?.length ?
                <>
                    <Title title={props.title} withBackButton={props.withBackButton}/>
                    {props.belowTitle && props.belowTitle}
                    <Card.Group itemsPerRow={5} doubling={true} >
                        {/* eslint-disable-next-line react/jsx-key */}
                        {props.products?.map( (p :Product) => <ProductCard key={p._id} product={p} />)}
                    </Card.Group>
                </>
                :
                <Container text={false} textAlign={"center"}>
                    <Header> Ooops! Parece que no hay productos aquí... Prueba con otra búsqueda!</Header>
                    <Image
                        src={"https://media.istockphoto.com/vectors/cute-black-and-white-cat-is-sitting-in-a-cardboard-box-vector-id1284540470?k=20&m=1284540470&s=170667a&w=0&h=XOT_1QDiE_P0775yyX4ybkwgZ3-SHb_zKTIdwmDoPJg="}
                        width={300}
                        height={300}
                    />
                </Container>
        }
        </>
}