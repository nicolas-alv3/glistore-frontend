import {Button, Card, Icon} from "semantic-ui-react";
import styles from "../../styles/Home.module.css";
import React, {Fragment} from "react";
import {useRouter} from "next/router";
import {setPartialReq} from "../../slices/filterSlice";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Image from "next/image";

function ProductSkeleton() {
    return <div style={{height: "100%", width: "100%"}}>
        <Skeleton width={"90%"} height={120} style={{marginTop: 10}}/>
        <br/>
        <Skeleton height={16} width={"90%"}/>
        <br/>
        <Skeleton count={3} height={10} width={"90%"}/>
        <br/>
        <Skeleton width={50} height={14} style={{marginLeft: "-6em"}}/>
        <br/>
    </div>;
}

// @ts-ignore
export default function ProductCard({product, loading}) {
    const [loadingPicture, setLoadingPicture] = React.useState(false);
    const router = useRouter();

    const handleCardClick = () => {
        // @ts-ignore
        setPartialReq(prevState => ({...prevState, lastVisitedId: product._id}));
        router.push({pathname: "/product", query: {id: product._id}})
    }

    const handleImageLoaded = () => {
        setLoadingPicture(false);
        console.log("Image loaded")
    }

    return <Card as={Button} className={styles.card} onClick={handleCardClick}>
        {
            loading ? <ProductSkeleton/>
                :
                <>
                    {
                        product.images[0]
                        &&
                        <Image
                            id={product._id} src={product.images[0] || "..."}
                            blurDataURL={"http://www.proedsolutions.com/wp-content/themes/micron/images/placeholders/placeholder_small.jpg"}
                            height={222} width={222} className={styles.cardImg} placeholder="blur" alt={""}/>
                    }
                    <Card.Content className={styles.cardContent}>
                        <h2>{product.name}</h2>
                        <h3>{product.description}</h3>
                        <h4>${product.price}</h4>
                    </Card.Content>
                    <Card.Content extra>
                        <a>
                            <Icon name='plus'/>
                            Ver más
                        </a>
                    </Card.Content>
                </>
        }
    </Card>
}