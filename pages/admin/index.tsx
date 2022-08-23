import {isAdminLogged, login} from "../../src/utils/loginUtils";
import React, {useEffect} from "react";
import styles from '../../styles/Admin.module.css';
import {Checkbox, Container, Divider, Form, Header, Icon, Table} from "semantic-ui-react";
import ToastUtils from "../../src/utils/toastUtils";
import {useRouter} from "next/router";
import GButton, {ButtonType} from "../../src/components/Utils/GButton";
import {pipePrice} from "../../src/utils/stringUtils";
import ProductService from "../../service/ProductService";
import AddEditModal from "../../src/components/Admin/AddEditModal";
import DialogComponent from "../../src/components/Utils/DialogComponent";
import {Product} from "../../src/types";
import Image from "next/image";
import largeLogo from "../../public/logo_pomelo_largo.png";
import FirebaseService from "../../service/FirebaseService";
import GBadge, {GBadgeType} from "../../src/components/Utils/GBadge";

function LoginComponent() {
    const [name, setName] = React.useState("");
    const [pw, setPw] = React.useState("");
    const router = useRouter();

    const handleLogin = () => {
        login(pw).then(() => {
            router.reload();
        })
            .catch(() => ToastUtils.error("Contraseña incorrecta"))
    }
    return <div>
        <div className={styles.loginForm}>
            <Container className={styles.loginContainer}>
                <div className={styles.miniLogoLogin}>
                    <Image src={largeLogo} width={400}
                           layout={"intrinsic"} alt={"logo"}
                           objectFit={"cover"}
                           height={200} objectPosition={"center"}/>
                </div>
                <Header textAlign={"center"} size={"huge"}>Ingreso Admin</Header>
                <Divider/>
                <Form size={"big"}>
                    <Form.Field>
                        <label>Nombre</label>
                        <input placeholder='Ingresa tu nombre' required value={name}
                               onChange={e => setName(e.target.value)}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Contraseña</label>
                        <input placeholder='Ingresa tu contraseña' type={"password"} value={pw}
                               onChange={e => setPw(e.target.value)}/>
                    </Form.Field>
                    <Form.Field>
                        <Checkbox label={"Mantener sesion activa"}/>
                    </Form.Field>
                    <GButton size={"huge"} fluid type={ButtonType.PRIMARY} onClick={handleLogin}>Ingresar</GButton>
                </Form>
            </Container>
        </div>
        <img src={"https://twincitieskidsclub.com/wp-content/uploads/2021/11/childrens-consignment-store.jpg"}
             className={styles.backgroundImage} alt={""}/>
    </div>;
}

function ProductsTable({products, update}) {

    const removeImages = (p) => {
        FirebaseService.removeFromFirestore(p.images.concat([p.preview])).then(() => ToastUtils.success("Imagenes eliminadas!"))
            .catch( () => ToastUtils.error("Hubo un problema eliminando las imagenes"));
    }

    const onDeleteConfirm = (p: Product) => {
        ProductService.delete(p)
            .then(() => ToastUtils.success("Eliminado!"))
            .then(update)
            .then(() => removeImages(p))
            .catch(() => ToastUtils.error("Ha ocurrido un error"));
    }
    return <Table>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Nombre</Table.HeaderCell>
                <Table.HeaderCell>Talles</Table.HeaderCell>
                <Table.HeaderCell>Visible</Table.HeaderCell>
                <Table.HeaderCell>Precio</Table.HeaderCell>
                <Table.HeaderCell>Acciones</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {products.map((p) => {
                return <Table.Row key={p._id}>
                    <Table.Cell>
                        {p.name}
                    </Table.Cell>
                    <Table.Cell>
                        {p.talles.map(t => <GBadge key={t} type={GBadgeType.SECONDARY} text={t} />)}
                    </Table.Cell>
                    <Table.Cell><Icon name={"eye"} color={p.visible ? "green" : "orange"}/></Table.Cell>
                    <Table.Cell>{pipePrice(p.price)}</Table.Cell>
                    <Table.Cell>
                        <AddEditModal product={p} update={update}
                                      trigger={<GButton icon={"pencil"} type={ButtonType.TERTIARY}/>}/>
                        <DialogComponent
                            title={"Eliminar producto"}
                            message={"¿Estas segur@ que querés eliminar este producto?"}
                            onConfirm={() => onDeleteConfirm(p)}
                            trigger={<GButton
                                icon={"trash"} type={ButtonType.DANGER}/>}/>
                    </Table.Cell>
                </Table.Row>
            })}
        </Table.Body>
    </Table>;
}

function AdminPanel() {
    const [products, setProducts] = React.useState<Product[]>([]);

    const fetchProducts = () => {
        ProductService.getAll()
            .then(res => setProducts(res))
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    return <div>
        <Header>Todos tus productos</Header>
        <AddEditModal update={fetchProducts}
                      trigger={<GButton size={"large"} circular className={styles.floatingButton}
                                        type={ButtonType.PRIMARY} icon={"plus"} text={"Agregar"} />}/>
        <Divider/>
        <ProductsTable products={products} update={fetchProducts}/>
    </div>;
}

export default function Login() {
    const [adminLogged, setAdminLogged] = React.useState(false);

    useEffect(() => {
        setAdminLogged(isAdminLogged())
    }, [])
    return <div>
        {
            adminLogged ?
                <AdminPanel/>
                :
                <LoginComponent/>
        }
    </div>
}