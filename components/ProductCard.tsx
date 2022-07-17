import {Button, Card, Header, Icon, Image} from "semantic-ui-react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import React, {Fragment} from "react";
import {FilterStateContext} from "../pages/_app";
import {useRouter} from "next/router";

// @ts-ignore
export default function ProductCard({ product } ) {
    const router = useRouter();
    const [filterState, setFilterState] = React.useContext(FilterStateContext);

    const handleCardClick = () => {
        setFilterState(prevState => ({...prevState, lastVisitedId: product._id}));
        router.push({ pathname: "/product", query:  { id: product._id }})
    }
    return <Card as={Button}  className={styles.card} onClick={handleCardClick} >
            <img id={product._id} src={product.imgUrl} className={styles.cardImg} />
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