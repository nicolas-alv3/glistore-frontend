import API from "./api";
import {SearchRequest} from "../src/types";

class SearchService {
    path = "/search"
    search(searchRequest: SearchRequest) {
        return API.post(this.path + "/", searchRequest);
    }
}

export default new SearchService();