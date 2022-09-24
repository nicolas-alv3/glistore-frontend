import API from "./api";
import {GConfig} from "../src/types";

class SettingsService {
    path = "/api/settings";
    id = "631cb3716b2e061dd85ebee9"

    getConfig(): Promise<GConfig> {
        return API.get(this.path + "/" + this.id)
    }

    update(body: GConfig) {
        return API.put(this.path + "/", body)
    }
}

export default new SettingsService();