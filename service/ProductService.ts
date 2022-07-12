import API from "./api";

class ProductService {
    path = "/product"
    getVisibleProducts() {
        return API.get(this.path + "/visible")
    }

    getProductById(id: string) {
        return API.get(this.path + "/" + id)
    }

    getTrendingProducts() {
        return API.get(this.path + "/trending")
    }
}

export default new ProductService();