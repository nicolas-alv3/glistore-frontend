export interface Product {
    talles: string[],
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

export interface SaleItem {
    product: Product,
    amount: number,
    talle: string
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