"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryResource = void 0;
class CategoryResource {
    static toJson(category) {
        var _a;
        return {
            type: "Categories",
            id: category._id,
            attributes: {
                name: (_a = category.name) !== null && _a !== void 0 ? _a : '',
                created_at: new Date(category.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                }),
            },
        };
    }
    static collection(categories) {
        return categories.map(category => this.toJson(category));
    }
}
exports.CategoryResource = CategoryResource;
