import {GConfig, GlistoreConfig} from "../types";
import React, {useEffect} from "react";
import ConfigService from "../../service/SettingsService";
import {GColors} from "../utils/GColors";

function setFooterVariables(variable, root) {
    root.style.setProperty("--col-footer-font", GColors.LIGHTGRAY_COLOR);
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
    console.log("loading variables", config);
    let root = document.documentElement;
    setPalletteVariables(config, root)
    setFooterVariables(config.colorPalette.quaternary, root);
}

interface ConfigHook {
    config: GConfig,
    reloadConfig: () => void,
    setConfig: (config) => void,
    fetchAndLoadConfig: (config) => void
}

export function useConfig(): ConfigHook {
    const [config, setConfig] = React.useState<GConfig>(GlistoreConfig);

    function fetchAndLoadConfig() {
        ConfigService.getConfig()
            .then((res) => {
                loadVariables(res);
                sessionStorage.setItem("config", JSON.stringify(res));
                setConfig(res);
            })
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const configuration = JSON.parse(sessionStorage.getItem("config") as string);
            if (sessionStorage.getItem("config")) {
                if(configuration.username !== sessionStorage.getItem('glistore_username')) {
                    fetchAndLoadConfig()
                } else {
                    setConfig(configuration);
                    loadVariables(configuration);
                }
            } else {
                fetchAndLoadConfig();
            }
        }
    }, [])

    const reloadConfig = () => {
        sessionStorage.removeItem("config");
    }
    return { config, reloadConfig, setConfig, fetchAndLoadConfig };
}
