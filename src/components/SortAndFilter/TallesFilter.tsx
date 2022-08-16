import {Checkbox} from "semantic-ui-react";
import React, {useEffect} from "react";
import ProductService from "../../../service/ProductService";
import {useDispatch, useSelector} from "react-redux";
import {selectFilterState, setPartialReq} from "../../../slices/filterSlice";
import {withoutDuplicates} from "../../utils/parseUtils";

export default function TallesFilter( { onChange }) {
    const filterStateReq = useSelector(selectFilterState).req;

    const [talles, setTalles] = React.useState<string[]>([]);

    useEffect(() => {
        setTalles([]);
    }, [filterStateReq])

    const handleClick = (t: string) => {

        setTalles( prevState => prevState.concat([t as string]));
        onChange(withoutDuplicates(talles.concat([t]).concat(filterStateReq.filter.talles)))
    }

    return <div>
        {
            ProductService.getTalles().map( (talle: string) => <span key={talle} style={{margin: "8px"}}>
                    <Checkbox label={talle} onClick={() => handleClick(talle)} checked={filterStateReq.filter.talles.concat(talles).includes(talle)} />
                </span> )}
    </div>
}