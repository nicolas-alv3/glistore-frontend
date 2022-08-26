import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {selectFilterState} from "../../../slices/filterSlice";
import TalleSelector from "../Utils/TalleSelector";

export default function TallesFilter( { onChange }) {
    const filterStateReq = useSelector(selectFilterState).req;

    const [talles, setTalles] = React.useState<string[]>([]);

    useEffect(() => {
        setTalles([]);
    }, [filterStateReq])


    return <div>
            <TalleSelector onSelect={(talles: string[]) => {
                setTalles(talles);
                onChange(talles);
            }} talles={talles.concat(filterStateReq.filter.talles)}/>
    </div>
}