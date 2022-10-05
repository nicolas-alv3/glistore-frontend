import GTitle, {GTitleSize} from "../../../Utils/GTitle";
import React from "react";
import {FeatureType, GFeature} from "../../../../types";
import GBadge, {GBadgeType} from "../../../Utils/GBadge";
import GButton, {ButtonType} from "../../../Utils/GButton";
import ModalUtils from "../../../../utils/ModalUtils";
import AddEditFeatureModal from "../../../Utils/AddEditFeatureModal";

interface Props {
    feature: GFeature,
    onUpdate: (feature: GFeature, idx: number) => void,
    index: number
}

export default function FeatureCard(props: Props) {

    const getBadgeText = (type: FeatureType) => {
        switch (type) {
            case FeatureType.ENUM_SIMPLE:
                return "Selección simple";
            case FeatureType.ENUM_MULT:
                return "Seleccion múltiple";
            default:
                return "";
        }
    }

    const openEditModal = () => {
        ModalUtils.openModal(<AddEditFeatureModal onChange={ feature => props.onUpdate(feature, props.index)} feature={props.feature}/>)
    }
    return <div style={{
        width: "300px",
        margin: "5px",
        minHeight: "100px",
        borderRadius: "8px",
        border: "2px solid var(--col-lightgray)",
        padding: "0 16px",
        position: "relative"
    }}>
        <GTitle size={GTitleSize.SMALL}>
            {props.feature.name}
            <GBadge type={GBadgeType.SECONDARY} text={getBadgeText(props.feature.type)}/>
        </GTitle>
        <b>Opciones:</b>
        <div>
            {props.feature.enumerable.toString()}
        </div>
        <div style={{ position:"absolute", right: 0, top: 0}}>
            <GButton type={ButtonType.TRANSPARENT} icon={"pencil"} onClick={openEditModal}/>
        </div>
    </div>
}