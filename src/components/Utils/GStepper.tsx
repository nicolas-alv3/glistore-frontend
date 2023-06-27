import {Icon, SemanticICONS, Step} from "semantic-ui-react";
import {ReactNode} from "react";

export interface GStep {
    title: string,
    description?: string,
    icon: SemanticICONS,
    component: ReactNode
}

interface Props {
    steps: GStep[],
    selected: number // index of selected step
}

export default function GStepper(props: Props) {
    return <>
        <Step.Group fluid>
            {
                props.steps.map(({title, description, icon}, i) => <Step active={i === props.selected} key={title}>
                    <Icon name={icon}/>
                    <Step.Content>
                        <Step.Title>{title}</Step.Title>
                        <Step.Description>{description}</Step.Description>
                    </Step.Content>
                </Step>)
            }
        </Step.Group>
        {props.steps[props.selected].component}
    </>
}
