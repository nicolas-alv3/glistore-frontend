import React from "react";
import CategoryService from "../../../../../service/CategoryService";
import {GCategory} from "../../../../types";
import ToastUtils from "../../../../utils/toastUtils";
import GModal2 from "../../../Utils/GModal2";
import GInput from "../../../Utils/GInput";
import GForm from "../../../Utils/GForm";


interface Props {
    update: Function,
    category?: GCategory,
    categories: GCategory[]
}

export default function AddEditCategoryModal(props: Props) {
    const [submitted, setSubmitted] = React.useState(false);

    const [name, setName] = React.useState(props.category || "");


    const resetForm = () => {
        setName("");
    }

    const handleAddSubmit = (category, closeModal: () => void) => {
        CategoryService.update(props.categories.concat([category]))
            .then(() => {
                ToastUtils.success("Creado!");
                resetForm();
                props.update();
                closeModal();
            })
    }

    const handleEditSubmit = (category: GCategory, closeModal: () => void) => {
        CategoryService.update(props.categories.filter(c => c!== props.category).concat(category))
            .then(() => {
                ToastUtils.success("Actualizado!");
                resetForm();
                props.update();
                closeModal();
            })
    }

    const handleSubmit = (closeModal) => {
        if (name) {
            if (props.category) {
                handleEditSubmit(name, closeModal);
            } else {
                handleAddSubmit(name, closeModal);
            }
        }
        setSubmitted(true);
    }

    return <GModal2 title={props.category ? "Editar" : "Agregar" + " categoría"} handleSubmit={(handleSubmit)}>
        <GForm>
            <GInput value={name} onChange={setName} label={"Nombre"} error={Boolean(!name && submitted)}/>
        </GForm>
    </GModal2>
}
