import {GCategory} from "../src/types";
import API from "./api";

class CategoryService {
    path = "/api/v1/stores/categories"

    getCategories(): Promise<GCategory[]> {
        return API.get(this.path + "/")
    }
    update(categories: GCategory[]) {
        return API.put(this.path + "/", {categories})
    }
}

export default new CategoryService();
