import { Product } from "../src/types";
import API from "./api";

class ProductService {
    path = "/api/v1/products"

    getVisibleProducts() {
        return API.get(this.path + "/visible")
    }

    getProductById(id: string) {
        return API.get(this.path + "/" + id)
    }

    getTrendingProducts() {
        return API.get(this.path + "/trending")
    }

    getAll() {
        return API.get(this.path + "/")
    }

    create(p: Product) {
        return API.post(this.path + "/", p)
    }

    delete(p: Product) {
        return API.delete(this.path + "/"+ p._id)
    }

    update(p: Product) {
        return API.patch(this.path + "/" + p._id, p)
    }
}

export default new ProductService();
