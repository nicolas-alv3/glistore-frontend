import {getConfig} from "../hooks/getConfig";

export const getSEOConfig = (title?, description?) => {
    const {companyName, meta} = getConfig();

    return ({
        type: 'website',
        url: 'https://pomelobebes.vercel.app',
        title: title || (companyName + " | Store"),
        description: description || meta.description,
        images: [
            {
                url: '/favicon.ico',
                width: 800,
                height: 800,
                alt: 'Logo',
            }
        ],
    })
};