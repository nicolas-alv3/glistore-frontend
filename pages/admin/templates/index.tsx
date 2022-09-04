import CRUDPage from "../../../src/components/Utils/CRUDPage";
import GTable from "../../../src/components/Utils/GTable";
import TemplateService from "../../../service/TemplateService";
import {GTemplate} from "../../../src/types";
import GButton, {ButtonType} from "../../../src/components/Utils/GButton";
import ActionMore, {ActionOption} from "../../../src/components/Utils/ActionMore";

export default function Templates() {
    const options: ActionOption[] = [
        {onClick: () => {}, text: "Editar", icon:"pencil"},
        {onClick: () => {}, text: "Eliminar", icon:"delete"},
    ]

    const columns = [
        (t: GTemplate) => t.name,
        (t: GTemplate) => t.features.map(f=>f.name).toString(),
        (t: GTemplate) => <ActionMore options={options} />
    ]
    const table = <GTable elements={TemplateService.getTemplates()} headers={["Nombre","Características", "Acciones"]} columns={columns} />
    return <CRUDPage table={table} title={"Plantillas"} addButton={<GButton type={ButtonType.PRIMARY} text={"Agregar"} icon={"plus"}/>}/>
}