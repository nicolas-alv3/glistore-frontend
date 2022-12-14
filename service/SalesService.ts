import {Sale} from "../src/types";
import API from "./api";

class SalesService {
    path = "/api/sales"

    createSale(sale: Sale) {
        return API.post(this.path + "/", sale)
    }

}

export default new SalesService();