"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerResource = void 0;
// resources/UserResource.js
class BannerResource {
    static toJson(banner) {
        var _a;
        return {
            type: "=Banners",
            id: banner._id,
            attributes: {
                name: (_a = banner.name) !== null && _a !== void 0 ? _a : '',
                created_at: new Date(banner.createdAt).toLocaleDateString('en-US', {
                    month: 'short', day: '2-digit', year: 'numeric'
                })
            }
        };
    }
    static collection(banners) {
        return banners.map(banner => this.toJson(banner));
    }
}
exports.BannerResource = BannerResource;
