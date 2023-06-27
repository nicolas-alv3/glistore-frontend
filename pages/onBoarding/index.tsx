import {useEffect, useState} from "react";
import {GConfig, GlistoreConfig} from "../../src/types";
import GForm from "../../src/components/Utils/GForm";
import GInput from "../../src/components/Utils/GInput";
import GButton, {ButtonType} from "../../src/components/Utils/GButton";
import {Message} from "semantic-ui-react";
import {useGRouter} from "../../src/hooks/useGRouter";
import NavbarLPage from "../../src/components/LandingPage/NavbarLPage";
import OnboardingBussiness from "./OnboardingBussiness";
import GStepper, {GStep} from "../../src/components/Utils/GStepper";
import SettingsService from "../../service/SettingsService";
import {useUser, withPageAuthRequired} from "@auth0/nextjs-auth0";
import ToastUtils from "../../src/utils/toastUtils";

function OnboardingContact(props: { setData: (partialData: Partial<GConfig>) => void }) {
    const [fbLink, setFbLink] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [instaUser, setInstaUser] = useState('');
    const [submitted, setSubmitted] = useState(false);


    function formIsValid() {
        return fbLink && phoneNumber && instaUser;
    }

    const handleSubmit = () => {
        setSubmitted(true);
        if (formIsValid()) {
            props.setData({fbLink, phoneNumber, instaUser});
        }
    }

    return <GForm>
        <GInput label={"Link a pagina de facebook"} value={fbLink} onChange={setFbLink}
                placeholder={"Este nombre aparecerá en tu URL"}
                error={!fbLink && submitted}/>
        <GInput label={"Número de whatsapp"} error={!phoneNumber && submitted} value={phoneNumber}
                onChange={setPhoneNumber} placeholder={"+54911111111"}/>
        <GInput label={"Usuario de instagram"} error={!instaUser && submitted} value={instaUser} onChange={setInstaUser}
                placeholder={"¿De que se trata tu negocio?"}/>
        <GButton type={ButtonType.PRIMARY} onClick={handleSubmit} icon={'arrow right'} text={'Siguiente'}/>
    </GForm>;
}

function OnboardingFinish(props) {
    return <>
        <Message
            icon='check'
            color={"blue"}
            header='Perfecto'
            content='¡Hoy comienza tu aventura en Glistore!'
        />
        <GButton type={ButtonType.PRIMARY} text={"Finalizar"} onClick={props.onFinish} />
    </>;
}

const OnBoarding = () => {
    const {router} = useGRouter();
    const {user} = useUser();
    const [data, setData] = useState<GConfig>({} as GConfig);
    const [selectedStep, setSelectedStep] = useState<number>(0);

    useEffect(() => {
        SettingsService.getStoreByEmail(user?.email).then(config => {
            if (config) {
                router.push(`/${config.username}/admin`)
            }
        }).catch(() => console.log("Store with this email does not exist"))
    }, [router, user?.email])

    const setDataAndNext = (partialData: Partial<GConfig>) => {
        setData(prevState => ({...prevState, ...partialData}));
        setSelectedStep(prevStep => prevStep + 1)
    }

    const onFinish = () => {
        SettingsService.create({...GlistoreConfig, ...data, userEmail: user?.email as string})
            .then( () => {
                ToastUtils.success("Perfecto! Vamos allí");
                setTimeout( () => router.push(`/${data.username}/admin`), 500);
            })
    }
    const steps: GStep[] = [
        {
            title: "Tu negocio",
            description: "Ingresa los datos de tu empresa",
            icon: "building",
            component: <OnboardingBussiness setData={setDataAndNext}/>
        },
        {
            title: "Contacto",
            description: "¿Como te contactarán tus clientes?",
            icon: "mobile",
            component: <OnboardingContact setData={setDataAndNext}/>
        },
        {
            title: "¡Todo listo!",
            description: "",
            icon: "check",
            component: <OnboardingFinish onFinish={onFinish}/>
        },

    ]
    return <>
        <NavbarLPage/>
        <GStepper steps={steps} selected={selectedStep}/>
    </>
}

export default withPageAuthRequired(OnBoarding)
