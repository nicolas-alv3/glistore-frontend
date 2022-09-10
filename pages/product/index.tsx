import {useRouter} from 'next/router'
import React, {useEffect} from "react";
import ProductService from "../../service/ProductService";
import {CardDescription, Container, Divider, Grid} from "semantic-ui-react";
import Carrousel from "../../src/components/Utils/Carrousel";
import TrendingSwiper from '../../src/components/TrendingSwiper';
import {Product} from "../../src/types";
import ToastUtils from "../../src/utils/toastUtils";
import GTitle, {GTitleSize} from "../../src/components/Utils/GTitle";
import Skeleton from "react-loading-skeleton";
import GButton, {ButtonType} from "../../src/components/Utils/GButton";
import {parse} from "../../src/utils/parseUtils";
import AddToCart from "../../src/components/AddToCart";
import GBadge, {GBadgeType} from "../../src/components/Utils/GBadge";
import {getFrontendURL} from "../../src/utils/windowUtils";

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
        if (router.isReady) {
            if (!router.query.product) {
                ProductService.getProductById(String(id)).then(p => {
                    setProduct(p);
                    setLoading(false);
                })
                    .catch( () => router.push("/invalidPage")
                        .then(res => console.log(res)))
            } else {
                setLoading(false);
                setProduct(parse(router.query.product as string));
            }
        }
    }, [id, router.isReady]);

    const shareProduct = () => {
        if (navigator.share) {
            navigator.share({
                title: "Mira este producto! " + product?.name,
                url: `${getFrontendURL()}/product?id=${product?._id}`
            }).then(() => {
                ToastUtils.success("¡Gracias por ayudarnos!")
            })
                .catch(console.error);
        } else {
            ToastUtils.error("Parece que no puedes hacerlo en este navegador :(")
        }
    }

    return <>
        <Container>
            <GTitle title={"Ver producto"} withDivider withBackButton size={GTitleSize.LARGE}/>
            <Grid stackable>
                <Grid.Row>
                    {
                        loading ? <ShowProductSkeleton/> :
                            <>
                                <Grid.Column width={6}>
                                    <Carrousel preview={product?.preview} urls={product?.images || []}/>
                                </Grid.Column>
                                <Grid.Column width={6}>
                                    <GTitle size={GTitleSize.LARGE}>{product?.name} <GBadge
                                        type={GBadgeType.ORANGE} text={product?.category}/></GTitle>
                                    <CardDescription>{product?.description}</CardDescription>
                                    <Divider/>
                                    <AddToCart product={product}/>
                                    <Divider/>
                                    <GButton type={ButtonType.SECONDARY} icon={"share alternate"}
                                             onClick={shareProduct}>Compartir</GButton>
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