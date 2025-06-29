export declare class BannerResource {
    static toJson(banner: any): {
        type: string;
        id: any;
        attributes: {
            name: any;
            created_at: string;
        };
    };
    static collection(banners: any): any;
}
