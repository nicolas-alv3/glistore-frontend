import {Checkbox, Divider, Form, Modal} from "semantic-ui-react";
import React, {ReactNode} from "react";
import ProductService from "../../../service/ProductService";
import styles from '../../../styles/Admin.module.css';
import SelectFilter, {SelectFilterType} from "../SortAndFilter/SelectFilter";
import ImageUploader from "./ImageUploader";
import ToastUtils from "../../utils/toastUtils";
import {Product} from "../../types";
import TalleSelector from "../Utils/TalleSelector";
import GButton, {ButtonType} from "../Utils/GButton";


interface Props {
    trigger: ReactNode,
    update: Function,
    product?: Product
}

export default function AddEditModal(props: Props) {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [submitted, setSubmitted] = React.useState(false);

    const [category, setCategory] = React.useState(props.product?.category || "");
    const [name, setName] = React.useState(props.product?.name || "");
    const [description, setDescription] = React.useState(props.product?.description || "");
    const [price, setPrice] = React.useState(props.product?.price);
    const [discount, setDiscount] = React.useState(props.product?.discount);
    const [selectedTalles, setSelectedTalles] = React.useState(props.product?.talles || []);
    const [images, setImages] = React.useState<string[]>(props.product?.images || []);
    const [isTrending, setIsTrending] = React.useState<boolean>(typeof props.product?.isTrending !== 'boolean' ? false : props.product?.isTrending);
    const [isVisible, setIsVisible] = React.useState<boolean>(typeof props.product?.visible !== 'boolean' ? true : props.product?.visible);

    const resetForm = () => {
        setCategory("");
        setName("");
        setDescription("");
        setPrice(undefined);
        setDiscount(undefined);
        setSelectedTalles([]);
        setImages([]);
        setIsTrending(false);
        setIsVisible(false);
        setLoading(false)
    }

    const handleAddSubmit = (product) => {
        ProductService.create(product)
            .then(() => {
                ToastUtils.success("Creado!");
                resetForm();
                setOpen(false);
                props.update();
            })
    }

    const handleEditSubmit = (product) => {
        ProductService.update({...product, _id: props.product?._id})
            .then(() => {
                ToastUtils.success("Actualizado!");
                resetForm();
                setOpen(false);
                props.update();
            })
    }

    function productIsCorrect() {
        const {
            name,
            description,
            price,
            images,
            talles,
            category,
        } = createProductBody();
        const isCorrect = name && description && price && talles?.length && category && images?.length;
        if (!isCorrect) {
            ToastUtils.error("Hay errores en el formulario");
            setSubmitted(true);
        }
        return isCorrect;
    }

    function createProductBody(): Partial<Product> {
        return {
            name,
            description,
            price: price || 0,
            discount: discount || 0,
            images: images.filter(i => !i.includes("preview")),
            preview: images.find(i => i.includes("preview")) || images[0],
            talles: selectedTalles,
            category: category,
            isTrending,
            visible: isVisible
        };
    }

    const handleSubmit = () => {
        if (!loading && productIsCorrect()) {
            setLoading(true);
            const product = createProductBody();
            if (props.product) {
                handleEditSubmit(product);
            } else {
                handleAddSubmit(product);
            }
        }
    }

    const handleUploadChange = (urls: string[]) => {
        setImages(urls);
    }

    const closeModal = () => {
        setOpen(false);
        resetForm();
    }

    return <Modal
        onClose={closeModal}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={props.trigger}
        size={"small"}
    >
        <Modal.Header>{props.product ? "Editar" : "Agregar"} Producto</Modal.Header>
        <Modal.Content>
            <Form>
                <Form.Field error={!name && submitted}>
                    <label>Nombre</label>
                    <input value={name} onChange={e => setName(e.target.value)} placeholder='Ingresar nombre'/>
                </Form.Field>
                <Form.Field error={!description && submitted}>
                    <label>Descripcion</label>
                    <input value={description} onChange={e => setDescription(e.target.value)}
                           placeholder='Ingresar descripcion'/>
                </Form.Field>
                <Form.Field error={!price && submitted}>
                    <label>Precio</label>
                    <input type={"number"} value={price} onChange={e => setPrice(Number(e.target.value))}
                           placeholder='Ingresar precio'/>
                </Form.Field>
                <Form.Field>
                    <label>Descuento</label>
                    <input type={"number"} value={discount} onChange={e => setDiscount(Number(e.target.value))}
                           placeholder='Ingresar descuento'/>
                </Form.Field>
                <Divider/>
                <ImageUploader
                    images={images}
                    onChange={handleUploadChange} error={submitted && !images.length}/>
                <Divider/>
                <TalleSelector showLabel onSelect={(talles: string[]) => setSelectedTalles(talles)}
                               talles={selectedTalles} error={submitted && !selectedTalles.length}/>
                <Form.Field error={!category && submitted}>
                    <Divider/>
                    <label>Categoría</label>
                    <SelectFilter multiple={false} value={category} setValue={setCategory}
                                  type={SelectFilterType.SELECT_CATEGORY}/>
                </Form.Field>
                <Divider/>
                <Form.Field>
                    <label>Detalles</label>
                    <div className={styles.tallesContainer}>
                        <Checkbox label={"Es visible"} checked={isVisible}
                                  onClick={() => setIsVisible(prevState => !prevState)}/>
                        <Checkbox label={"Es destacado"} checked={isTrending}
                                  onClick={() => setIsTrending(prevState => !prevState)}/>
                    </div>
                </Form.Field>
            </Form>
        </Modal.Content>
        <Modal.Actions>
            <GButton type={ButtonType.TERTIARY} onClick={() => setOpen(false)}>
                Cancelar
            </GButton>
            <GButton
                loading={loading}
                text={props.product ? "Editar" : "Agregar"}
                icon='checkmark'
                onClick={handleSubmit}
                type={ButtonType.PRIMARY}
            />
        </Modal.Actions>
    </Modal>
}