import {Button, Checkbox, Divider, Form, Modal} from "semantic-ui-react";
import React, {ReactNode, useEffect} from "react";
import ProductService from "../../../service/ProductService";
import styles from '../../../styles/Admin.module.css';
import SelectFilter, {SelectFilterType} from "../SortAndFilter/SelectFilter";
import ImageUploader from "./ImageUploader";
import ToastUtils from "../../utils/toastUtils";
import {Product} from "../../types";
import product from "../../../pages/product";


interface Props {
    trigger: ReactNode,
    update: Function,
    product?: Product
}

export default function AddEditModal(props: Props) {
    const [talles, setTalles] = React.useState<string[]>([]);
    const [open, setOpen] = React.useState(false);

    const [category, setCategory] = React.useState("");
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState(0);
    const [discount, setDiscount] = React.useState(0);
    const [selectedTalles, setSelectedTalles] = React.useState(new Array(20).fill(false));
    const [images, setImages] = React.useState<string[]>([]);
    const [isTrending, setIsTrending] = React.useState<boolean>(false);
    const [isVisible, setIsVisible] = React.useState<boolean>(false);

    const getPreviousTalles = () => {
            console.log(talles)
                console.log(props.product?.talles)
            return talles.filter( t => props.product.talles.includes(t))
    }

    const loadStatesFromProduct = () => {
        const {product} = props;
        console.log("Opening ", product)
        setCategory(product.category);
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setDiscount(product.discount);
        setSelectedTalles(getPreviousTalles());
        setImages(product.images);
        setIsTrending(product.isTrending);
        setIsVisible(product.visible);
    }
    useEffect(() => {
        setTalles(ProductService.getTalles());
        if(props.product) {
            loadStatesFromProduct()
        }
    }, [])

    const handleToggleTalle = (idx: number) => {
        const newValues = selectedTalles;
        newValues[idx] = !newValues[idx];
        setSelectedTalles(newValues);
    }

    const getTallesForRequest = () => talles.filter( (t, i) => selectedTalles[i]);

    const resetForm = () => {
        setCategory("");
        setName("");
        setDescription("");
        setPrice(0);
        setDiscount(0);
        setSelectedTalles(new Array(20).fill(false));
        setImages([]);
        setIsTrending(false);
        setIsVisible(false);
    }

    const handleSubmit = () => {
        const body = {
            name,
            description,
            price,
            discount,
            images,
            talles: getTallesForRequest(),
            category: category,
            isTrending,
            visible: isVisible
        }
        console.log(body);
        ProductService.create(body)
            .then( () => {
                ToastUtils.success("Created!");
                resetForm();
                setOpen(false);
                props.update();
            })
    }

    const handleUploadChange = (urls: string[]) => {
        setImages(urls);
    }

    return <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={props.trigger}
        size={"small"}
    >
        <Modal.Header>Agregar Producto</Modal.Header>
        <Modal.Content>
            <Form>
                <Form.Field>
                    <label>Nombre</label>
                    <input value={name} onChange={e => setName(e.target.value)} placeholder='Ingresar nombre' />
                </Form.Field>
                <Form.Field>
                    <label>Descripcion</label>
                    <input value={description} onChange={e => setDescription(e.target.value)} placeholder='Ingresar descripcion' />
                </Form.Field>
                <Form.Field>
                    <label>Precio</label>
                    <input type={"number"} value={price} onChange={e => setPrice(e.target.value)} placeholder='Ingresar precio' />
                </Form.Field>
                <Form.Field>
                    <label>Descuento</label>
                    <input type={"number"} value={discount} onChange={e => setDiscount(e.target.value)} placeholder='Ingresar descuento' />
                </Form.Field>
                <Divider/>
                <ImageUploader images={images} onChange={handleUploadChange}/>
                <Divider/>
                <Form.Field>
                    <label>Talles disponibles</label>
                    <div className={styles.tallesContainer}>
                        {talles.map((t, idx) => <Checkbox key={t} label={t} value={selectedTalles[idx]} onClick={() => handleToggleTalle(idx)}/>)}
                    </div>
                </Form.Field>
                <Form.Field>
                    <Divider/>
                    <label>Categoría</label>
                    <SelectFilter multiple={false} value={category} setValue={setCategory} type={SelectFilterType.SELECT_CATEGORY} />
                </Form.Field>
                <Divider/>
                <Form.Field>
                    <label>Detalles</label>
                    <div className={styles.tallesContainer}>
                        <Checkbox label={"Es visible"} value={isVisible} onClick={() => setIsVisible(prevState => !prevState)}/>
                        <Checkbox label={"Es destacado"} value={isTrending} onClick={() => setIsTrending(prevState => !prevState)}/>
                    </div>
                </Form.Field>
            </Form>
        </Modal.Content>
        <Modal.Actions>
            <Button color='black' onClick={() => setOpen(false)}>
                Cancelar
            </Button>
            <Button
                content="Agregar"
                labelPosition='right'
                icon='checkmark'
                onClick={handleSubmit}
                color={"brown"}
            />
        </Modal.Actions>
    </Modal>
}