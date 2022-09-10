import React from "react";
import {FormField, FormGroup} from "semantic-ui-react";
import Image from "next/image";
import GButton, {ButtonType} from "../../Utils/GButton";

export default function ProfilePicture() {
    return <div style={{margin: "auto"}}>
        <FormGroup>
            <FormField>
                <label>Tu foto de perfil</label>
                <div style={{border: "2px dashed var(--col-lightgray)", position: "relative", cursor: "pointer"}} >
                    <div style={{position: "absolute", right: 8, bottom:8, zIndex: 1}}>
                        <GButton type={ButtonType.PRIMARY} icon={"pencil"} />
                    </div>
                <Image layout={"intrinsic"} alt={""}
                    src={"https://firebasestorage.googleapis.com/v0/b/pomelo-bebes.appspot.com/o/fijo%2FLogo_pomelo_largo_blanco.png?alt=media&token=6f040352-90a4-41ed-b3b0-d965d7084421"}
                    width={150} height={150}/>
                    </div>
            </FormField>
        </FormGroup>
    </div>;
}
