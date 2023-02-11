import API from "./api";
import {SearchRequest} from "../src/types";

class SearchService {
    path = "/api/v1/products"
    search({name, filter, page, pageSize}: SearchRequest) {
        const params = `?category=${filter.categories.toString()}&name=${name}&page=${page}&pageSize=${pageSize}`
        return API.get(`${this.path}/${params}`);
    }
}

export default new SearchService();
