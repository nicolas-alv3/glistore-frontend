import {isAdminLogged, login} from "../../src/utils/loginUtils";
import React, {useEffect} from "react";
import styles from '../../styles/Admin.module.css';
import {Button, Checkbox, Container, Divider, Form, Header, Icon, Label, Table} from "semantic-ui-react";
import ToastUtils from "../../src/utils/toastUtils";
import {useRouter} from "next/router";
import ProductService from "../../service/ProductService";
import { Product } from "../../src/types";
import {pipePrice} from "../../src/utils/stringUtils";
import AddEditModal from "../../src/components/Admin/AddEditModal";
import DialogComponent from "../../src/components/Utils/DialogComponent";
import storage from "../../firebase.config";
import {
    ref,
    deleteObject,
    listAll
} from "firebase/storage";
import {log} from "util";

function LoginComponent() {
    const [name, setName] = React.useState("");
    const [pw, setPw] = React.useState("");
    const router = useRouter();

    const handleLogin = () => {
        login(pw).then( () => {
            router.reload();
        })
            .catch(() => ToastUtils.error("Contraseña incorrecta"))
    }
    return <div>
            <div className={styles.loginForm}>
                <Container className={styles.loginContainer}>
                    <div className={styles.miniLogoLogin}>
                        <img src={"https://pomelobebes.web.app/assets/logo.jpeg"}/>
                        {/*TODO: Here should be the horizontal logo*/}
                    </div>
                    <Header textAlign={"center"} size={"huge"}>Ingreso Admin</Header>
                    <Divider/>
                    <Form size={"big"}>
                        <Form.Field>
                            <label>Nombre</label>
                            <input placeholder='Ingresa tu nombre' required value={name} onChange={ e => setName(e.target.value)}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Contraseña</label>
                            <input placeholder='Ingresa tu contraseña' type={"password"} value={pw} onChange={ e => setPw(e.target.value)}/>
                        </Form.Field>
                        <Form.Field>
                            <Checkbox label={"Mantener sesion activa"}/>
                        </Form.Field>
                        <Button size={"huge"} color={"brown"} fluid type='submit' onClick={handleLogin}>Ingresar</Button>
                    </Form>
                </Container>
            </div>
            <img src={"https://twincitieskidsclub.com/wp-content/uploads/2021/11/childrens-consignment-store.jpg"} className={styles.backgroundImage}  alt={""}/>
        </div>;
}

function ProductsTable({ products, update }) {

    const removeFromFirestore = (p: Product) => {
        p.images.forEach( imageUrl => {
            const storageRef = ref(storage, imageUrl )
            deleteObject(storageRef).then(res => console.log("Firestore image deleted", res))
                .catch(err => ToastUtils.error("Error eliminando imagen"));
        })
    }

    const onDeleteConfirm = (p: Product) => {
        ProductService.delete(p)
            .then( () => ToastUtils.success("Eliminado!"))
            .then(update)
            .then(() => removeFromFirestore(p))
            .catch( () => ToastUtils.error("Ha ocurrido un error"));
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
            { products.map( (p) => {
                return <Table.Row key={p._id}>
                    <Table.Cell>
                        {p.name}
                    </Table.Cell>
                    <Table.Cell>
                        {p.talles.map( t => <Label key={t} color={"olive"}>{t}</Label>)}
                    </Table.Cell>
                    <Table.Cell><Icon name={"eye"} color={p.visible ? "green" : "orange" } /></Table.Cell>
                    <Table.Cell>{pipePrice(p.price)}</Table.Cell>
                    <Table.Cell>
                        <AddEditModal product={p} update={update} trigger={<Button icon basic color={"brown"}><Icon name={"pencil"} /></Button>} />
                        <DialogComponent
                            title={"Eliminar producto"}
                            message={"¿Estas segur@ que querés eliminar este producto?"}
                            onConfirm={() => onDeleteConfirm(p)}
                            trigger={<Button
                                        icon
                                        basic
                                        color={"red"}
                                        ><Icon name={"trash"} />
                                    </Button>} />
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
            .then( res => setProducts(res))
    }

    useEffect( () => {
       fetchProducts();
    }, [])

    return <div>
        <Header>Todos tus productos</Header>
        <AddEditModal update={fetchProducts} trigger={<Button circular size={"large"} className={styles.floatingButton} color={"brown"}><Icon name={"plus"}/>Agregar</Button>} />
        <Divider/>
        <ProductsTable products={products} update={fetchProducts} />
    </div>;
}

export default function Login() {
    const [adminLogged, setAdminLogged] = React.useState(false);

    useEffect( () => {
        setAdminLogged(isAdminLogged())
    }, [])
    return <div>
        {
        adminLogged ?
        <AdminPanel />
        :
        <LoginComponent />
    }
    </div>
}