import {Segment} from "semantic-ui-react";
import GTitle, {GTitleSize} from "../../Utils/GTitle";
import GForm from "../../Utils/GForm";
import GInput from "../../Utils/GInput";
import React from "react";
import {GColorPallette} from "../../../types";
import ModalUtils from "../../../utils/ModalUtils";
import GModal2 from "../../Utils/GModal2";

interface Props {
    colorPalette: GColorPallette,
    handleColorChange: (key) => (e) => void
}

export default function AppreareanceSettings(props: Props) {

    const mapColorWithLabel = (key) => {
        switch (key) {
            case "primary":
                return "Color primario";
            case "secondary":
                return "Color secundario";
            case "tertiary":
                return "Color terciario";
            case "quaternary":
                return "Color cuaternario";
            case "primaryFont":
                return "Fuente primaria";
            case "secondaryFont":
                return "Fuente secundaria";
            default:
                return "";
        }
    }

    const mapColorWithBubbleText = (key) => {
        switch (key) {
            case "primary":
                return "Se utiliza en botones y acciones principales";
            case "secondary":
                return "Se utiliza en botones y acciones";
            case "tertiary":
                return "Se utiliza para botones adicionales";
            case "quaternary":
                return "Se utiliza para barra de navegación y pie de página";
            case "primaryFont":
                return "Utilizada en títulos";
            case "secondaryFont":
                return "Utilizada en subtítulos";
            default:
                return "";
        }
    }

    return  <Segment>
        <GTitle size={GTitleSize.MEDIUM} title={"Apariencia"} withDivider/>
        <GForm onSubmit={() => {
        }}>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap"
            }}>
                {
                    Object.keys(props.colorPalette).filter(k => k !== "_id").map(key => <GInput key={key}
                                                                                          label={mapColorWithLabel(key)}
                                                                                          error={false}
                                                                                          helpBubbleText={mapColorWithBubbleText(key)}
                                                                                          errorMessage={""}
                                                                                          input={<input
                                                                                              type={"color"}
                                                                                              value={props.colorPalette[key]}
                                                                                              onChange={props.handleColorChange(key)}/>}/>)
                }
            </div>
        </GForm>
        <a onClick={() => ModalUtils.openModal(<GModal2 title={"Como elegir paleta de colores"}>
            <iframe src="https://scribehow.com/embed/Como_elegir_tu_paleta_de_colores__9715sVfKT9yxojsYOfna-Q"
                    width="100%" height="500"></iframe></GModal2>)}>¿Aún no tienes paleta de colores?</a>
    </Segment>
}