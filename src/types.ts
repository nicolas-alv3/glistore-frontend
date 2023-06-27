import {SemanticICONS} from "semantic-ui-react";

export enum FeatureType {
    ENUM_MULT="ENUM_MULT",
    ENUM_SIMPLE="ENUM_SIMPLE",
}

export interface GTemplate {
    _id?: string,
    name: string,
    features: GFeature[]
}

export type GCategory = string

export interface GFeature {
    _id?: string,
    type: FeatureType,
    name: string,
    // Enumberables are choosen by admin
    enumerable: string[],
    //Options are choosen by user
    options: string[],
    required?: boolean,
    priceAdded: number
}

export interface Product {
    features: GFeature[],
    _id: string,
    name: string,
    images: string[],
    preview: string,
    description: string,
    price: number,
    discount: number,
    category: string,
    isTrending: boolean,
    visible: boolean,
}

export interface FeatureItem {
    name: string,
    value: string
}

export interface SaleItem {
    product: Product,
    amount: number,
    features: FeatureItem[]
}


export type SearchResponse = Product[]
/*export interface SearchResponse {
    products: Product[],
    pageSize: number,
    page: number,
    totalPages: number
}*/

export interface SearchRequest {
    name?: string,
    pageSize: number,
    page: number,
    sort?: {
      price: SortType,
      date: SortType
    }
    filter: {
        categories: string[]
    },
}


export enum SortType {
    NONE= "NONE",
    HIGHEST_PRICE= "HIGHEST_PRICE",
    LOWEST_PRICE= "LOWEST_PRICE",
    OLDEST = "OLDEST",
    NEWEST = "NEWEST"
}

export interface Sale {
    items: SaleItem[]
}

export interface GColorPallette {
    primary: string,
    secondary: string,
    tertiary: string,
    quaternary: string,
    primaryFont: string,
    secondaryFont: string
}

export interface GConfig {
    _id?:string,
    companyName: string,
    description: string,
    instaUser: string,
    fbLink: string,
    phoneNumber: string,
    colorPalette: GColorPallette,
    logo: string,
    menu: GMenuItem[],
    username: string,
    userEmail: string,
}


export interface GMenuItem {
    href?: string,
    onClick?: () => void,
    icon?: SemanticICONS,
    text: string,
    subItems?: GMenuItem[]
}
export enum GlistoreHeaders {
    USER_EMAIL = 'user_email',
    USERNAME = 'username'
}

export const GlistoreConfig: GConfig = {
    userEmail: "",
    username: "",
    _id:"",
    menu:[],
    logo:"/landingPage/glider_logo.png",
    phoneNumber:"",
    companyName: "Glistore",
    description: "Crea tu tienda online con Glistore de forma rapida y 100% personalizable",
    fbLink:"",
    instaUser:"",
    colorPalette: {
        primary: "#3a7ca5",
        secondary: "#03256C",
        tertiary: "#D9DCD6",
        quaternary: "#16425B",
        primaryFont: "#212121",
        secondaryFont: "#3D3D3D"
    }
}
