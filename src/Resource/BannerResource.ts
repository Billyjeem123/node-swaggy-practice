// resources/UserResource.js
export class BannerResource {
    static toJson(banner) {
        return {
            type: "=Banners",
            id: banner._id,
            attributes: {
               name: banner.name ?? '',
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

