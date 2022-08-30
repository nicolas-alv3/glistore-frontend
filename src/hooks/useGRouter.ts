import {useRouter} from "next/router";
import {SearchRequest, SortType} from "../types";
import {splitURL} from "../utils/parseUtils";

export function useGRouter() {
    const router = useRouter();
    const baseReq: SearchRequest = {
        name: "",
        sort: {
            price: SortType.NONE,
            date: SortType.NONE
        },
        page: 1,
        pageSize: 10,
        filter: {
            talles: [],
            categories: [],
        }
    }

    const mergeRequests = (req, paramReq) => {
        return {
            name: paramReq.name || req.name,
            sort: {
                price: paramReq.sort?.price || req.sort?.price || SortType.NONE,
                date: SortType.NONE
            },
            page: 1,
            pageSize: 10,
            filter: {
                talles: paramReq.filter?.talles,
                categories: paramReq.filter?.categories,
            }
        }
    }

    const navigate = (fReq: (r: SearchRequest) => Partial<SearchRequest>) => {
        const paramReq: Partial<SearchRequest> = fReq(getReq());
        const fullReq: SearchRequest = mergeRequests(getReq(), paramReq);
        return router.push({
                query: {
                    name: fullReq.name || "",
                    categories: fullReq.filter?.categories.toString(),
                    sortPrice: fullReq.sort?.price,
                    sortDate: fullReq.sort?.date,
                    talles: fullReq.filter?.talles.toString()
                },
            }
        )
    }

    const resetFilter = () => {
        navigate(() => ({...baseReq, name: router.query.name as string}))
    }

    const getReq = () => ({
        name: router.query.name as string || "",
        sort: {
            price: router.query.sortPrice as SortType || SortType.NONE,
            date: router.query.sortDate as SortType || SortType.NONE
        },
        page: Number(router.query.page) || 1,
        pageSize: 10,
        filter: {
            talles: splitURL(router.query.talles as string || ""),
            categories: splitURL(router.query.categories as string || ""),
        }
    });

    const removeCategory = (cat: string) => {
        navigate( (sReq) => ({
          ...sReq,
          filter: {
              ...sReq.filter,
              categories: sReq.filter.categories.filter(c => c!==cat)
          }
        }))
    }

    const removeTalle = (talle: string) => {
        navigate( (sReq) => ({
            ...sReq,
            filter: {
                ...sReq.filter,
                talles: sReq.filter.talles.filter(t => t!==talle)
            }
        }))
    }

    return {router, getReq, navigate, resetFilter, removeCategory, removeTalle};
}