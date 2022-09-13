import React from "react";
import {FormField, FormGroup, Loader} from "semantic-ui-react";
import Image from "next/image";
import GButton, {ButtonType} from "../../Utils/GButton";
import FirebaseService, {IMAGE_QUALITY} from "../../../../service/FirebaseService";
import {useConfig} from "../../../hooks/useConfig";

export default function LogoPicture({ logo, setLogo}) {
    const fileRef = React.useRef<HTMLInputElement>(null);
    const [loading, setLoading] = React.useState(false);
    const {config} = useConfig();

    const handleChange = (event) => {
        setLoading(true)
        FirebaseService.upload(event.target.files[0], setLoading, {
            quality: IMAGE_QUALITY.LOW,
            width:500,
            height:500
        },`${config.companyName}_logo`, "/logo")
            .then( url => {
                setLoading(false);
                setLogo(url);
            });
    };
    return <div style={{margin: "auto"}}>
        <FormGroup>
            <FormField>
                <label>Tu foto de perfil</label>
                <div style={{border: "2px dashed var(--col-lightgray)", position: "relative", cursor: "pointer"}}>
                    <div style={{position: "absolute", right: 8, bottom: 8, zIndex: 1}}>
                        <GButton type={ButtonType.PRIMARY} icon={"pencil"} onClick={() => fileRef.current.click()}>
                            <input id="upload" name="upload" multiple={false} type="file" ref={fileRef} hidden onChange={handleChange}/>
                        </GButton>
                    </div>
                    {
                        loading ? <div style={{width: 150, height: 150}}>
                            <Loader active={loading} />
                        </div> :
                            <Image layout={"intrinsic"} alt={""} objectFit={"cover"}
                                   src={logo || "https://user-images.githubusercontent.com/20684618/31289519-9ebdbe1a-aae6-11e7-8f82-bf794fdd9d1a.png"}
                                   width={150} height={150}/>
                    }
                </div>
            </FormField>
        </FormGroup>
    </div>;
}
