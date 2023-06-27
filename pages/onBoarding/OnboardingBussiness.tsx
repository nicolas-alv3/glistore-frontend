import {useState} from "react";
import GForm from "../../src/components/Utils/GForm";
import GInput from "../../src/components/Utils/GInput";
import GBadge, {GBadgeType} from "../../src/components/Utils/GBadge";
import GButton, {ButtonType} from "../../src/components/Utils/GButton";

export default function OnboardingBussiness({setData}) {
    const [username, setUsername] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [description, setDescription] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const isValidUrl = (formSubmitted) => {
        return !formSubmitted || (username.length > 8 && !username.includes(' '))
    }

    function formIsValid() {
        return isValidUrl(true) && description && companyName;
    }

    const handleSubmit = () => {
        setSubmitted(true);
        if (formIsValid()) {
            setData({username, companyName, description});
        }
    }

    return <GForm>
        <GInput label={"Usuario / URL"} value={username} onChange={setUsername}
                placeholder={"Este nombre aparecerá en tu URL"}
                error={!isValidUrl(submitted)} errorMessage={"El usuario debe contener mas de 8 caracteres, sin espacios"}/>
        <GBadge type={GBadgeType.SECONDARY}><b>La URL de tu tienda será glistore.vercel.app/{username}</b></GBadge>
        <GInput label={"Nombre del negocio"} error={!companyName && submitted} value={companyName}
                onChange={setCompanyName} placeholder={"Ingrese el nombre del negocio aquí"}/>
        <GInput label={"Descripcion"} error={!description && submitted} value={description} onChange={setDescription}
                placeholder={"¿De que se trata tu negocio?"}/>
        <GButton type={ButtonType.PRIMARY} onClick={handleSubmit} icon={'arrow right'} text={'Siguiente'}/>
    </GForm>;
}
