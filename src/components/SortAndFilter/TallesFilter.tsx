import React, {useEffect} from "react";
import TalleSelector from "../Utils/TalleSelector";
import {useGRouter} from "../../hooks/useGRouter";

export default function TallesFilter( { onChange }) {
    const {getReq, router} = useGRouter();

    const [talles, setTalles] = React.useState<string[]>([]);

    useEffect(() => {
        setTalles(getReq().filter.talles);
    }, [router.query])


    return <div>
            <TalleSelector multiple={true} onSelect={(talles: string[]) => {
                setTalles(talles);
                onChange(talles);
            }} talles={talles}/>
    </div>
}