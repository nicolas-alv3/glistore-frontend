import {Divider, Form, Modal} from "semantic-ui-react";
import React from "react";
import TemplateService from "../../../../service/TemplateService";
import {FeatureType, GFeature, GTemplate} from "../../../types";
import ToastUtils from "../../../utils/toastUtils";
import GButton, {ButtonType} from "../../Utils/GButton";
import AddEditFeatureModal from "../../Utils/AddEditFeatureModal";
import ModalUtils from "../../../utils/ModalUtils";
import AddDashedButton from "../../Utils/AddDashedButton";
import GTitle, {GTitleSize} from "../../Utils/GTitle";
import FeatureCard from "./FeatureCard";


interface Props {
    update: Function,
    template?: GTemplate
}

export default function AddEditTemplateModal(props: Props) {
    const [open, setOpen] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [submitted, setSubmitted] = React.useState(false);

    const [name, setName] = React.useState("");
    const [features, setFeatures] = React.useState<GFeature[]>([]);



    const resetForm = () => {
        setLoading(false)
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
        TemplateService.create(template)
            .then(() => {
                ToastUtils.success("Creado!");
                resetForm();
                setOpen(false);
                props.update();
            })
    }

    function templateIsCorrect() {
        const {
            name,
            features:[]
        } = createTemplateBody();
        const isCorrect = name && features.length;
        if (!isCorrect) {
            ToastUtils.error("Hay errores en el formulario");
            setSubmitted(true);
        }
        return isCorrect;
    }

    function createTemplateBody(): GTemplate {
        return {
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
        };
    }

    const handleSubmit = () => {
        if (!loading && templateIsCorrect()) {
            setLoading(true);
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

    const openAddModal = () => ModalUtils.openModal(<AddEditFeatureModal formSubmitted={submitted} onChange={(f) => setFeatures(prevState => prevState.concat([f]))} features={features}/>)

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
            <div style={{display: "flex", justifyContent:"space-between", flexWrap:"wrap"}}>
                <AddDashedButton label={"Agregar característica"} onClick={openAddModal} />
                {
                    features.map(f => <FeatureCard key={f.name} feature={f}/>)
                }
            </div>
        </Modal.Content>
        <Modal.Actions>
            <GButton type={ButtonType.TERTIARY} onClick={() => setOpen(false)}>
                Cancelar
            </GButton>
            <GButton
                loading={loading}
                text={props.template ? "Editar" : "Agregar"}
                icon='checkmark'
                onClick={handleSubmit}
                type={ButtonType.PRIMARY}
            />
        </Modal.Actions>
    </Modal>
}