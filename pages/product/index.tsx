import { useRouter } from 'next/router'
import React, {useEffect} from "react";
import ProductService from "../../service/ProductService";
import {
    Button,
    CardDescription,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Input, Label
} from "semantic-ui-react";
import styles from '../../styles/Home.module.css';
import Carrousel from "../../src/components/Utils/Carrousel";
import TrendingSwiper from '../../src/components/TrendingSwiper';
import {CartItem, Product} from "../../src/types";
import ToastUtils from "../../src/utils/toastUtils";
import Title from "../../src/components/Utils/Title";
import {show, addItem} from "../../slices/sidebarSlice";
import {useDispatch} from "react-redux";

const ProductDetail = () => {
    const router = useRouter()
    const { id } = router.query
    const [product, setProduct] = React.useState<Product>();
    const [amount, setAmount] = React.useState(1);
    const [talle, setTalle] = React.useState("");
    const dispatch = useDispatch()


    useEffect( () => {
        ProductService.getProductById(String(id)).then( p => setProduct(p))
    }, [id]);

    const addToCart = () => {
        const cartItem = {
            product,
            amount,
            talle
        }
        dispatch(addItem(cartItem as CartItem));
        ToastUtils.success("Perfecto!")
        dispatch(show());
    }

    // @ts-ignore
    // @ts-ignore
    return <>
    <Container>
        <Title title={"Ver producto"} withBackButton />
        <Grid stackable>
            <Grid.Row>
                <Grid.Column width={6}>
                    <Carrousel urls={product?.images || []} />
                </Grid.Column>
                <Grid.Column width={6}>
                    <Header size={"huge"}>{product?.name} <Label color={"orange"}>{product?.category}</Label></Header>
                    <CardDescription>{product?.description}</CardDescription>
                    <Header className={styles.font} size={"huge"}>${product?.price}</Header>
                    <Header className={styles.font} size={"large"}>Disponible en talles:</Header>
                    {/* eslint-disable-next-line react/jsx-key */}
                    {product?.talles?.map(t => <Button
                                key={t}
                                color={"orange"}
                                basic={talle !== t}
                                onClick={ () => setTalle(t)}
                                >{t}
                            </Button>)}
                    <Divider/>
                    <Header className={styles.font} size={"small"}>Cantidad:</Header>
                    <Button icon={"plus"} onClick={() => setAmount(prevAmount => prevAmount + 1)}/>
                    <Input type={"number"} value={amount} error={amount <= 0} />
                    <Button icon={"minus"} onClick={() => setAmount(prevAmount => prevAmount - 1)}/>
                    <Divider/>
                    <Button color={"brown"} size={"large"} disabled={!Boolean(talle) || amount < 1} onClick={addToCart}>
                        <Icon name={"cart plus"} />
                        Agregar al carrito
                    </Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        <TrendingSwiper />
    </Container>
    </>
}

export default ProductDetail