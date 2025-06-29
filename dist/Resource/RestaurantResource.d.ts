export declare class RestaurantResource {
    static toJson(restaurant: any): {
        type: string;
        id: any;
        attributes: {
            name: any;
            user: {
                id: any;
                name: any;
            };
            city: {
                name: any;
            };
            created_at: string;
        };
    };
    static collection(restaurants: any): any;
}
