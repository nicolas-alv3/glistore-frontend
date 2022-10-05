import ToastUtils from "../../../../utils/toastUtils";
import ModalUtils from "../../../../utils/ModalUtils";
import CRUDPage from "../../../Utils/CRUDPage";
import GTable from "../../../Utils/GTable";
import ActionMore, {ActionOption} from "../../../Utils/ActionMore";
import React, {useEffect} from "react";
import GButton, {ButtonType} from "../../../Utils/GButton";
import TemplateService from "../../../../../service/TemplateService";
import {GTemplate} from "../../../../types";
import AddEditTemplateModal from "./AddEditTemplateModal";

export default function Templates() {
    const [templates, setTemplates] = React.useState([]);

    useEffect(() => {
        fetchTemplates();
    }, [])

    const fetchTemplates = () => TemplateService.getTemplates()
        .then(res => setTemplates(res));

    const deleteTemplate = (template: GTemplate) => {
        TemplateService.delete(template._id as string)
            .then(() => {
                ToastUtils.success("Eliminado exitosamente");
                fetchTemplates();
            });
    }

    const handleDelete = (t) => {
        ModalUtils.dialog("Eliminar formato", "¿Estas segur@ que deseas eliminarla?", () => deleteTemplate(t))
    }

    function getOptions(template: GTemplate): ActionOption[] {
        return [
            { onClick: () => openEditModal(template), text: "Editar", icon: "pencil" },
            { onClick: () => handleDelete(template), text: "Eliminar", icon: "delete" },
        ]
    }

    const columns = [
        (t: GTemplate) => t.name,
        (t: GTemplate) => t.features.map(f => f.name).toString(),
        (t: GTemplate) => <ActionMore options={getOptions(t)}/>
    ]
    const openModal = () => ModalUtils.openModal(
        <AddEditTemplateModal update={fetchTemplates}/>
    );

    const openEditModal = (template: GTemplate) => ModalUtils.openModal(
        <AddEditTemplateModal update={fetchTemplates} template={template}/>
    );
    const table = <GTable elements={templates} headers={["Nombre", "Características", "Acciones"]} columns={columns}/>
    return <CRUDPage table={table} title={"Formatos"}
                     addButton={<GButton type={ButtonType.PRIMARY} text={"Agregar"} icon={"plus"}
                                         onClick={openModal}/>}/>
}