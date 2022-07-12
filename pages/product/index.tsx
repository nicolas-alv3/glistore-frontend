import { useRouter } from 'next/router'
import React, {useEffect} from "react";
import ProductService from "../../service/ProductService";
import {CartContext, SidebarContext} from "../_app";
import {
    Button,
    Card,
    CardDescription,
    Container,
    Divider,
    Grid,
    GridRow,
    Header,
    Icon,
    Input,
    List
} from "semantic-ui-react";
import styles from '../../styles/Home.module.css';
import Carrousel from "../../components/Carrousel";
import TrendingSwiper from '../../components/TrendingSwiper';
import {toast} from "react-hot-toast";
import {CartItem, Product} from "../../types";

const ProductDetail = () => {
    const router = useRouter()
    const { id } = router.query
    const [product, setProduct] = React.useState<Product>();
    const [amount, setAmount] = React.useState(1);
    const [visible, setVisible] = React.useContext(SidebarContext)
    const [cart, setCart] = React.useContext<[CartItem[], Function]>(CartContext);
    const [talle, setTalle] = React.useState("");

    useEffect( () => {
        ProductService.getProductById(String(id)).then( p => setProduct(p))
    }, [id]);

    const addToCart = () => {
        const cartItem = {
            product,
            amount,
            talle
        }
        setCart((prevCart: CartItem[]) => prevCart.concat([cartItem as CartItem]));
        toast.success("Perfecto!");
        setVisible(true);
    }

    // @ts-ignore
    // @ts-ignore
    return <>
    <Container>
        <Header size={"huge"}> Ver producto </Header>
        <Divider />
        <Grid stackable>
            <Grid.Row>
                <Grid.Column width={6}>
                    <Carrousel urls={[product?.imgUrl,"https://www.w3schools.com/css/rock600x400.jpg","data:image/jpeg;base64,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"]}/>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Header size={"huge"}>{product?.name}</Header>
                    <CardDescription>{product?.description}</CardDescription>
                    <Header className={styles.font} size={"huge"}>${product?.price}</Header>
                    <Header className={styles.font} size={"large"}>Disponible en talles:</Header>
                    {/* eslint-disable-next-line react/jsx-key */}
                    {product?.talles?.map(t => <Button
                                color={"orange"}
                                basic={talle !== t}
                                onClick={ () => setTalle(t)}
                                >{t}
                            </Button>)}
                    <Divider/>
                    <Button icon={"plus"} onClick={() => setAmount(prevAmount => prevAmount + 1)}/>
                    <Input type={"number"} value={amount}/>
                    <Button icon={"minus"} onClick={() => setAmount(prevAmount => prevAmount - 1)}/>
                    <Divider/>
                    <Button color={"brown"} size={"large"} onClick={addToCart}>
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