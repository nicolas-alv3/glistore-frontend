import {GConfig} from "../types";
import React, {useEffect} from "react";
import ConfigService from "../../service/ConfigService";
import {GColors} from "../utils/GColors";

function lightOrDark(color) {
    let root = document.documentElement;

    const c = color.substring(1);      // strip #
    const rgb = parseInt(c, 16);   // convert rrggbb to decimal
    const r = (rgb >> 16) & 0xff;  // extract red
    const g = (rgb >>  8) & 0xff;  // extract green
    const b = (rgb >>  0) & 0xff;  // extract blue

    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    if (luma > 150) {
        root.style.setProperty("--col-footer-font", GColors.DARKGRAY_COLOR);
    } else {
        root.style.setProperty("--col-footer-font", GColors.LIGHTGRAY_COLOR);
    }
}

export const loadVariables = (config: GConfig) => {
    lightOrDark(config.colorPalette.quaternary);
    let root = document.documentElement;
    root.style.setProperty('--col-primary', config.colorPalette.primary);
    root.style.setProperty('--col-secondary', config.colorPalette.secondary);
    root.style.setProperty('--col-tertiary', config.colorPalette.tertiary);
    root.style.setProperty('--col-quaternary', config.colorPalette.quaternary);
    root.style.setProperty('--col-font', config.colorPalette.primaryFont);
    root.style.setProperty('--col-secondary-font', config.colorPalette.secondaryFont);
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