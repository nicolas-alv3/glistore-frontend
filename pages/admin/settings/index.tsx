import GTitle, {GTitleSize} from "../../../src/components/Utils/GTitle";
import React, {useEffect} from "react";
import GButton, {ButtonType} from "../../../src/components/Utils/GButton";
import ActionBar from "../../../src/utils/ActionBar";
import {GColorPallette, GConfig, GMenuItem} from "../../../src/types";
import ConfigService from "../../../service/SettingsService";
import ToastUtils from "../../../src/utils/toastUtils";
import {loadVariables, useConfig} from "../../../src/hooks/useConfig";
import AppreareanceSettings from "../../../src/components/Admin/Settings/AppeareanceSettings";
import ContactDataSettings from "../../../src/components/Admin/Settings/ContactDataSettings";
import StoreInfoSettings from "../../../src/components/Admin/Settings/StoreInfoSettings";
import MenuSettings from "../../../src/components/Admin/Settings/MenuSettings";

export default function Settings() {
    const {reloadConfig} = useConfig();
    const [companyName, setCompanyName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [instaUser, setInstaUser] = React.useState("");
    const [fbLink, setFbLink] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [logo, setLogo] = React.useState("");
    const [colorPalette, setColorPalette] = React.useState<GColorPallette>({} as GColorPallette)
    const [menu, setMenu] = React.useState<GMenuItem[]>([]);

    const [oldConfig, setOldConfig] = React.useState<GConfig>({} as GConfig)

    useEffect(() => {
        ConfigService.getConfig()
            .then((res) => {
                if (res) {
                    setOldConfig(res);
                    setCompanyName(res.companyName);
                    setDescription(res.description);
                    setInstaUser(res.instaUser);
                    setFbLink(res.fbLink);
                    setPhoneNumber(res.phoneNumber);
                    setLogo(res.logo);
                    setColorPalette(res.colorPalette);
                    setMenu(res.menu);
                }
            })
    }, [])

    const pallettesAreDifferent = () => {
        return Object.keys(colorPalette).filter(k => k !== "_id").some(k => oldConfig.colorPalette[k] !== colorPalette[k])
    }

    function menuesAreDifferent() {
        return !menu.every(m => oldConfig.menu.find(me => me.text === m.text && me.href === m.href));
    }

    const showActionBar = () => {
        return oldConfig && (oldConfig.companyName !== companyName ||
            oldConfig.description !== description ||
            oldConfig.phoneNumber !== phoneNumber ||
            oldConfig.instaUser !== instaUser ||
            oldConfig.fbLink !== fbLink ||
            oldConfig.logo !== logo ||
            pallettesAreDifferent() ||
            menuesAreDifferent())
    }

    const handleColorChange = (key) => (e) => {
        setColorPalette(prevState => ({...prevState, [key]: e.target.value}))
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
            logo,
            menu
        }

    }

    function handleSave() {
        ConfigService.update(getBody())
            .then(() => {
                ToastUtils.success("Actualizado!");
                reloadConfig();
                setOldConfig(getBody());
                loadVariables(getBody());
            });
    }

    return <>
        <GTitle size={GTitleSize.LARGE} withDivider>Configuración</GTitle>
        <StoreInfoSettings companyName={companyName} setCompanyName={setCompanyName} description={description} setDescription={setDescription} logo={logo} setLogo={setLogo} />
        <ContactDataSettings instaUser={instaUser} setInstaUser={setInstaUser} fbLink={fbLink} setFbLink={setFbLink} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}/>
        <AppreareanceSettings colorPalette={colorPalette} handleColorChange={handleColorChange}/>
        <MenuSettings menu={menu} setMenu={setMenu} />
        <ActionBar show={showActionBar()} text={"Hemos notado cambios sobre la configuración"}
                   button={<GButton type={ButtonType.PRIMARY} text={"Guardar"} onClick={handleSave}/>}/>
    </>
}
