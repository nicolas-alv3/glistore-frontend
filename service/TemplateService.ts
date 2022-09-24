import {GTemplate} from "../src/types";
import API from "./api";

class TemplateService {
    path = "/api/templates"

    getTemplates() {
        return API.get(this.path + "/")
    }

    create(template: GTemplate) {
        return API.post(this.path + "/", template)
    }

    update(template: GTemplate) {
        return API.put(this.path + "/", template)
    }

    delete(id: string) {
        return API.delete(this.path + "/" + id)
    }
}

export default new TemplateService();