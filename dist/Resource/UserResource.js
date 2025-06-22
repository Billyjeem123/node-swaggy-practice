"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResource = void 0;
// resources/UserResource.js
class UserResource {
    static toJson(user) {
        var _a, _b, _c, _d;
        return {
            type: "Users",
            id: user._id,
            attributes: {
                name: (_a = user.name) !== null && _a !== void 0 ? _a : '',
                email: (_b = user.email) !== null && _b !== void 0 ? _b : '',
                role: (_c = user.role) !== null && _c !== void 0 ? _c : '',
                is_verified: Boolean((_d = user.is_verified) !== null && _d !== void 0 ? _d : false),
                created_at: new Date(user.createdAt).toLocaleDateString('en-US', {
                    month: 'short', day: '2-digit', year: 'numeric'
                })
            }
        };
    }
    static collection(users) {
        return users.map(user => this.toJson(user));
    }
}
exports.UserResource = UserResource;
