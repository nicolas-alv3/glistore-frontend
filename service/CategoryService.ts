import {GCategory} from "../src/types";
import API from "./api";

class CategoryService {
    path = "/api/categories"

    getCategories() {
        return API.get(this.path + "/")
    }

    create(template: GCategory) {
        return API.post(this.path + "/", template)
    }

    update(template: GCategory) {
        return API.put(this.path + "/", template)
    }

    delete(id: string) {
        return API.delete(this.path + "/" + id)
    }
}

export default new CategoryService();