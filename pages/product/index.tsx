import {useRouter} from 'next/router'
import React, {useEffect} from "react";
import ProductService from "../../service/ProductService";
import {CardDescription, Container , Grid, Header, Label} from "semantic-ui-react";
import Carrousel from "../../src/components/Utils/Carrousel";
import TrendingSwiper from '../../src/components/TrendingSwiper';
import {Product} from "../../src/types";
import ToastUtils from "../../src/utils/toastUtils";
import Title from "../../src/components/Utils/Title";
import Skeleton from "react-loading-skeleton";
import GButton, {ButtonType} from "../../src/components/Utils/GButton";
import {NextSeo} from "next-seo";
import AddToCart from "../../src/components/AddToCart";

function ShowProductSkeleton() {
    return <>
        <Grid.Column width={6}>
            <Skeleton style={{width: "min(400px, 100%)", height: 300}}/>
        </Grid.Column>
        <Grid.Column width={6}>
            <Skeleton height={24} style={{marginBottom: "16px"}}/>
            <Skeleton height={16} count={4}/>
            <Skeleton height={24} width={64} style={{margin: "16px 0"}}/>
            <Skeleton height={16} width={128}/>
            <Skeleton height={48} width={152} style={{margin: "48px 0"}}/>
        </Grid.Column>
    </>
}

const ProductDetail = () => {
    const router = useRouter()
    const {id} = router.query
    const [loading, setLoading] = React.useState<boolean>(true);
    const [product, setProduct] = React.useState<Product>();


    useEffect(() => {
        if(router.isReady){
            ProductService.getProductById(String(id)).then(p => {
                setProduct(p);
                setLoading(false);
            })
        }
    }, [id, router.isReady]);

    const shareProduct = () => {
        if (navigator.share) {
            navigator.share({
                title: "Mira este producto! " + product?.name,
                url: window.location.href
            }).then(() => {
                ToastUtils.success("¡Gracias por ayudarnos!")
            })
                .catch(console.error);
        } else {
            ToastUtils.error("Parece que no puedes hacerlo en este navegador :(")
        }
    }

    return <>
        <NextSeo
            title={(product?.name || "Mira este producto! ") + " | Pomelo store"}
            description={product?.description}
        />
        <Container>
            <Title title={"Ver producto"} withBackButton/>
            <Grid stackable>
                <Grid.Row>
                    {
                        loading ? <ShowProductSkeleton/> :
                            <>
                                <Grid.Column width={6}>
                                    <Carrousel urls={product?.images || []}/>
                                </Grid.Column>
                                <Grid.Column width={6}>
                                    <Header size={"huge"}>{product?.name} <Label
                                        color={"orange"}>{product?.category}</Label></Header>
                                    <CardDescription>{product?.description}</CardDescription>
                                    <AddToCart product={product} />
                                    <GButton type={ButtonType.SECONDARY} icon={"share alternate"} onClick={shareProduct}>Compartir</GButton>
                                </Grid.Column>
                            </>
                    }

                </Grid.Row>
            </Grid>
            <TrendingSwiper/>
        </Container>
    </>
}

export default ProductDetail