import GTitle, {GTitleSize} from "../../Utils/GTitle";
import React from "react";
import {FeatureType, GFeature} from "../../../types";
import GBadge, {GBadgeType} from "../../Utils/GBadge";

export default function FeatureCard(props: { feature: GFeature }) {

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
    return <div style={{
        width: "250px",
        margin: "5px",
        minHeight: "100px",
        border: "2px solid var(--col-lightgray)",
        padding: "0 16px",
        position: "relative"
    }}>
        <GTitle padding={"8px 0 0 0"} size={GTitleSize.SMALL}>
            {props.feature.name}
            <GBadge type={GBadgeType.SECONDARY} text={getBadgeText(props.feature.type)}/></GTitle>
        <b>Opciones:</b>
        <div>
            {props.feature.enumerable.toString()}
        </div>
    </div>
}