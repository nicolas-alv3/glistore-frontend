import CRUDPage from "../../../Utils/CRUDPage";
import React, {useEffect} from "react";
import {GTemplate, Product} from "../../../../types";
import ProductService from "../../../../../service/ProductService";
import TemplateService from "../../../../../service/TemplateService";
import ModalUtils from "../../../../utils/ModalUtils";
import AddEditProductModal from "../../AddEditProductModal";
import {Dropdown, Icon} from "semantic-ui-react";
import styles from "../../../../../styles/Admin.module.css";
import FirebaseService from "../../../../../service/FirebaseService";
import ToastUtils from "../../../../utils/toastUtils";
import {moneyPipe} from "../../../../utils/parseUtils";
import GButton, {ButtonType} from "../../../Utils/GButton";
import GTable from "../../../Utils/GTable";

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

    const headers = ["Nombre", "Visible", "Precio", "Acciones"];

    const openEditModal = (p) => {
        ModalUtils.openModal(<AddEditProductModal product={p} update={update}/>)
    }

    const openDeleteDialog = (p) => ModalUtils.dialog("Eliminar " + p.name, "¿Estas segur@ que querés eliminar este producto?", () => onDeleteConfirm(p) )

    const columns = [
        (p: Product) => p.name,
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

export default function ProductsAdmin() {
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

