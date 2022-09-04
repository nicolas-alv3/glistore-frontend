import {FeatureType, GTemplate} from "../src/types";

class TemplateService {
    getTemplates() {
        const shoeTemplate: GTemplate = {
            name: "Zapatilla",
            features: [
                {
                    type: FeatureType.ENUM_SIMPLE,
                    name: "Talle de zapa",
                    options: [],
                    required: true,
                    enumerable: ["35", "36", "37", "38", "39", "40", "41", "42"]
                }
            ]
        }

        const burgerTemplate: GTemplate = {
            name: "Hamburguesa",
            features: [
                {
                    type: FeatureType.ENUM_MULT,
                    name: "Agregados",
                    options: [],
                    required: true,
                    enumerable: ["Extra cheddar","Extra carne","Extra bacon"]
                }
            ]
        }
        return [
            shoeTemplate, burgerTemplate
        ]
    }
}

export default new TemplateService();