import GTitle, {GTitleSize} from "../../Utils/GTitle";
import GForm from "../../Utils/GForm";
import GInput from "../../Utils/GInput";
import GButton, {ButtonType} from "../../Utils/GButton";
import WhatsappService from "../../../../service/WhatsappService";
import {Segment} from "semantic-ui-react";
import React, {Dispatch, SetStateAction} from "react";
import InlineFormControl from "../../Utils/InlineFormControl";

interface Props {
    instaUser: string,
    setInstaUser: Dispatch<SetStateAction<string>>,
    fbLink: string,
    setFbLink: Dispatch<SetStateAction<string>>,
    phoneNumber: string,
    setPhoneNumber: Dispatch<SetStateAction<string>>
}

export default function ContactDataSettings(props: Props) {
    return <Segment>
        <GTitle size={GTitleSize.MEDIUM} title={"Datos de contacto"} withDivider/>
        <GForm onSubmit={() => {
        }}>
            <InlineFormControl>
                <GInput onChange={props.setInstaUser} label={"Link de instagram"} error={false} errorMessage={""}
                        value={props.instaUser} placeholder={"Ingrese usuario de instagram"}/>
                <GButton type={ButtonType.TRANSPARENT} icon={"linkify"} text={"Probar link"}
                         onClick={() => window.open(props.instaUser, '_blank')}/>
            </InlineFormControl>
            <InlineFormControl>
                <GInput onChange={props.setFbLink} label={"Link de Facebook"} error={false} errorMessage={""}
                        value={props.fbLink}
                        placeholder={"Ingrese link de facebook"}/>
                <GButton type={ButtonType.TRANSPARENT} icon={"linkify"} text={"Probar link"}
                         onClick={() => window.open(props.fbLink, '_blank')}/>
            </InlineFormControl>
            <InlineFormControl>
                <GInput onChange={props.setPhoneNumber} label={"Numero de whatsapp (sin espacios)"} error={false}
                        errorMessage={""} value={props.phoneNumber} placeholder={"+5491112345678"}/>
                <GButton type={ButtonType.TRANSPARENT} icon={"whatsapp"} text={"Probar link"}
                         onClick={() => WhatsappService.sendWhatsappMessage("Hey! La prueba fue exitosa :D", props.phoneNumber)}/>
            </InlineFormControl>
        </GForm>
    </Segment>
}
