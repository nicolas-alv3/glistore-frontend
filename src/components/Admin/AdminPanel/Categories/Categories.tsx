import React, {useEffect} from "react";
import {GCategory} from "../../../../types";
import ToastUtils from "../../../../utils/toastUtils";
import ModalUtils from "../../../../utils/ModalUtils";
import ActionMore, {ActionOption} from "../../../Utils/ActionMore";
import GTable from "../../../Utils/GTable";
import CRUDPage from "../../../Utils/CRUDPage";
import GButton, {ButtonType} from "../../../Utils/GButton";
import CategoryService from "../../../../../service/CategoryService";
import AddEditCategoryModal from "./AddEditCategoryModal";

export default function Categories() {
    const [categories, setCategories] = React.useState<GCategory[]>([]);

    useEffect(() => {
        fetchCategories();
    }, [])

    const fetchCategories = () => CategoryService.getCategories()
        .then(res => setCategories(res));

    const deleteCategory = (category: GCategory) => {
        CategoryService.update(categories.filter(c => c!== category))
            .then(() => {
                ToastUtils.success("Eliminado exitosamente");
                fetchCategories();
            });
    }

    const handleDelete = (c) => {
        ModalUtils.dialog("Eliminar categoría", "¿Estas segur@ que deseas eliminarla?", () => deleteCategory(c))
    }

    function getOptions(category: GCategory): ActionOption[] {
        return [
            { onClick: () => openEditModal(category), text: "Editar", icon: "pencil" },
            { onClick: () => handleDelete(category), text: "Eliminar", icon: "delete" },
        ]
    }

    const columns = [
        (c: GCategory) => c,
        (c: GCategory) => <ActionMore options={getOptions(c)}/>
    ]
    const openModal = () => ModalUtils.openModal(
        <AddEditCategoryModal update={fetchCategories} categories={categories}/>
    );

    const openEditModal = (category: GCategory) => ModalUtils.openModal(
        <AddEditCategoryModal update={fetchCategories} category={category} categories={categories}/>
    );
    const table = <GTable elements={categories} headers={["Nombre", "Acciones"]} columns={columns}/>
    return <CRUDPage table={table} title={"Formatos"}
                     addButton={<GButton type={ButtonType.PRIMARY} text={"Agregar"} icon={"plus"}
                                         onClick={openModal}/>}/>
}
