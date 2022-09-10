export enum FeatureType {
    ENUM_MULT="ENUM_MULT",
    ENUM_SIMPLE="ENUM_SIMPLE",
}

export interface GTemplate {
    _id?: string,
    name: string,
    features: GFeature[]
}

export interface GFeature {
    type: FeatureType,
    name: string,
    // Enumberables are choosen by admin
    enumerable: string[],
    //Options are choosen by user
    options: string[],
    required?: boolean
}

export interface Product {
    talles: string[],
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
    talle: string,
    features: FeatureItem[]
}


export interface SearchResponse {
    products: Product[],
    pageSize: number,
    page: number,
    totalPages: number
}

export interface SearchRequest {
    name?: string,
    pageSize: number,
    page: number,
    sort?: {
      price: SortType,
      date: SortType
    }
    filter: {
        talles: string[],
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
    logo: string
}