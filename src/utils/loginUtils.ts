import {hash} from "./hashUtils";
import {getConfig} from "../hooks/getConfig";

export function isAdminLogged(): boolean {
    if( window ) {
        const config = getConfig();
        return hash(localStorage?.getItem("password") || "") === config.hashedPw;
    }
    return false;
}

export function login(password: string): Promise<string> {
    return new Promise( (resolve, reject) => {
        if( window ) {
            const config = getConfig();
            if(hash(password) === config.hashedPw) {
                localStorage.setItem("password", password);
                resolve("Login successful");
            }
        }
        reject("Invalid password")
    })
}