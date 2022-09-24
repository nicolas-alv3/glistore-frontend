import CRUDPage from "../../../src/components/Utils/CRUDPage";
import GTable from "../../../src/components/Utils/GTable";
import TemplateService from "../../../service/TemplateService";
import {GTemplate} from "../../../src/types";
import GButton, {ButtonType} from "../../../src/components/Utils/GButton";
import ActionMore, {ActionOption} from "../../../src/components/Utils/ActionMore";
import React, {useEffect} from "react";
import ModalUtils from "../../../src/utils/ModalUtils";
import AddEditTemplateModal from "../../../src/components/Admin/Templates/AddEditTemplateModal";
import ToastUtils from "../../../src/utils/toastUtils";

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