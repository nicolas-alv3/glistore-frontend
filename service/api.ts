import axios, {AxiosRequestConfig} from 'axios';

console.log("Setting up environment: ", process.env.NEXT_PUBLIC_ENVIRONMENT)
let server = 'https://dev-pomelo-store.herokuapp.com';
if (process.env.NEXT_PUBLIC_ENVIRONMENT && process.env.NEXT_PUBLIC_ENVIRONMENT == 'PROD') {
    server = 'https://pomelo-store-back.herokuapp.com';
}

const API = {
    get: (path: any, body?: any) => axios.get(`${server}${path}`, {params: body}).then((response) => response.data),
    put: (path: any, body?: any) => axios.put(`${server}${path}`, body).then((response) => response.data),
    post: (path: any, body?: any) => axios.post(`${server}${path}`, body, {crossdomain: true} as AxiosRequestConfig).then((response) => response.data),
    delete: (path: any, body?: AxiosRequestConfig<any> | undefined) => axios.delete(`${server}${path}`, body).then((response) => response.data),
};

export default API;