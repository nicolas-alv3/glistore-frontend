/* eslint-disable import/no-extraneous-dependencies */
import axios, { AxiosRequestConfig } from 'axios';

//const server = 'https://pomelo-back.herokuapp.com';
const server = 'http://localhost:8080';

// @ts-ignore
const API = {
    get: (path: any, body?: any) => axios.get(`${server}${path}`, {params: body}).then((response) => response.data),
    put: (path: any, body?: any) => axios.put(`${server}${path}`, body).then((response) => response.data),
    post: (path: any, body?: any) => axios.post(`${server}${path}`, body, {crossdomain: true}).then((response) => response.data),
    delete: (path: any, body?: AxiosRequestConfig<any> | undefined) => axios.delete(`${server}${path}`, body).then((response) => response.data),
};

export default API;