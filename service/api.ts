import axios, {AxiosRequestConfig, AxiosRequestHeaders} from 'axios';
import {getBackendURL} from "../src/utils/windowUtils";

console.log("Setting up environment: ", process.env.NEXT_PUBLIC_ENVIRONMENT)
let server = getBackendURL();

const headers: () => AxiosRequestHeaders = () =>  {
    if(typeof sessionStorage !== "undefined") {
        return {
            user_email: sessionStorage?.getItem("glistore_user_email") || ''
        } as AxiosRequestHeaders
    } else {
        return {} as AxiosRequestHeaders
    }
}

const API = {
    get: (path: any, body?: any) => axios.get(`${server}${path}`, {params: body, headers: headers()}).then((response) => response.data),
    put: (path: any, body?: any) => axios.put(`${server}${path}`, body, {headers: headers()}).then((response) => response.data),
    post: (path: any, body?: any) => axios.post(`${server}${path}`, body, {headers: headers(),crossdomain: true} as AxiosRequestConfig).then((response) => response.data),
    delete: (path: any) => axios.delete(`${server}${path}`, {headers: headers()}).then((response) => response.data),
};

export default API;