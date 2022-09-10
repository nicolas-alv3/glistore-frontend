import {GConfig} from "../types";
import React, {useEffect} from "react";
import ConfigService from "../../service/ConfigService";

export const loadVariables = (config: GConfig) => {
    let root = document.documentElement;
    root.style.setProperty('--col-primary', config.colorPalette.primary);
    root.style.setProperty('--col-secondary', config.colorPalette.secondary);
    root.style.setProperty('--col-tertiary', config.colorPalette.tertiary);
    root.style.setProperty('--col-quaternary', config.colorPalette.quaternary);
    root.style.setProperty('--col-font', config.colorPalette.primaryFont);
    root.style.setProperty('--col-secondary-font', config.colorPalette.secondaryFont);
}

export function useConfig(): GConfig {
    const [config, setConfig] = React.useState<GConfig>({
            _id: "",
            companyName: "",
            description: "",
            instaUser: "",
            fbLink: "",
            phoneNumber: "",
            colorPalette: {
                primary: "",
                secondary: "",
                tertiary: "",
                quaternary: "",
                primaryFont: "",
                secondaryFont: ""
            },
            logo: ""
        }
    );

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (sessionStorage.getItem("config")) {
                setConfig(JSON.parse(sessionStorage.getItem("config") as string))
            } else {
                ConfigService.getConfig()
                    .then((res) => {
                        loadVariables(res);
                        sessionStorage.setItem("config", JSON.stringify(res));
                        setConfig(res);
                    })
            }
        }
    }, [])

    return config;
}