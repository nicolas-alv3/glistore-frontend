import {isAdminLogged, login} from "../../src/utils/loginUtils";
import React, {useEffect} from "react";
import styles from '../../styles/Admin.module.css';
import {Checkbox, Container, Divider, Dropdown, Form, Icon} from "semantic-ui-react";
import ToastUtils from "../../src/utils/toastUtils";
import {useRouter} from "next/router";
import GButton, {ButtonType} from "../../src/components/Utils/GButton";
import ProductService from "../../service/ProductService";
import AddEditProductModal from "../../src/components/Admin/AddEditProductModal";
import {GTemplate, Product} from "../../src/types";
import Image from "next/image";
import largeLogo from "../../public/logo_pomelo_largo.png";
import FirebaseService from "../../service/FirebaseService";
import GBadge, {GBadgeType} from "../../src/components/Utils/GBadge";
import {moneyPipe} from "../../src/utils/parseUtils";
import GTable from "../../src/components/Utils/GTable";
import GTitle, {GTitleSize} from "../../src/components/Utils/GTitle";
import ModalUtils from "../../src/utils/ModalUtils";
import CRUDPage from "../../src/components/Utils/CRUDPage";
import TemplateService from "../../service/TemplateService";

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
                <GTitle centered size={GTitleSize.LARGE}>Ingreso Admin</GTitle>
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

    const headers = ["Nombre", "Talles", "Visible", "Precio", "Acciones"];

    const openEditModal = (p) => {
        ModalUtils.openModal(<AddEditProductModal product={p} update={update}/>)
    }

    const openDeleteDialog = (p) => ModalUtils.dialog("Eliminar " + p.name, "¿Estas segur@ que querés eliminar este producto?", () => onDeleteConfirm(p) )

    const columns = [
        (p: Product) => p.name,
        (p: Product) => p.talles.map(t => <GBadge key={t} type={GBadgeType.SECONDARY} text={t}/>),
        (p: Product) => <Icon name={"eye"} color={p.visible ? "green" : "orange"}/>,
        (p: Product) => moneyPipe(p.price),
        (p: Product) => <>
            <GButton icon={"pencil"} type={ButtonType.TERTIARY} onClick={() => openEditModal(p)}/>
            <GButton
                icon={"trash"} type={ButtonType.DANGER} onClick={() => openDeleteDialog(p)}/>
        </>,
    ]
    return <GTable elements={products} headers={headers} columns={columns}/>;
}

function AdminPanel() {
    const [products, setProducts] = React.useState<Product[]>([]);
    const [templates, setTemplates] = React.useState<GTemplate[]>([]);


    const fetchProducts = () => {
        ProductService.getAll()
            .then(res => setProducts(res))
    }

    const fetchTemplates = () => {
        TemplateService.getTemplates()
            .then(res => setTemplates(res))
    }

    useEffect(() => {
        fetchProducts();
        fetchTemplates();
    }, [])

    const templateOptions = templates.map(t => ({
        key: t.name,
        value: t,
        text: t.name
    }))


    const openAddModal = (template) => {
        ModalUtils.openModal(<AddEditProductModal template={template} update={fetchProducts}/>)
    }

    const addButton = <Dropdown
        direction={"left"}
        text={"Agregar"}
        icon={"dropdown"}
        button item={false}
        className={styles.addButton}
    >
        <Dropdown.Menu>
            <Dropdown.Header icon='book' content='Elige un formato'/>
            {templateOptions.map((o) => <Dropdown.Item key={o.text} onClick={() => openAddModal(o.value)}>
                {o.text}
            </Dropdown.Item>)}

        </Dropdown.Menu>
    </Dropdown>

    return <CRUDPage title={"Todos tus productos"} addButton={addButton} table={<ProductsTable products={products} update={fetchProducts}/>}/>
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