import {Button, Card, Header, Icon} from "semantic-ui-react";
import styles from "../../styles/Home.module.css";
import React from "react";
import {useRouter} from "next/router";
import {setPartialReq} from "../../slices/filterSlice";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Image from "next/image";
import GModal from "./GModal";
import AddToCart from "./AddToCart";
import {hideModal} from "../../slices/modalSlice";
import {useDispatch} from "react-redux";

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

export default function ProductCard({product, loading}) {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleCardClick = () => {
        // @ts-ignore
        setPartialReq(prevState => ({...prevState, lastVisitedId: product._id}));
        router.push({pathname: "/product", query: {id: product._id}})
    }

    return <Card as={Button} className={styles.card}>
        {
            loading ? <ProductSkeleton/>
                :
                <>
                    {
                        product.images[0]
                        &&
                        <Image
                            id={product._id} src={product.images[0] || "..."}
                            quality={30} priority
                            blurDataURL={"/logo_pomelo_largo.png"}
                            height={222} width={222} className={styles.cardImg} placeholder="blur" alt={""}  onClick={handleCardClick}/>
                    }
                    <Card.Content className={styles.cardContent}  onClick={handleCardClick}>
                        <h2>{product.name}</h2>
                        <h3>{product.description}</h3>
                        <h4>${product.price}</h4>
                    </Card.Content>
                    <Card.Content extra>
                        <GModal withoutButtons size={"mini"} title={"Agregar al carrito"}
                                trigger={<a style={{color: "var(--col-primary)"}} onClick={(e) => e.stopPropagation() }>
                                    <Icon name='cart plus'/>
                                    Agregar al carrito
                                </a>}>
                            <div style={{padding: "0 32px"}}>
                                <Header>{product.name}</Header>
                                <AddToCart onAdd={() => dispatch(hideModal())} product={product} />
                            </div>
                        </GModal>
                    </Card.Content>
                </>
        }
    </Card>
}