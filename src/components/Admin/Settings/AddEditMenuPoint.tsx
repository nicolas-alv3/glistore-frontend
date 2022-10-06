import {GMenuItem} from "../../../types";
import React from "react";
import GModal2 from "../../Utils/GModal2";
import GForm from "../../Utils/GForm";
import GInput from "../../Utils/GInput";
import GButton, {ButtonType} from "../../Utils/GButton";
import {Segment} from "semantic-ui-react";
import GTitle, {GTitleSize} from "../../Utils/GTitle";

export default function AddEditMenuPoint(props: { menuItem?: GMenuItem, onConfirm: (item) => void }) {
    const [name, setName] = React.useState(props.menuItem?.text || "");
    const [URL, setURL] = React.useState(props.menuItem?.href || "");
    const [subItems, setSubitems] = React.useState(props.menuItem?.subItems || []);
    const [submitted, setSubmitted] = React.useState(false);

    const handleSubitemChange = (index, field) => (value) => {
        setSubitems(prevState => prevState.map( (si, i) => i === index ? {...si, [field]: value} : si));
    }

    function formIsValid(): boolean {
        return Boolean(name && (subItems.length || URL) && subItems.every( si => si.text && si.href));
    }

    const handleSubmit = (close) => {
        if(formIsValid()) {
            props.onConfirm({text: name, href: URL, subItems });
            close();
        }
        setSubmitted(true);
    }

    return <GModal2 title={props.menuItem ? "Editar": "Agregar" + " punto de menú"} handleSubmit={handleSubmit} confirmText={props.menuItem ? "Editar": "Agregar"}>
        <GForm>
            <GInput label={"Nombre"} value={name} onChange={setName} error={!name && submitted} errorMessage={"Este campo es requerido"} />
            <div className={"flex-start"}>
                <GInput label={"Enlace a seguir"} error={!URL && submitted} errorMessage={"Este campo es requerido"}
                        value={URL} onChange={setURL} disabled={Boolean(subItems.length)}
                        placeholder={"Ingrese el enlace a seguir"}/>
                <GButton type={ButtonType.TRANSPARENT} icon={"linkify"} text={"Probar link"}
                         onClick={() => window.open(URL, '_blank')}/>
            </div>
            <GButton type={ButtonType.TERTIARY} text={"Agregar subitem"} onClick={ () => setSubitems(prevState => prevState.concat([{href: "", text: ""}]))} />
            {
                subItems.map((si, index) => <Segment key={index}>
                    <GTitle size={GTitleSize.SMALL} title={"Agregar subitem"} />
                    <GInput label={"Nombre"} value={subItems[index].text} onChange={handleSubitemChange(index, "text")} error={!subItems[index].text && submitted} errorMessage={"Este campo es requerido"} />
                    <div className={"flex-start"}>
                        <GInput label={"Enlace a seguir"} error={!subItems[index].href && submitted} errorMessage={"El link es obligatorio"}
                                value={subItems[index].href} onChange={handleSubitemChange(index, "href")}
                                placeholder={"Ingrese el enlace a seguir"}/>
                        <GButton type={ButtonType.TRANSPARENT} icon={"linkify"} text={"Probar link"}
                                 onClick={() => window.open(URL, '_blank')}/>
                    </div>
                </Segment>)
            }
        </GForm>
    </GModal2>;
}