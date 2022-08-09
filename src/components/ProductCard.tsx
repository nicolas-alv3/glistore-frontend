import {Button, Card, Header, Icon} from "semantic-ui-react";
import styles from "../../styles/Home.module.css";
import React from "react";
import Image from "next/image"
import {useRouter} from "next/router";
import {setPartialReq} from "../../slices/filterSlice";

// @ts-ignore
export default function ProductCard({ product } ) {
    const router = useRouter();

    const handleCardClick = () => {
        // @ts-ignore
        setPartialReq(prevState => ({...prevState, lastVisitedId: product._id}));
        router.push({ pathname: "/product", query:  { id: product._id }})
    }
    return <Card as={Button}  className={styles.card} onClick={handleCardClick} >
            <Image id={product._id} src={product.images[0]} className={styles.cardImg} />
            <Card.Content>
                <Card.Header>{product.name}</Card.Header>
                <Card.Meta className={styles.cardDescription}>{product.description}</Card.Meta>
                <Card.Description textAlign={"right"}>
                    <Header>${product.price}</Header>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <Icon name='plus' />
                    Ver más
                </a>
        </Card.Content>
    </Card>
}