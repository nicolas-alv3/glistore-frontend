import GTitle, {GTitleSize} from "../../../src/components/Utils/GTitle";
import React, {useEffect} from "react";
import GInput from "../../../src/components/Utils/GInput";
import GForm from "../../../src/components/Utils/GForm";
import {Segment} from "semantic-ui-react";
import GButton, {ButtonType} from "../../../src/components/Utils/GButton";
import ActionBar from "../../../src/utils/ActionBar";
import {GColorPallette, GConfig} from "../../../src/types";
import LogoPicture from "../../../src/components/Admin/Settings/LogoImage";
import ConfigService from "../../../service/SettingsService";
import ToastUtils from "../../../src/utils/toastUtils";
import {loadVariables, useConfig} from "../../../src/hooks/useConfig";
import WhatsappService from "../../../service/WhatsappService";

export default function Settings() {
    const { reloadConfig } = useConfig();
    const [companyName, setCompanyName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [instaUser, setInstaUser] = React.useState("");
    const [fbLink, setFbLink] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [logo, setLogo] = React.useState("");
    const [colorPalette, setColorPalette] = React.useState<GColorPallette>({} as GColorPallette)

    const [oldConfig, setOldConfig] = React.useState<GConfig>({} as GConfig)

    useEffect(() => {
        ConfigService.getConfig()
            .then((res) => {
                if(res) {
                    setOldConfig(res);
                    setCompanyName(res.companyName);
                    setDescription(res.description);
                    setInstaUser(res.instaUser);
                    setFbLink(res.fbLink);
                    setPhoneNumber(res.phoneNumber);
                    setLogo(res.logo);
                    setColorPalette(res.colorPalette);
                }
            })
    }, [])

    const pallettesAreDifferent = () => {
        return Object.keys(colorPalette).filter(k=>k!=="_id").some( k => oldConfig.colorPalette[k] !== colorPalette[k])
    }

    const showActionBar = () => {
        return oldConfig && (oldConfig.companyName !== companyName ||
            oldConfig.description !== description ||
            oldConfig.phoneNumber !== phoneNumber ||
            oldConfig.instaUser !== instaUser ||
            oldConfig.fbLink !== fbLink ||
            oldConfig.logo !== logo ||
            pallettesAreDifferent())
    }

    const handleColorChange = (key) => (e) => {
        setColorPalette(prevState => ({...prevState, [key]: e.target.value}))
    }

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

    function getBody(): GConfig {
        return {
            _id: oldConfig._id,
            description,
            instaUser,
            fbLink,
            phoneNumber,
            colorPalette,
            companyName,
            logo
        }

    }

    function handleSave() {
        ConfigService.update(getBody())
            .then( () => {
                ToastUtils.success("Actualizado!");
                reloadConfig();
                setOldConfig(getBody());
                loadVariables(getBody());
            });
    }

    return <>
        <GTitle size={GTitleSize.LARGE} withDivider>Configuración</GTitle>
        <Segment>
            <GTitle size={GTitleSize.MEDIUM} title={"Tu tienda"} withDivider/>
            <GForm onSubmit={() => {
            }}>
                <div style={{display: "flex", justifyContent: "flex-start", flexWrap: "wrap"}}>
                    <div style={{width: "min(800px, 100%)"}}>
                        <GInput onChange={setCompanyName} label={"Nombre de la tienda"} error={false} errorMessage={""}
                                value={companyName} placeholder={"Ingrese nombre de la tienda"}/>
                        <GInput onChange={setDescription} label={"Descripción de la tienda"} error={false}
                                errorMessage={""}
                                value={description} placeholder={"Ingrese descripción de la tienda"}/>
                    </div>
                    <LogoPicture setLogo={setLogo} logo={logo}/>
                </div>
            </GForm>
            <GTitle size={GTitleSize.MEDIUM} title={"Datos de contacto"} withDivider/>
            <GForm onSubmit={() => {
            }}>
                <div className={"flex-start"}>
                    <GInput onChange={setInstaUser}  label={"Link de instagram"} error={false} errorMessage={""}
                            value={instaUser} placeholder={"Ingrese usuario de instagram"}/>
                    <GButton type={ButtonType.TRANSPARENT} icon={"linkify"} text={"Probar link"} onClick={ () => window.open(instaUser, '_blank')}/>
                </div>
                <div className={"flex-start"}>
                    <GInput onChange={setFbLink} label={"Link de Facebook"} error={false} errorMessage={""} value={fbLink}
                            placeholder={"Ingrese link de facebook"}/>
                    <GButton type={ButtonType.TRANSPARENT} icon={"linkify"} text={"Probar link"} onClick={ () => window.open(fbLink, '_blank')}/>
                </div>
                <div className={"flex-start"}>
                <GInput onChange={setPhoneNumber} label={"Numero de whatsapp (sin espacios)"} error={false}
                        errorMessage={""} value={phoneNumber} placeholder={"+5491112345678"}/>
                    <GButton type={ButtonType.TRANSPARENT} icon={"whatsapp"} text={"Probar link"} onClick={ () => WhatsappService.sendWhatsappMessage("Hey! La prueba fue exitosa :D", phoneNumber)}/>
                </div>
            </GForm>
        </Segment>

        <Segment>
            <GTitle size={GTitleSize.MEDIUM} title={"Apariencia"} withDivider/>
            <GForm onSubmit={() => {
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around",
                    flexWrap: "wrap"
                }}>
                    {
                        Object.keys(colorPalette).filter(k => k !== "_id").map(key => <GInput key={key}
                                                                                              label={mapColorWithLabel(key)}
                                                                                              error={false}
                                                                                              helpBubbleText={mapColorWithBubbleText(key)}
                                                                                              errorMessage={""}
                                                                                              input={<input
                                                                                                  type={"color"}
                                                                                                  value={colorPalette[key]}
                                                                                                  onChange={handleColorChange(key)}/>}/>)
                    }
                </div>
            </GForm>
        </Segment>
        <ActionBar show={showActionBar()} text={"Hemos notado cambios sobre la configuración"}
                   button={<GButton type={ButtonType.PRIMARY} text={"Guardar"} onClick={handleSave}/>}/>
    </>
}
