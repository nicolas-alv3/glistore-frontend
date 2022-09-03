import {isAdminLogged, login} from "../../src/utils/loginUtils";
import React, {useEffect} from "react";
import styles from '../../styles/Admin.module.css';
import {Checkbox, Container, Divider, Dropdown, Form, Header, Icon, Table} from "semantic-ui-react";
import ToastUtils from "../../src/utils/toastUtils";
import {useRouter} from "next/router";
import GButton, {ButtonType} from "../../src/components/Utils/GButton";
import ProductService from "../../service/ProductService";
import AddEditModal from "../../src/components/Admin/AddEditModal";
import DialogComponent from "../../src/components/Utils/DialogComponent";
import {FeatureType, GTemplate, Product} from "../../src/types";
import Image from "next/image";
import largeLogo from "../../public/logo_pomelo_largo.png";
import FirebaseService from "../../service/FirebaseService";
import GBadge, {GBadgeType} from "../../src/components/Utils/GBadge";
import {moneyPipe} from "../../src/utils/parseUtils";

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
            .catch(() => ToastUtils.error("Hubo un problema eliminando las imagenes"));
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
                        {p.talles.map(t => <GBadge key={t} type={GBadgeType.SECONDARY} text={t}/>)}
                    </Table.Cell>
                    <Table.Cell><Icon name={"eye"} color={p.visible ? "green" : "orange"}/></Table.Cell>
                    <Table.Cell>{moneyPipe(p.price)}</Table.Cell>
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

    const shoeTemplate: GTemplate = {
        name: "Zapatilla",
        features: [
            {
                type: FeatureType.ENUM_SIMPLE,
                name: "Talle de zapa",
                options: [],
                required: true,
                enumerable: ["35", "36", "37", "38", "39", "40", "41", "42"]
            }
            ]
    }

    const burgerTemplate: GTemplate = {
        name: "Hamburguesa",
        features: [
            {
                type: FeatureType.ENUM_MULT,
                name: "Agregados",
                options: [],
                required: true,
                enumerable: ["Extra cheddar","Extra carne","Extra bacon"]
            }
        ]
    }

    const templateOptions = [shoeTemplate, burgerTemplate].map( t => ({
        key: t.name,
        value: t,
        text: t.name
    }))

    return <div>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <Header>Todos tus productos</Header>
            <Dropdown
                direction={"left"}
                text={"Agregar"}
                icon={"dropdown"}
                button item={false}
                className={styles.addButton}
            >
                <Dropdown.Menu>
                    <Dropdown.Header icon='book' content='Elige una plantilla'/>
                    {templateOptions.map( (o) => <AddEditModal key={o.key} update={fetchProducts}
                                                               template={o.value}
                                                               trigger={
                                                                   <Dropdown.Item>{o.text}</Dropdown.Item>

                                                               }/>)}

                </Dropdown.Menu>
            </Dropdown>
        </div>
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