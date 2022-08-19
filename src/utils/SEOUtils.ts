import {getConfig} from "../hooks/getConfig";

export const getSEOConfig = (title?, description?) => {
    const {companyName, meta} = getConfig();

    return ({
        meta: description || meta.description,
        type: 'website',
        url: 'https://pomelobebes.vercel.app',
        title: title || (companyName + " | Store"),
        description: description || meta.description,
    })
};