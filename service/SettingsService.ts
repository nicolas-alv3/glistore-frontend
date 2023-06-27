import API from "./api";
import {GConfig} from "../src/types";

class StoreService {
    path = "/api/v1/stores";

    getConfig(): Promise<GConfig> {
        return API.get(this.path + "/")
    }

    update(body: GConfig) {
        return API.patch(this.path + "/", body)
    }

    getStoreByEmail(email) {
        return API.get(this.path + "/?email=" + email)
    }

    create(store: GConfig) {
        return API.post(this.path, store)
    }
}

export default new StoreService();
