import {Button, Card, Header, Icon, Image} from "semantic-ui-react";
import styles from "../styles/Home.module.css";
import Link from "next/link";

// @ts-ignore
export default function ProductCard({ product } ) {
    return <Link href={{pathname: "/product", query: { id: product._id }}}>
            <Card as={Button} className={styles.card} onClick={() => {}}>
            <img src={product.imgUrl} className={styles.cardImg} />
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
    </Link>
}