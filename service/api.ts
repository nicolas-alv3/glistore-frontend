import axios, {AxiosRequestConfig} from 'axios';
import {getBackendURL} from "../src/utils/windowUtils";

console.log("Setting up environment: ", process.env.NEXT_PUBLIC_ENVIRONMENT)
let server = getBackendURL();


const API = {
    get: (path: any, body?: any) => axios.get(`${server}${path}`, {params: body}).then((response) => response.data),
    put: (path: any, body?: any) => axios.put(`${server}${path}`, body).then((response) => response.data),
    post: (path: any, body?: any) => axios.post(`${server}${path}`, body, {crossdomain: true} as AxiosRequestConfig).then((response) => response.data),
    delete: (path: any, body?: AxiosRequestConfig<any> | undefined) => axios.delete(`${server}${path}`, body).then((response) => response.data),
};

export default API;