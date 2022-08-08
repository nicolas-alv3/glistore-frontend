import {SortType} from "./components/SortAndFilter/SortOrFilter";

export interface Product {
    talles: string[],
    _id: string,
    name: string,
    images: string[],
    description: string,
    price: number,
    discount: number,
    category: string,
    isTrending: boolean,
    visible: boolean,
}

export interface CartItem {
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
    categories?: string[],
    talles?: string[]
    pageSize: number,
    page: number,
    sort?: {
      price: SortType
    }
    filter: {
        talles: string[] | string | never[],
        categories: string[] | string | never[]
    }
}

export interface FilterState {
    req: SearchRequest,
    lastVisitedId: string
}