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

    getAll() {
        return API.get(this.path + "/")
    }

    getTalles(): string[] {
        return [
            "000",
            "00",
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "8",
            "10",
            "12",
            "14",
            "Único"
        ]
    }

    create(body: any) {
        return API.post(this.path + "/", body)
    }
}

export default new ProductService();