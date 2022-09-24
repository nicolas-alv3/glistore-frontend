import {GConfig} from "../types";
import React, {useEffect} from "react";
import ConfigService from "../../service/SettingsService";
import {GColors, isDark} from "../utils/GColors";

function setFooterVariables(variable, root) {
    if (!isDark(variable, false)) {
        root.style.setProperty("--col-footer-font", GColors.DARKGRAY_COLOR);
    } else {
        root.style.setProperty("--col-footer-font", GColors.LIGHTGRAY_COLOR);
    }
}

function setPalletteVariables(config: GConfig, root: HTMLElement) {
    root.style.setProperty('--col-primary', config.colorPalette.primary);
    root.style.setProperty('--col-secondary', config.colorPalette.secondary);
    root.style.setProperty('--col-tertiary', config.colorPalette.tertiary);
    root.style.setProperty('--col-quaternary', config.colorPalette.quaternary);
    root.style.setProperty('--col-font', config.colorPalette.primaryFont);
    root.style.setProperty('--col-secondary-font', config.colorPalette.secondaryFont);
    root.style.setProperty('--col-danger', "#7E191B");
}

export const loadVariables = (config: GConfig) => {
    let root = document.documentElement;
    setFooterVariables(config.colorPalette.quaternary, root);
    setPalletteVariables(config, root)
}

interface ConfigHook {
    config: GConfig,
    reloadConfig: () => void
}

export function useConfig(): ConfigHook {
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
                const configuration = JSON.parse(sessionStorage.getItem("config") as string);
                setConfig(configuration);
                loadVariables(configuration);
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

    const reloadConfig = () => {
        sessionStorage.removeItem("config");
    }
    return { config, reloadConfig };
}