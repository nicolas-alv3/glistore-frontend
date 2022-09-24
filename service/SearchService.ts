import API from "./api";
import {SearchRequest} from "../src/types";

class SearchService {
    path = "/api/search"
    search(searchRequest: SearchRequest) {
        return API.post(this.path + "/", searchRequest);
    }
}

export default new SearchService();