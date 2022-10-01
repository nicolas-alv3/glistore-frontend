import GTitle, {GTitleSize} from "../../Utils/GTitle";
import GForm from "../../Utils/GForm";
import GInput from "../../Utils/GInput";
import LogoPicture from "./LogoImage";
import {Segment} from "semantic-ui-react";
import React, {Dispatch, SetStateAction} from "react";

interface Props {
    companyName: string,
    setCompanyName:Dispatch<SetStateAction<string>> ,
    description: string,
    setDescription: Dispatch<SetStateAction<string>>,
    logo: string,
    setLogo: Dispatch<SetStateAction<string>>
}

export default function StoreInfoSettings(props:Props) {
    return <Segment>
        <GTitle size={GTitleSize.MEDIUM} title={"Tu tienda"} withDivider/>
        <GForm onSubmit={() => {
        }}>
            <div style={{display: "flex", justifyContent: "flex-start", flexWrap: "wrap"}}>
                <div style={{width: "min(800px, 100%)"}}>
                    <GInput onChange={props.setCompanyName} label={"Nombre de la tienda"} error={false} errorMessage={""}
                            value={props.companyName} placeholder={"Ingrese nombre de la tienda"}/>
                    <GInput onChange={props.setDescription} label={"Descripción de la tienda"} error={false}
                            errorMessage={""}
                            value={props.description} placeholder={"Ingrese descripción de la tienda"}/>
                </div>
                <LogoPicture setLogo={props.setLogo} logo={props.logo}/>
            </div>
        </GForm>
    </Segment>
}