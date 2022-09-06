import {GTemplate} from "../src/types";
import API from "./api";

class TemplateService {
    path = "/template"

    getTemplates() {
        return API.get(this.path + "/")
    }

    create(template: GTemplate) {
        console.log("Created")
        return new Promise(() => {});
    }
}

export default new TemplateService();