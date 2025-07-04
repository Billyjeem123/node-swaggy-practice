"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityResource = void 0;
class CityResource {
    static toJson(city) {
        return {
            type: "cities",
            id: city._id,
            attributes: {
                name: city.name,
                created_at: new Date(city.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                }),
            },
        };
    }
    static collection(cities) {
        return cities.map(city => this.toJson(city));
    }
}
exports.CityResource = CityResource;
