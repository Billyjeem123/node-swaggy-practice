export declare class OrderResource {
    static toJson(order: any): {
        type: string;
        id: any;
        attributes: {
            name: any;
            user: any;
            food: any;
            amount: string;
            created_at: string;
            restaurant: {
                id: any;
                name: any;
            };
        };
    };
    static collection(orders: any): any;
}
