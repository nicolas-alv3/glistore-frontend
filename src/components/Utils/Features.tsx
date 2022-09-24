import {GFeature, FeatureType} from "../../types";
import React from "react";
import {Divider} from "semantic-ui-react";
import EnumSelector from "./EnumSelector";

interface FeatProps {
    feature: GFeature,
    setFeature: (prevState: any) => void,
    formSubmitted: boolean
}

function Feature( props: FeatProps ) {
    const [value, setValue] = React.useState([]);

    const handleOnSelect = (o) => {
        setValue(o);
        props.setFeature(prevState => ({...prevState, [props.feature.name]: o}))
    }

    function getComponent() {
        switch (props.feature.type) {
            case FeatureType.ENUM_SIMPLE:
                return <EnumSelector key={props.feature.name} label={props.feature.name} valueSelected={value} options={props.feature.options || []} onSelect={handleOnSelect} error={props.formSubmitted && !value.length && props.feature.required} />;
            case FeatureType.ENUM_MULT:
                return <EnumSelector key={props.feature.name} multiple label={props.feature.name} valueSelected={value} options={props.feature.options || []} onSelect={handleOnSelect} error={props.formSubmitted && !value.length && props.feature.required} />;
            default: return <h1>...</h1>;
        }
    }

    return <>
        <Divider/>
        {getComponent()}
    </>
}

interface Props {
    setFeatures: (prevState: any) => void,
    productFeatures: GFeature[],
    formSubmitted: boolean
}

export default function Features(props: Props) {
    return <>
        {props.productFeatures.map(f => <Feature key={f.name} feature={f} setFeature={props.setFeatures} formSubmitted={props.formSubmitted} />)}
    </>
}
