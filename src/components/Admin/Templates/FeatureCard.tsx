import GTitle, {GTitleSize} from "../../Utils/GTitle";
import {Icon} from "semantic-ui-react";

export default function FeatureCard({ feature}) {
    return <div style={{
        width: "100%",
        height: "128px",
        border: "2px solid var(--col-lightgray)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }}>
        <GTitle size={GTitleSize.SMALL}>{feature.name}</GTitle>
    </div>
}