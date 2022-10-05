import {Divider, Form, Modal} from "semantic-ui-react";
import React from "react";
import TemplateService from "../../../../../service/TemplateService";
import {GFeature, GTemplate} from "../../../../types";
import ToastUtils from "../../../../utils/toastUtils";
import GButton, {ButtonType} from "../../../Utils/GButton";
import AddEditFeatureModal from "../../../Utils/AddEditFeatureModal";
import ModalUtils from "../../../../utils/ModalUtils";
import AddDashedButton from "../../../Utils/AddDashedButton";
import GTitle, {GTitleSize} from "../../../Utils/GTitle";
import FeatureCard from "./FeatureCard";


interface Props {
    update: Function,
    template?: GTemplate
}

export default function AddEditTemplateModal(props: Props) {
    const [open, setOpen] = React.useState(true);
    const [submitted, setSubmitted] = React.useState(false);

    const [name, setName] = React.useState(props.template?.name || "");
    const [features, setFeatures] = React.useState<GFeature[]>(props.template?.features || []);

    const resetForm = () => {
        setName("");
    }

    const handleAddSubmit = (template) => {
        TemplateService.create(template)
            .then(() => {
                ToastUtils.success("Creado!");
                resetForm();
                setOpen(false);
                props.update();
            })
    }

    const handleEditSubmit = (template) => {
        TemplateService.update(template)
            .then(() => {
                ToastUtils.success("Actualizado!");
                resetForm();
                setOpen(false);
                props.update();
            })
    }

    function templateIsCorrect() {
        const isCorrect = name && features.length;
        if (!isCorrect) {
            ToastUtils.error("Hay errores en el formulario");
            setSubmitted(true);
        }
        return isCorrect;
    }

    function createTemplateBody(): GTemplate {
        return {
            _id: props.template?._id,
            name,
            features
        };
    }

    const handleSubmit = () => {
        if (templateIsCorrect()) {
            const product = createTemplateBody();
            if (props.template) {
                handleEditSubmit(product);
            } else {
                handleAddSubmit(product);
            }
        }
    }

    const closeModal = () => {
        setOpen(false);
        resetForm();
    }

    const openAddModal = () => ModalUtils.openModal(<AddEditFeatureModal onChange={(f) => setFeatures(prevState => prevState.concat([f]))}/>)

    const updateFeature = (feature: GFeature, index: number) => {
        setFeatures(prevState => prevState.map( (f, i) => index === i ? feature : f))
    }

    return <Modal
        onClose={closeModal}
        onOpen={() => setOpen(true)}
        open={open}
        size={"small"}
    >
        <Modal.Header>{props.template ? "Editar" : "Agregar"} Template </Modal.Header>
        <Modal.Content>
            <Form>
                <Form.Field error={!name && submitted}>
                    <label>Nombre</label>
                    <input value={name} onChange={e => setName(e.target.value)} placeholder='Ingresar nombre'/>
                </Form.Field>
                <Divider/>
            </Form>
            <GTitle size={GTitleSize.SMALL}>Características</GTitle>
            <div style={{display: "flex", justifyContent:"flex-start", flexWrap:"wrap"}}>
                {
                    features.map((f, i) => <FeatureCard key={f.name} feature={f} onUpdate={updateFeature} index={i}/>)
                }
                <AddDashedButton label={"Agregar característica"} onClick={openAddModal} />
            </div>
        </Modal.Content>
        <Modal.Actions>
            <GButton type={ButtonType.TERTIARY} onClick={() => setOpen(false)}>
                Cancelar
            </GButton>
            <GButton
                text={props.template ? "Editar" : "Agregar"}
                icon='checkmark'
                onClick={handleSubmit}
                type={ButtonType.PRIMARY}
            />
        </Modal.Actions>
    </Modal>
}